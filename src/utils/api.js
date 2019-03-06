
const api = "http://localhost:3001"


// Generate a unique token for storing your data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': 'whatever i want'
}


export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsFromCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    // .then(data => data.posts)

export const addPost = (newPost) =>
  fetch(`${api}/posts`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( newPost )
  }).then(res => res.json())

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

// voteString must have { option: "upVote" or "downVote"}
export const votePost = (postId, voteString) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( voteString )
  }).then(res => res.json())

export const editPost = (postId, edited) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(edited)
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'delete',
    headers: {
      ...headers
    }
  }).then(res => res.json())


// ==========================================================================
//   THIS IS THE SECTion FOR COMMENTS
// ==========================================================================

export const getAllComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())


export const addComment = (newComment) =>
  fetch(`${api}/comments`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( newComment )
  }).then(res => res.json())


export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())

// voteString must have { option: "upVote" or "downVote"}
export const voteComment = (commentId, voteString) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( voteString )
  }).then(res => res.json())

// The edited Object has the timestamp and body.
export const editComment = (commentId, edited) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'put',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( edited )
  }).then(res => res.json())


export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'delete',
    headers: {
      ...headers
    }
  }).then(res => res.json())
