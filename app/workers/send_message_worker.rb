class SendMessageWorker
  include Sidekiq::Worker

  def perform(message_id)
    message = Message.find(message_id)
    mine = ApplicationController.render(
      partial: 'messages/mine',
      locals: {
        message: message
      }
    )

    theirs = ApplicationController.render(
      partial: 'messages/theirs',
      locals: {
        message: message
      }
    )

    ActionCable.server.broadcast("chat_channel_#{ message.chat_id }", { theirs: theirs, mine: mine, if_message: true, message_user_id: message.user_id.to_s })
  end
end
