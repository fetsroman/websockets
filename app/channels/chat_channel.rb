class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def typing(data)
    ActionCable.server.broadcast(
      "chat_channel_#{params[:chat_id]}",
      {
        typing: data['typing'],
        typing_user_id: data['user_id'],
        typing_user_email: data['user_email']
      }
    )
  end
end
