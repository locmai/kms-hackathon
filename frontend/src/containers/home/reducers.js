import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import {
  getAllQuestions,
} from './actions'

const initState = fromJS({
  question: {},
})

const homeReducers = handleActions(
  {
    [getAllQuestions]: (state, action) => {
      return initState
    },
    [getAllQuestions.done]: (state, action) => {
      // const { answer, message, type } = this.action
      console.log('hihi', action.payload)
      return state.merge({
        question: this.action,
      })
    },
    [getAllQuestions.error]: (state, action) => {
      return initState
    },
  },
  initState,
)

export default homeReducers
