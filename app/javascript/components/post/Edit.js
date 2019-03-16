import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {reduxForm, Form, Field, FieldArray} from 'redux-form'
import TextField from "../formFields/InputField";
import TextAreaField from "../formFields/TextareaField";
import FileUpload from "../formFields/FileUpload";
import {createPost, updatePost, getPost} from '../../redux/reducers/posts'

class Edit extends React.Component {

  

  onSubmit = values => {
    const {match:{params:{id = null} = {}} = {}, history} = this.props;
    let action = null
    if(id) 
      action = this.props.updatePost(id, values);
    else
      action = this.props.createPost(values);
    
      action.then((action)=>{
      history.push('/posts');
    });
  }

  componentDidMount(){
    const {match:{params:{id = null} = {}} = {}, initialize} = this.props;
    if(id){
      this.props.getPost(id).then(({response})=>{
        initialize(response);
      });
    }
  }

  componentDidUpdate(){

  }

  render () {
    const {handleSubmit} = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" label="Title" component={TextField} />
        <Field name="content" label="Content" component={TextAreaField} />
        <FieldArray name="images" accept="image/*" label="Images" component={FileUpload} />
        <FieldArray name="attachments" valueKey='file' label="Attachments" component={FileUpload} />
        <button className="btn btn-primary">Save</button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch=>({
  createPost: data=>dispatch(createPost(data)),
  updatePost: (id, data)=>dispatch(updatePost(id, data)),
  getPost: data=>dispatch(getPost(data)),
})

const mapStateToProps = state=>({
  posts: state.posts
})

export default reduxForm({
  form: 'edit_posts_form'
})(
  connect(mapStateToProps, mapDispatchToProps)(
    withRouter(Edit)
    )
  )
