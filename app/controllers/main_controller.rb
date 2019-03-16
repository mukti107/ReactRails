class MainController < ApplicationController
    def index
    end

    def blob
        blob = ActiveStorage::Blob.find(params[:id])
        render json: {url: url_for(blob), preview: blob.representable? ? url_for(blob.representation(resize: "100x100")) : nil}
    end
    # ≈
end
