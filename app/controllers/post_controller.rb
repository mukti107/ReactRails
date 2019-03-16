class PostController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    @posts = Post.all
    render json: @posts.map{|post| 
        post.slice(:id, :title, :content)
    }
  end

  def show
    render json: @post.slice(:id, :title, :content).merge(images: @post.images.map{|image|
      {id: image.id, image: image.image.blob.signed_id, filename: image.image.blob.filename, url:url_for(image.image), preview:url_for(image.image.variant(resize: "100x100"))}
    }, attachments: @post.attachments.map{|attachment|
      {id: attachment.id, file: attachment.file.blob.signed_id, filename: attachment.file.blob.filename, url:url_for(attachment.file), preview: attachment.file.representable? ? url_for(attachment.file.representation(resize: "100x100")) : nil}
  })
  end

  def create
    @post = Post.new(post_params)
    @post.images = param_images
    @post.attachments = param_attachments
    @post.save() 
    render json: @post
  end

  def update
    @post.update(post_params)
    @post.images = param_images
    @post.attachments = param_attachments
    render json: @post
  end

  def param_images
    post_attachments.key?(:images) ? post_attachments[:images].map{|image|
    image.key?(:id) ? Picture.find(image[:id]) : Picture.create(image)
  } : []
  end

  def param_attachments
    post_attachments.key?(:attachments) ? post_attachments[:attachments].map{|attachment|
    attachment.key?(:id) ? Attachment.find(attachment[:id]) : Attachment.create(attachment)
  } : []
  end

  def destroy
    @post.delete
    render json: {success: true}
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
  def post_attachments
    params.permit(images:[[:id, :image]], attachments:[[:id, :file]])
  end
end
