import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import {
  getAllQuestions,
} from './actions'

const initState = fromJS({
  conversationsList: [],
})

export const BotConversationsReducers = handleActions(
  {
    [getAllQuestions]: (state, action) => {
      return initState
    },
    [getAllQuestions.done]: (state, action) => {
      return initState
    },
    [getAllQuestions]: (state, action) => {
      return initState
    },
  },
  initState,
)
