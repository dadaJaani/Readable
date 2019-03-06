import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { push } from 'react-router-redux'
import * as DateTime from '../utils/time'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiTrash from 'react-icons/lib/ti/trash'
import TiEdit from 'react-icons/lib/ti/edit'
import Modal from 'react-modal'

import { editPost,
         removePost,
         pickPost,
         removeCurrentPost,
         votePost } from '../actions'

import "../styles/post.css"
import "../styles/readable.css"

class PostList extends Component {
  state = {
    editModalOpen: false,
    deleteConfirm: false,
    post: {},
    sortingMethod: "VOTE",
    sortingOrder: 0,
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

    this.setState(() => (
      {
        deleteConfirm: false,
        postIdToDelete: ""
      })
    )
  }

  changeSortingOrder = (val) => {
    this.setState(() => (
      {
        sortingOrder: val
      }
    ))
  }

  changeSortingMethod = () => {
    this.setState(() => (
      {
        sortingMethod: this.sortMethod.value
      }
    ))
  }

  sortList = (order, type) => {
    let sorted = this.props.posts.map(x => x)

    switch (this.state.sortingMethod) {
      case "AUTHOR":
        if(this.state.sortingOrder === 1){
          sorted.sort((a, b) => {
            if (a.author.toLowerCase() < b.author.toLowerCase()) {
              return -1;
            }
            if (a.author.toLowerCase() > b.author.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        } else {
          sorted.sort((a, b) => {
            if (a.author.toLowerCase() < b.author.toLowerCase()) {
              return 1;
            }
            if (a.author.toLowerCase() > b.author.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        }
        return sorted

      case "DATE":
        if(this.state.sortingOrder === 1)
          sorted.sort((a, b) => (a.timestamp - b.timestamp))
        else
          sorted.sort((a, b) => (b.timestamp - a.timestamp))

        return sorted

      case "VOTE":
        if(this.state.sortingOrder === 1)
          sorted.sort((a, b) => (a.voteScore - b.voteScore))
        else
          sorted.sort((a, b) => (b.voteScore - a.voteScore))

        return sorted

      case "TITLE":
        if(this.state.sortingOrder === 1){
          sorted.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        } else {
          sorted.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return 1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        }
        return sorted

      default:
        return sorted
    }
  }

  render() {
    // Sort the post by Time. The most recent is on top

    let sortedPostByVote = this.sortList("asd", "DATE")


    return(
      <div className="post-list-container">

        <div className="post-list-container-header">
          <div className="filter">
            <span>Sort by </span>
            <select
              defaultValue="VOTE"
              ref={(val) => this.sortMethod = val}
              onChange={this.changeSortingMethod}
            >
              <option value="AUTHOR">Author</option>
              <option value="DATE">Date</option>
              <option value="VOTE">Likes</option>
              <option value="TITLE">Title</option>
            </select>
          </div>

          <div  className="order">
            <span>Order</span>
            <input
              type="radio"
              name="order"
              onClick={() => this.changeSortingOrder(1)}
            /><label>Ascending</label>
            <input
              defaultChecked
              type="radio"
              name="order"
              value="1"
              onClick={() => this.changeSortingOrder(0)}
            /><label>Descending</label>
          </div>
        </div>

        {sortedPostByVote.map( post => (
          <div className="post-list-item"
               key={post.id}
               onClick={() => this.props.pickPost(post)}
          >

            <div className="post-list-item-header" onClick={() => this.props.goToPost2(post.category, post.id)}>
              <h3 className="post-list-item-title">{post.title}</h3>
              <div className="post-list-item-subheader">
                <h6>{post.author}</h6>
                <span>- {DateTime.dateCreator(post.timestamp)} {DateTime.timeCreator(post.timestamp)}</span>
              </div>
            </div>


            <div className="post-list-item-body" onClick={() => this.props.goToPost2(post.category, post.id)}>
              <p>{post.body.length>500 ? `${post.body.substr(0,500)}...` : `${post.body}`}</p>
            </div>

            <div className="post-list-item-footer">
              <div className="post-like" title="Like" onClick={() => this.props.upVote(post.id)}>
                <TiThumbsUp size={22} className="selectable-icon"/>
              </div>
              <div className="post-noLike" title="Number of likes">
                {post.voteScore-1}
              </div>
              <div className="post-dislike" title="Disike" onClick={() => this.props.downVote(post.id)}>
                <TiThumbsDown size={22} className="selectable-icon"/>
              </div>
              <div className="post-noComment" title="Number of comments">
                {post.commentCount}
              </div>
              <div className="post-comment" title="Comments" onClick={() => this.props.goToPost2(post.category, post.id)}>
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
        ))}

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

function mapStateToProps (state){
  return {
    posts: state.post,
    comments: state.comment,
    categories: state.category,
    currentPost: state.currentPost,
    router: state.router
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (data1, data2) => dispatch(editPost(data1, data2)),
    deletePost: (data) => dispatch(removePost(data)),
    pickPost: (data) => dispatch (pickPost(data)),
    removeCurrentPost: () => dispatch(removeCurrentPost()),
    upVote: (pID) => dispatch(votePost(pID, {option: "upVote"})),
    downVote: (pID) => dispatch(votePost(pID, {option: "downVote"})),
    goToPost: () => dispatch(push('/post')),
    goToPost2: (cat, id) => dispatch(push('/'+cat+'/'+id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
