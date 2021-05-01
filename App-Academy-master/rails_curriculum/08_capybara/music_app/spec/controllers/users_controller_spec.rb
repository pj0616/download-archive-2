require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #new" do
    it "renders the new template" do
      get :new, {}
      expect(response).to render_template(:new)
    end
  end

  describe "POST #create" do
    context "with invalid params" do
      it "validates the presence of the user's email and password" do  
        user = post :create, params: { user: { email: '' }} 
        expect(flash.now[:errors]).to be_present
        expect(response).to render_template(:new) 
      end
      it "validates that the password is at least 6 characters long" do  
        user = post :create, params: { user: { email: 'fares@gmail.com', password: '123' }}
        expect(flash.now[:errors]).to be_present
        expect(response).to render_template(:new)
      end
    end

    context "with valid params" do
      it "redirects user to bands index on success" do   
        post :create, params: { user: { email: 'blah@gmail.com', password: '1234567789' }}  
        expect(response).to redirect_to(user_url(User.last)) 
      end 
    end
  end

  describe "GET #show" do   
    context 'when a user exists'  do 
      it 'renders the show template' do   
        user = User.create!(email: 'lol@gmail.com', password: 'haha12345')
        get :show, params: { id: User.last.id }
        expect(response).to render_template(:show)
      end
    end
    
    context 'when a user doesn\'t exist' do  
      it 'does not render the show template' do 
        begin
          get :show, params: { id: -1 }
        rescue => exception
          ActiveRecord::RecordNotFound
        end 
        expect(response).not_to render_template(:show)
      end 
    end 
  end
end
