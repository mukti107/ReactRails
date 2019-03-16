class Picture < ApplicationRecord
    belongs_to :imageable
    has_one_attached :image
end
