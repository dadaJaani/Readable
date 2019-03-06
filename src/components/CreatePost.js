import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, getCategoriesSuccess } from '../actions'
import uid from 'uid'
import Modal from 'react-modal'

import * as ReadableAPI from '../utils/api'
import "../styles/post.css"
import '../styles/readable.css'

class CreatePost extends Component {

  state = {
    isModalOpen: false
  }

  isNotUnique = (toCheckId) => {
    let ids = this.props.posts.map( p => p.id )
    return (ids.includes(toCheckId))
  }

  createPost = (e) => {
    e.preventDefault();
    let id = uid(20);
    while (this.isNotUnique(id)){
      id = uid(20);
    }
    this.props.addPost({
      id: id,
      timestamp: Date.now(),
      title: this.titlePost.value,
      body: this.bodyPost.value,
      author: this.authorPost.value,
      category: this.categoryPost.value
    })
    this.titlePost.value = ""
    this.bodyPost.value = ""
    this.authorPost.value = ""
    this.categoryPost.value = ""
    this.closeModal()
  }

  openModal = () => {
    this.setState(() => (
      {
        isModalOpen: true
      }
    ))
  }

  closeModal = () => {
    this.setState(() => (
      {
        isModalOpen: false
      }
    ))
  }

  render() {
    let sortedCategories = this.props.categories.map(x => x.name)
    // To display the categories in a sorted order
    sortedCategories.sort()

    return(
      <div>
        <button className="create-post-button" onClick={this.openModal}>New Post</button>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
        >
          <div className="modal-create-post">
            <h1>Create a New Post</h1>
            <input className="input-title" ref={(inp) => this.titlePost = inp} placeholder="Title" /><br/>
            <textarea className="input-body" ref={(inp) => this.bodyPost = inp} rows="10" placeholder="Write your post here" /><br/>
            <input className="input-author" ref={(inp) => this.authorPost = inp} placeholder="Name" /><br/>
            <select className="input-category" ref={(inp) => this.categoryPost = inp}><br/>
              <option>Select Category</option>
              {sortedCategories.map( cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select><br/>
            <button className="button-post" onClick={this.createPost}>Post</button>


          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    posts: state.post,
    comments: state.comment,
    categories: state.category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
