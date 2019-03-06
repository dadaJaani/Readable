import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchCategories, fetchPosts } from '../actions'
import { Route, Switch } from 'react-router-dom'

import '../styles/readable.css'
import { push } from 'react-router-redux'
import Main from './Main'
import Post from './Post'
import CreatePost from './CreatePost'


class App extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  state = {
    posts: {},
    category: ""
  }

  render() {

    return (
      <div >
        <div className="readable-header" onClick={() => {
          this.props.fetchPosts()
          this.props.goHome()
        }}>
          Readable
        </div>


        <Switch>

        <Route exact path={'/'+this.state.category} render={() => (
            <Main/>
          )}
        />

        {this.props.categories.map(c => (
          <Route exact path={'/'+c.name} render={() => (
              <Main />
            )}
          />
        ))}

        <Route path='/:category/:post_id' render={() => (
           <Post/>
          )}
        />

        </Switch>

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
    fetchCategories: () => dispatch(fetchCategories()),
    goHome: () => dispatch(push('/')),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
