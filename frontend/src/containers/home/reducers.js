import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import {
  getAllQuestions,
} from './actions'

const initState = {
  question: {},
}

const homeReducers = handleActions(
  {
    [getAllQuestions]: (state, action) => {
      return initState
    },
    [getAllQuestions.done]: (state, action) => {
      return {
        ...initState,
        question: action.payload,
      }
    },
    [getAllQuestions.error]: (state, action) => {
      return initState
    },
  },
  initState,
)

export default homeReducers
