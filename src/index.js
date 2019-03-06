import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'

// Importing react-router-redux because react-router-dom didn't work!
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middlewareForRouter = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, middlewareForRouter)
  )
)

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}><App /></ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
// ReactDOM.render(<Provider store={store}>
//     <App />
//   </Provider>, document.getElementById('root'));

// The following website was used for learning and using react-router-redux
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
