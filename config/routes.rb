Rails.application.routes.draw do
  get '/api/posts', to: 'post#index'
  get '/api/posts/:id', to: 'post#show'
  post '/api/posts' , to: 'post#create'
  put '/api/posts/:id' , to: 'post#update'
  delete '/api/posts/:id' , to: 'post#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/posts/*path',to: 'main#index'
  get '/posts',to: 'main#index'
  root to: 'main#index'
end
