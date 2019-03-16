import React from "react"
import {connect} from "react-redux"
import {withRouter, Link} from "react-router-dom"
import {getPost} from '../../redux/reducers/posts'
import PropTypes from "prop-types"
class Details extends React.Component {
  componentDidMount(){
    const {match:{params:{id = null} = {}} = {}} = this.props;
    if(id){
      this.props.getPost(id);
    }
  }

  render () {
    const {match:{params:{id = null} = {}} = {}, posts:{records:posts=[]}} = this.props;
    const post = posts.find(p=>p.id == id);
    const {title, content, attachments=[], images=[]} = post||{};
    console.log(post);

    return (
      <div>
        {post &&<div>
          <h1>{title}</h1>
          <p>{content}</p>
          <div class="row">
          {images.map(({url, preview, filename})=><div class="col-xs-6 col-md-2">
              <a href={url} target="_blank" class="thumbnail">
                <img src={preview} alt={filename} />
              </a>
        </div>)}
          </div>
          <ul>
            {attachments.map(({filename, url})=><li><a target="_blank" href={url}>{filename}</a></li>)}
          </ul>
        </div>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch=>({
  getPost: data=>dispatch(getPost(data)),
});

const mapStateToProps = state=>({
  posts: state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details))
