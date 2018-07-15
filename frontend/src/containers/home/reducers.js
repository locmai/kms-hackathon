import { handleActions } from 'redux-actions'
// import { fromJS } from 'immutable'
import {
  getAllQuestions,
  sendMessage,
} from './actions'

const initState = {
  messages: [],
  isLoadingMessages: false,
}

const homeReducers = handleActions(
  {
    [getAllQuestions]: (state, action) => {
      return {
        ...initState,
        isLoadingMessages: true,
      }
    },
    [getAllQuestions.done]: (state, action) => {
      return {
        ...initState,
        messages: [...state.messages, action.payload],
        isLoadingMessages: false,
      }
    },
    [getAllQuestions.error]: (state, action) => {
      return initState
    },
    [sendMessage]: (state, action) => {
      const { message } = action.payload
      return {
        ...initState,
        messages: [...state.messages, message],
      }
    },
    [sendMessage.done]: (state, action) => {
      return {
        ...initState,
        messages: [...state.messages, action.payload],
      }
    },
  },
  initState,
)

export default homeReducers
