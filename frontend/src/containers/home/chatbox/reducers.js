import { handleActions } from 'redux-actions'
// import { fromJS } from 'immutable'
import {
  getAllQuestions,
  sendMessage,
  importCV,
} from './actions'

const initState = {
  messages: [],
  isLoadingMessages: false,
}

const chatboxReducers = handleActions(
  {
    [importCV]: (state, action) => {
      return {
        ...initState,
      }
    },
    [importCV.done]: (state, action) => {
      return {
        ...initState,
      }
    },
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
      let { message } = action.payload
      let root = []
      if (state.messages) {
        root = state.messages[state.messages.length - 1].root ? state.messages[state.messages.length - 1].root : []
      }
      message = {...message, root}
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

export default chatboxReducers
