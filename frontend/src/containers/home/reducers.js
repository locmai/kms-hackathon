import { handleActions } from 'redux-actions'
// import { fromJS } from 'immutable'
import {
  getAllQuestions,
  sendMessage,
} from './actions'

const initState = {
  messages: [],
}

const homeReducers = handleActions(
  {
    [getAllQuestions]: (state, action) => {
      return initState
    },
    [getAllQuestions.done]: (state, action) => {
      return {
        ...initState,
        messages: [...state.messages, action.payload],
      }
    },
    [getAllQuestions.error]: (state, action) => {
      return initState
    },
    // [sendMessage]: (state, action) => {
    //   return initState
    // },
    [sendMessage.done]: (state, action) => {
      const { may_vua_moi_send } = action.payload
      console.log('abc', action.payload)
      return {
        ...initState,
        messages: [...state.messages, may_vua_moi_send],
      }
    },
  },
  initState,
)

export default homeReducers
