Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :new, :show, :index]
  resource :session, only: [:destroy, :new, :create]
  resources :subs, except: [:destroy]
  resources :comments, only: [:create, :show]
  resources :posts, except: [:index] do   
    resources :comments, only: [:new] 
  end 
end
