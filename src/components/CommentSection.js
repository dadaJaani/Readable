import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import * as DateTime from '../utils/time'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiTrash from 'react-icons/lib/ti/trash'
import TiEdit from 'react-icons/lib/ti/edit'
import uid from 'uid'


import { addComment, removeComment, voteComment, editComment, fetchComments } from '../actions'


class CommentSection extends Component {
  state = {
    editModalOpen: false,
    deleteConfirm: false,
    currentComment: {}
  }

  isNotUnique = (toCheckId) => {
    let ids = this.props.comments.map( p => p.id )
    return (ids.includes(toCheckId))
  }

  createComment = (e) => {
    e.preventDefault();
    let id = uid(20);
    while (this.isNotUnique(id)){
      id = uid(20);
    }

    this.props.addComment({
      id: id,
      timestamp: Date.now(),
      body: this.comment.value,
      author: this.author.value,
      parentId: this.props.currentPost.id
    })
    this.author.value = ""
    this.comment.value = ""
  }


  closeEdit = () => {
    this.setState(() => (
      {
        editModalOpen: false
      }
    ))
  }

  openEdit = (currentComment) => {
    this.setState(() => (
      {
        editModalOpen: true,
        currentComment
      }
    ))
  }

  editComment = () => {

    this.props.editComment(this.state.currentComment.id, {
      timestamp: Date.now(),
      body: this.editComment.value
    })

    this.setState(() => (
      {
        editModalOpen: false,
        currentComment: {}
      }))
  }

  openDelete = (currentComment) => {
    this.setState(() => (
      {
        deleteConfirm: true,
        currentComment
      }
    ))
  }

  closeDelete = () => {
    this.setState(() => (
      {
        deleteConfirm: false,
        currentComment: {}
      }
    ))
  }

  deleteComment = () => {
    this.props.deleteComment(this.state.currentComment.id)
    this.props.fetchComments(this.props.currentPost.id)

    this.setState(() => (
      {
        deleteConfirm: false,
        currentComment: {}
      }))
  }

  render() {
    let sortedCommentByVote = this.props.comments.map(x => x)
    sortedCommentByVote.sort((a, b) => (b.voteScore - a.voteScore))

    return(
      <div className="comment-container">
        <div className="comment-header">
          Comments
        </div>
        {sortedCommentByVote.map(comment => (
          <div className="comment-list-item" key={comment.id}>
            <div className="comment-author">
              {comment.author}
            </div>
            <div className="comment-body">
              {comment.body}
            </div>
            <div className="comment-footer">
              <div className="comment-button-like" onClick={() => this.props.upVote(comment.id)} >
                <TiThumbsUp size={18}/>
              </div>
              <div className="comment-button-number">
                {comment.voteScore-1}
              </div>
              <div className="comment-button-dislike" onClick={() => this.props.downVote(comment.id)}>
                <TiThumbsDown size={18} />
              </div>
              <div className="comment-button-date">
                {DateTime.dateCreator(comment.timestamp)}
              </div>
              <div className="comment-button-edit" onClick={() => this.openEdit(comment)}>
                <TiEdit size={18}/>
              </div>
              <div className="comment-button-delete" onClick={() => this.openDelete(comment)}>
                <TiTrash size={18}/>
              </div>
            </div>
          </div>
        ))}

        <div className="new-comment">
          <input className="new-comment-author" ref={(a) => this.author = a} placeholder="Name" />
          <textarea className="new-comment-body"  ref={(a) => this.comment = a } rows={5} placeholder="..."/>
          <button className="new-comment-button" onClick={this.createComment}>Comment</button>
        </div>

        <Modal
          isOpen={this.state.editModalOpen}
          onRequestClose={this.closeEdit}
          contentLabel="Modal"
        >
          <div className="modal-create-post">
            <h1>Edit Comment</h1>
            <textarea className="input-body" ref={(inp) => this.editComment = inp} rows="10" placeholder="Edit your C here" defaultValue={this.state.currentComment.body}/>
            <button className="button-post" onClick={() => {
              // This was done because this button stopped working after once
              this.props.editComment(this.state.currentComment.id, {
                timestamp: Date.now(),
                body: this.editComment.value
              })

              this.setState(() => (
                {
                  editModalOpen: false,
                  currentComment: {}
                }))
            }}>Edit</button>

          </div>
        </Modal>

        <Modal
          isOpen={this.state.deleteConfirm}
          onRequestClose={this.closeDelete}
          contentLabel="Modal"
          className="modal-delete-box"
        >
          <div className="modal-delete">
            <h1>Confirm Delete Comment</h1>
            <button className="button-delete-yes" onClick={this.deleteComment}>Yes</button>
            <button className="button-delete-no" onClick={this.closeDelete}>No</button>
          </div>
        </Modal>

      </div>
    )
  }

}

function mapStateToProps (state){
  return {
    comments: state.comment,
    currentPost: state.currentPost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(removeComment(data)),
    editComment: (data1, data2) => dispatch(editComment(data1, data2)),
    upVote: (id) => dispatch(voteComment(id, {option: "upVote"})),
    downVote: (id) => dispatch(voteComment(id, {option: "downVote"})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
