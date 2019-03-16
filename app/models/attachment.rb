class Attachment < ApplicationRecord
    belongs_to :attachable
    has_one_attached :file
end
