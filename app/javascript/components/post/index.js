import React from "react"
import {connect} from 'react-redux';
import {getPosts, deletePost} from '../../redux/reducers/posts'
import {Link} from 'react-router-dom';

class Index extends React.Component {

  componentDidMount(){
    this.props.getPosts();
  }

  render () {
    const {posts: {records = []} = {}} = this.props;
    return (
      <div>
        <h1>Posts</h1>
        <ul className="list-group">
          {records.map(post=><li className="list-group-item">{post.title} 
            <div className="pull-right">
              <Link className="btn btn-link" to={`/posts/${post.id}`}>View</Link> 
              <Link className="btn btn-link" to={`/posts/${post.id}/edit`}>Edit</Link> 
              <button className="btn btn-link" type="button" onClick={()=>this.props.deletePost(post.id)}>Delete</button> 
             </div>
             </li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state=>({
  posts: state.posts,
});

const mapDispatchToProps = dispatch=>({
  getPosts: ()=>dispatch(getPosts()),
  deletePost: (id)=>dispatch(deletePost(id)),
});

// export default Index;

export default connect(mapStateToProps, mapDispatchToProps)(Index)
