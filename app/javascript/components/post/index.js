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
        <ul>
          {records.map(post=><li>{post.title} (
            <Link to={`/posts/${post.id}/edit`}>Edit</Link> |
             <Link to={`/posts/${post.id}`}>Read</Link> | 
             <a href="javascipt:void;" onClick={()=>this.props.deletePost(post.id)}>Delete</a> 
             )</li>)}
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
