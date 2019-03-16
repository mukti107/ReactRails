class Post < ApplicationRecord
    has_many :attachments, as: :attachable, class_name: :Attachment
    has_many :images, as: :imageable, class_name: :Picture
end
