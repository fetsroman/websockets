class Message
  include Mongoid::Document
  field :context, type: String

  validates :context, presence: true

  belongs_to :user
  belongs_to :chat
end
