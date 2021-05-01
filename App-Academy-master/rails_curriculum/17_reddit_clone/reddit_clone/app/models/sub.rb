# == Schema Information
#
# Table name: subs
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  author_id   :integer          not null
#
# Indexes
#
#  index_subs_on_author_id  (author_id)
#  index_subs_on_title      (title) UNIQUE
#

class Sub < ApplicationRecord 
  validates :description, :author_id, presence: true
  validates :title, presence: true, uniqueness: true

  belongs_to :moderator,
    primary_key: :id, 
    foreign_key: :author_id,
    class_name: :User

  has_many :post_subs 

  has_many :posts, 
    through: :post_subs, 
    source: :post

end 
