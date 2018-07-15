import { createAsyncAction } from '../../../utils/async_action_creator'

export const getAllQuestions = createAsyncAction('GET_ALL_QUESTIONS')

export const sendMessage = createAsyncAction('SEND_MESSAGE', (message) => {
  return {
    message,
  }
})

export const importCV = createAsyncAction('IMPORT_CV')