import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  GET_CATEGORIES,
  GET_POST_CATEGORIES,
  GET_ALL_POSTS,
  GET_POST,
  VOTE_POST,
  EDIT_POST,
  GET_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  VOTE_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  REMOVE_POST,
  PICK_CURRENT,
  REMOVE_CURRENT,
} from '../actions'

function category (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categoriesFromServer

    default:
      return state
  }
}

function post (state = [], action) {
  const { post, postId, type } = action

  switch (type) {
    case GET_ALL_POSTS:
      return action.postsFromServer

    case GET_POST_CATEGORIES:
      return action.postsFromCategories

    case ADD_POST:
      return [
        ...state,
        post
      ]

    case ADD_COMMENT:
      return state.reduce( (currentState, existingPost) => {
        if (existingPost.id === action.comment.parentId){
          let temp = existingPost
          temp.commentCount++;
          return currentState.concat(temp)
        }
        return currentState.concat(existingPost)
      } , [])

    case REMOVE_POST:
      return state.filter((p) => p.id !== postId);

    case VOTE_POST:
      return state.reduce( (currentState, existingPost) => {
        if (existingPost.id === action.votedPost.id)
          return currentState.concat(action.votedPost)
        return currentState.concat(existingPost)
      } , [])

    case EDIT_POST:
      return state.reduce( (currentState, existingPost) => {
        if (existingPost.id === action.editedPost.id)
          return currentState.concat(action.editedPost)
        return currentState.concat(existingPost)
      } , [])

    default:
      return state
  }
}

function comment (state = [], action) {
  const { comment, commentId, type } = action

  switch (type) {
    case GET_COMMENTS:
      return action.commentsFromServer

    case ADD_COMMENT:
      return [
        ...state,
        comment
      ]

    case VOTE_COMMENT:
      return state.reduce( (currentState, existingComment) => {
        if (existingComment.id === action.votedComment.id)
          return currentState.concat(action.votedComment)
        return currentState.concat(existingComment)
      } , [])

    case REMOVE_COMMENT:
      return state.filter((com) => com.id !== commentId )

    case EDIT_COMMENT:
      return state.reduce( (currentState, existingComment) => {
        if (existingComment.id === action.editedComment.id)
          return currentState.concat(action.editedComment)
        return currentState.concat(existingComment)
      } , [])

    default:
      return state
  }
}

function currentPost (state = {}, action) {
  const {post, type} = action

  switch (type) {
    case PICK_CURRENT:
      return action.post

    case EDIT_POST:
      return action.editedPost

    case REMOVE_CURRENT:
      return {}

    default:
      return state
  }
}


export default combineReducers({
  post,
  comment,
  category,
  currentPost,
  router: routerReducer
})
