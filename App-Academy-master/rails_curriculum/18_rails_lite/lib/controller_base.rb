require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'
require 'rack'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, route_params={})
    @req = req 
    @res = res 
    @params = route_params.merge(req.params)
    @protect_from_forgery ||= false 
  end

  def form_authenticity_token 
    @token ||= generate_authenticity_token

    @res.set_cookie(
      'authenticity_token', 
       value: @token, 
       path: "/" )

    @token
  end 

  def check_authenticity_token 
    cookie = @req.cookies['authenticity_token'] 
    raise "Invalid authenticity token" unless cookie && cookie == @params['authenticity_token']
  end 

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response == @res 
  end

  # Set the response status code and header
  def redirect_to(url)
    raise 'Cannot redirect twice' if already_built_response?
    @res.location = url 
    @res.status = 302 

    @already_built_response = @res 
    session.store_session(@res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise 'Cannot render content twice' if already_built_response?
    @res.write(content)
    @res['Content-Type'] = content_type 

    @already_built_response = @res 
    session.store_session(@res)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
      
      template_file = File.join(File.dirname(__FILE__), "..", "views", self.class.to_s.underscore, 
                    "#{template_name}.html.erb")
      raw_content = File.read(template_file)
      erb_content = ERB.new(raw_content).result(binding) 

      self.render_content(erb_content, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    if @req.request_method != "GET" && @protect_from_forgery 
      check_authenticity_token
    else 
      form_authenticity_token
    end

    self.send(name) 
    
    render(name) unless already_built_response?
  end

  protected 

  def self.protect_from_forgery 
    @protect_from_forgery = true 
  end 

  private 

  def generate_authenticity_token 
    SecureRandom::urlsafe_base64(16)
  end
end
