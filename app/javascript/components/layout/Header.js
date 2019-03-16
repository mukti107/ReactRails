import React from "react"
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
class Header extends React.Component {
  render () {
    return (
      <div>
        <ul className="nav nav-pills">
          <li role="presentation"><Link to="/posts">Posts</Link></li>
          <li role="presentation"><Link to="/posts/add">+ Add New Post</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header
