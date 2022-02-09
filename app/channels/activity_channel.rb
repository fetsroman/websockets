class ActivityChannel < ApplicationCable::Channel
  def subscribed
    stream_from "activity_channel"
    redis.set("user_#{current_user.id}_online", "1")
    ActionCable.server.broadcast "activity_channel",
                                 { user_id: current_user.id.to_s,
                                 online: true }
  end

  def unsubscribed
    redis.del("user_#{current_user.id}_online")
    ActionCable.server.broadcast "activity_channel",
                                 { user_id: current_user.id.to_s,
                                 online: false }
  end

  private

  def redis
    Redis.new
  end
end
