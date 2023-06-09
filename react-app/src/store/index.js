import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import stocksReducer from './stock'
import walletReducer from "./wallet"
import transactionReducer from './transaction';
import watchlistReducer from "./watchlist";
import portfolioReducer from './portfolio';
import sharesReducer from './shares';

const rootReducer = combineReducers({
  session,
  stocksReducer,
  walletReducer,
  transactionReducer,
  watchlistReducer,
  portfolioReducer,
  sharesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
