/* eslint-disable react/prop-types, jsx-a11y/anchor-is-valid */
import { DirectUpload } from "activestorage"
import React from 'react';

const uploadUrl = '/rails/active_storage/direct_uploads';

class FileUpload extends React.Component{
  state = {uploading: false, progress: 0};
  fileSelected = (event)=>{
    const {fields, valueKey='image'} = this.props;
    const file = event.target.files[0];
    const uploader = new DirectUpload(file, uploadUrl, this);
    this.setState({uploading:true, progress: 0})
    uploader.create((err, blob)=>{
      if(err){
        this.setState({uploading:false});
        return;
      }
      const {id, signed_id, filename} = blob;
      fetch('/api/blob/'+id)
      .then(resp=>resp.json())
      .then(({url, preview})=>{
        fields.push({
          [valueKey]: signed_id,
          filename,
          url,
          preview,
        });
        this.setState({uploading:false})
      })
      
    })
  }

  directUploadWillStoreFileWithXHR(request) {
    request.upload.addEventListener("progress", event => this.directUploadDidProgress(event))
  }
 
  directUploadDidProgress({loaded=0, total = 1}) {
    this.setState({progress:Math.floor(100*loaded/total)})
  }

  render(){
    const { fields, label='', accept='*/*' } = this.props;
    const { uploading, progress } = this.state;
    return (<div className="form-group">
    <label>{label}</label>
    <ul class="list-group">
      {fields
      .map((field, index) => ({_index:index, ...fields.get(index)}))
      .map(({filename, url, preview, _index}) => (
          <li class="list-group-item">
            <img src={preview}/>
            <a href={url} target="_blank">{filename}</a>
            <button type="button" onClick={()=>fields.remove(_index)} className="btn btn-link text-danger pull-right">X</button>
          </li>
      ))}
      </ul>
      {uploading &&  
      (<div class="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%`}}>
          <span className="sr-only">{progress}% Complete</span>
        </div>
      </div>)}
      <input accept={accept} disabled={uploading} type="file" onChange={this.fileSelected} />
    </div>)
  }
}

export default FileUpload;
