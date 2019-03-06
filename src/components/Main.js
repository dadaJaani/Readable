import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addPost,
         removePost,
         addComment,
         removeComment,
         fetchCategories,
         fetchPostsFromCategory,
         fetchPosts ,
         fetchComments, } from '../actions'

import { push } from 'react-router-redux'
import TiDelete from 'react-icons/lib/ti/delete'

import '../styles/readable.css'
import CreatePost from './CreatePost'
import PostList from './PostList'


class Main extends Component {

  render() {

    return(
      <div>
        <div className="category-list">
          <h3>
            Select Category
          </h3>
          {this.props.categories.map(c => (
            <div
              className="category-list-item"
              key={c.name}
              ref={(cat) => this.selectedCategory = cat}
              onClick={ () => {
                this.props.goToCategory(c.name)
                this.props.fetchPostsFromCategory(c.name)
              }}>
              {c.name}
            </div>
          ))}

          <div title="Clear Filter"
            className="category-list-item"
            onClick={ () => {
            this.props.goToCategory("")
            this.props.fetchPosts()
          }}>
            Clear All
          </div>

        </div>

        <CreatePost />


        <PostList />
      </div>
    )
  }
}



function mapStateToProps (state){
  return {
    posts: state.post,
    comments: state.comment,
    categories: state.category,
    router: state.router
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    removeComment: (data) => dispatch(removeComment(data)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: (data) => dispatch(fetchComments(data)),
    fetchPostsFromCategory: (data) => dispatch(fetchPostsFromCategory(data)),
    goToCategory: (cat) => dispatch(push('/'+cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
