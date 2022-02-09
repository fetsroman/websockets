class Chat
  include Mongoid::Document
  field :name, type: String

  validates :name, uniqueness: true, presence: true

  has_many :messages, dependent: :destroy
end
