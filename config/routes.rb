Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :messages
  resources :chats
  devise_for :users

  root 'chats#index'
end
