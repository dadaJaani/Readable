import * as ReadableAPI from '../utils/api';

export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_POST_CATEGORIES = "GET_POST_CATEGORIES"
export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const GET_POST = "GET_POST"
export const EDIT_POST = "EDIT_POST"
export const VOTE_POST = "VOTE_POST"
export const GET_COMMENTS = "GET_COMMENTS"
export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const PICK_CURRENT = "PICK_CURRENT"
export const REMOVE_CURRENT = "REMOVE_CURRENT"

// =======================================================================
//   CATEGORY ACTIONS
// =======================================================================
export function getCategoriesSuccess (categoriesFromServer){
  return{
    type: GET_CATEGORIES,
    categoriesFromServer
  }
}

// =======================================================================
//   POST ACTIONS
// =======================================================================
export function getPostsFromCategorySuccess (postsFromCategories){
  return {
    type: GET_POST_CATEGORIES,
    postsFromCategories
  }
}

export function getAllPostsSuccess (postsFromServer){
  return {
    type: GET_ALL_POSTS,
    postsFromServer
  }
}


export function addPostSuccess (post){
  return {
    type: ADD_POST,
    post,
  }
}

export function removePostSuccess (postId){
  return {
    type: REMOVE_POST,
    postId
  }
}

export function editPostSuccess (editedPost){
  return {
    type: EDIT_POST,
    editedPost
  }
}

export function votePostSuccess (votedPost){
  return{
    type: VOTE_POST,
    votedPost
  }
}

// =======================================================================
//   COMMENTS ACTIONS
// =======================================================================
export function getAllCommentsSuccess (commentsFromServer){
  return {
    type: GET_COMMENTS,
    commentsFromServer
  }
}

export function addCommentSuccess (comment){
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function removeCommentSuccess (commentID){
  return {
    type: REMOVE_COMMENT,
    commentID
  }
}

export function editCommentSuccess (editedComment){
  return{
    type: EDIT_COMMENT,
    editedComment
  }
}

export function voteCommentSuccess(votedComment){
  return{
    type: VOTE_COMMENT,
    votedComment
  }
}

// =======================================================================
//   CURRENT POST ACTIONS
// =======================================================================
export function pickPost (post){
  return {
    type: PICK_CURRENT,
    post
  }
}

export function removeCurrentPost (){
  return {
    type: REMOVE_CURRENT,
  }
}

// =======================================================================
//    THUNK MIDDLEWARE!!
//    USING THESE TO DO ASYNC OPERATIonS
// =======================================================================

// =======================================================================
//   FOR CATEGORIES
// =======================================================================

export function fetchCategories() {
  return (dispatch) => {
    ReadableAPI.getCategories().then( cat =>
      dispatch(getCategoriesSuccess(cat)))
  }
}


// =======================================================================
//   For POSTS
// =======================================================================

export function fetchPostsFromCategory(cat) {
  return (dispatch) => {
    ReadableAPI.getPostsFromCategory(cat).then( p =>
      dispatch(getPostsFromCategorySuccess(p)))
  }
}

export function fetchPosts() {
  return (dispatch) => {
    ReadableAPI.getAllPosts().then( p =>
      dispatch(getAllPostsSuccess(p)))
  }
}

export function addPost(post){
  return (dispatch) => {
    ReadableAPI.addPost(post).then( p =>
      dispatch(addPostSuccess(p)))
  }
}

export function removePost (postId){
  return (dispatch) => {
    ReadableAPI.deletePost(postId).then( () =>
      dispatch(removePostSuccess(postId)))
  }
}

export function editPost (postId, edited){
  return (dispatch) => {
    ReadableAPI.editPost(postId, edited).then( p =>
      dispatch(editPostSuccess(p)))
  }
}

export function votePost (postId, voteString){
  return (dispatch) => {
    ReadableAPI.votePost(postId, voteString).then( (p) =>
      dispatch(votePostSuccess(p)))
  }
}

// =======================================================================
//    FOR COMMENTS
// =======================================================================
export function fetchComments(postId) {
  return (dispatch) => {
    ReadableAPI.getAllComments(postId).then( c =>
      dispatch(getAllCommentsSuccess(c)))
  }
}

export function addComment(comment){
  return (dispatch) => {
    ReadableAPI.addComment(comment).then( c =>
      dispatch(addCommentSuccess(c)))
  }
}

export function removeComment (commentID){
  return (dispatch) => {
    ReadableAPI.deleteComment(commentID).then( () =>
      dispatch(removeCommentSuccess(commentID)))
  }
}

export function editComment (commentId, edited){
  return (dispatch) => {
    ReadableAPI.editComment(commentId, edited).then( c =>
      dispatch(editCommentSuccess(c)))
  }
}

export function voteComment(commentId, voteString) {
  return (dispatch) => {
    ReadableAPI.voteComment(commentId, voteString).then( c =>
      dispatch(voteCommentSuccess(c)))
  }
}
