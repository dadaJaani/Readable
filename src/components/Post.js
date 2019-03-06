import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import * as DateTime from '../utils/time'
import { fetchComments, votePost, editPost, removePost, removeCurrentPost } from '../actions'
import CommentSection from './CommentSection'

import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import TiTrash from 'react-icons/lib/ti/trash'
import TiEdit from 'react-icons/lib/ti/edit'
import Modal from 'react-modal'

import "../styles/post.css"
import "../styles/readable.css"

class Post extends Component {
  state = {
    editModalOpen: false,
    deleteConfirm: false,
    postIdToDelete: "",
    voteScore: (this.props.currentPost.voteScore - 1)
  }

  componentDidMount() {
    this.props.fetchComments(this.props.currentPost.id);
  }

  closeEdit = () => {
    this.setState(() => (
      {
        editModalOpen: false
      }
    ))
  }

  openEdit = (post) => {
    this.setState(() => (
      {
        editModalOpen: true,
        post
      }
    ))
  }

  editPost = () => {

    this.props.editPost(this.props.currentPost.id, {
      title: this.titleEditPost.value,
      body: this.bodyEditPost.value
    })
    this.setState(() => (
      {
        editModalOpen: false,
        post: {}
      }))
  }

  openDelete = (id) => {
    this.setState(() => (
      {
        deleteConfirm: true,
        postIdToDelete: id
      }
    ))
  }

  closeDelete = () => {
    this.setState(() => (
      {
        deleteConfirm: false,
        postIdToDelete: ""
      }
    ))

  }

  deletePost = () => {
    this.props.deletePost(this.state.postIdToDelete)
    this.props.goHome()
  }

  voteUp = () => {
    this.props.upVote(this.props.currentPost.id)
    this.setState((prevState) => {
      return {voteScore: prevState.voteScore + 1}
    })
  }

  voteDown = () => {
    this.props.downVote(this.props.currentPost.id)
    this.setState((prevState) => {
      return {voteScore: prevState.voteScore - 1}
    })
  }

  render() {
    let post = this.props.currentPost
    console.log(post);
    console.log(post.id);
    console.log(this.props.currentPost);
    if (post.id === undefined ){
      return(
        <div className="error-container">
          <div className="error">
            There is no post on this url!
          </div>
          <button className="error-button" onClick={() => this.props.goHome()}>Go Home</button>
        </div>
      )
    } else {
      return(
        <div>
          <div className="home-link" onClick={() => this.props.goHome()}>
            Home
          </div>

          <div className="post-container">
            <div className="post-heading">
              <h3>{post.title}</h3>
            </div>

            <div className="post-body">
              <p>{post.body}</p>
              <p>{DateTime.dateCreator(post.timestamp)}</p>
              <h6>{post.author}</h6>
            </div>

            <div className="post-footer">
              <div className="post-like"  onClick={this.voteUp}>
                <span title="Like"><TiThumbsUp size={22} /></span>
              </div>
              <div className="post-noLike">
                {this.state.voteScore}
              </div>
              <div className="post-dislike"  onClick={this.voteDown}>
                <span title="Disike"><TiThumbsDown size={22} /></span>
              </div>
              <div className="post-noComment" title="Number of comments">
                {post.commentCount}
              </div>
              <div className="post-comment" title="Comments" onClick={() => this.props.goToPost()}>
                <FaCommentO size={20} className="selectable-icon"/>
              </div>
              <div className="post-edit" onClick={() => this.openEdit(post.id)}>
                Edit <TiEdit size={20}/>
              </div>
              <div className="post-delete" onClick={() => this.openDelete(post.id)}>
                Delete <TiTrash size={20}/>
              </div>
            </div>
          </div>

          <CommentSection />

          <Modal
            isOpen={this.state.editModalOpen}
            onRequestClose={this.closeEdit}
            contentLabel="Modal"
          >
            <div className="modal-create-post">
              <h1>Edit Post</h1>
              <input className="input-title" ref={(inp) => this.titleEditPost = inp} placeholder="Title" defaultValue={this.props.currentPost.title}/>
              <textarea className="input-body" ref={(inp) => this.bodyEditPost = inp} rows="18" placeholder="Edit your post here" defaultValue={this.props.currentPost.body}/>
              <button className="button-post" onClick={this.editPost}>Edit</button>

            </div>
          </Modal>


          <Modal
            isOpen={this.state.deleteConfirm}
            onRequestClose={this.closeDelete}
            contentLabel="Modal"
            className="modal-delete-box"
          >
            <div className="modal-delete">
              <h1>Confirm Delete Post</h1>
              <button className="button-delete-yes" onClick={this.deletePost}>Yes</button>
              <button className="button-delete-no" onClick={this.closeDelete}>No</button>
            </div>
          </Modal>


        </div>
      )
    }
  }
}

function mapStateToProps (state){
  return {
    comments: state.comment,
    categories: state.category,
    currentPost: state.currentPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
    goHome: () => dispatch(push('/')),
    removeCurrentPost: () => dispatch(removeCurrentPost()),
    upVote: (pID) => dispatch(votePost(pID, {option: "upVote"})),
    downVote: (pID) => dispatch(votePost(pID, {option: "downVote"})),
    editPost: (data1, data2) => dispatch(editPost(data1, data2)),
    deletePost: (data) => dispatch(removePost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
