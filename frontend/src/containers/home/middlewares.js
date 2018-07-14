import { getAllQuestions, sendMessage } from './actions'

import { 
  getAllQuestions as getAllQuestionsRequest,
  sendMessage as sendMessageRequest,
 } from '../../services/homeApi'

export const onGetAllQuestions = () => {
  return dispatch => {
    dispatch(getAllQuestions())
    return getAllQuestionsRequest()
      .then(res => {
        // console.log('abc', res)
        return res.json()
      })
      .then(data => {
        if (data) {
          dispatch(getAllQuestions.done(data))
        } else {
          dispatch(getAllQuestions.error({}))
        }
      })
  }
}

export const onSendMessage = (msg) => {
  return dispatch => {
    dispatch(sendMessage(msg))
    return sendMessageRequest({ message: msg.message })
      .then(res => {
        // console.log('abc', res)
        return res.json()
      })
      .then(data => {
        if (data) {
          dispatch(sendMessage.done(data))
        } else {
          dispatch(sendMessage.error({}))
        }
      })
  }
}