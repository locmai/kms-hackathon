import { getAllQuestions, sendMessage, importCV } from './actions'

import { 
  getAllQuestions as getAllQuestionsRequest,
  sendMessage as sendMessageRequest,
  importCV as importCVRequest,
} from '../../../services/homeApi'

 export const onImportCV = (file1, file2, file3) => {
  return dispatch => {
    dispatch(importCV())
    return importCVRequest({ filename: file1, file: file3 })
      .then(res => {
        // console.log('abc', res)
        return res.json()
      })
      .then(data => {
        if (data) {
          dispatch(importCV.done(data))
        } else {
          dispatch(importCV.error({}))
        }
      })
  }
}

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
  return (dispatch, getState) => {
    const { messages } = getState('messages').chatboxReducers
    dispatch(sendMessage(msg))
    let postMessages = {
      root: [],
      list_message: [],
      message: msg.message,
    }
    if (messages && messages.length > 0) {
      const oldRoot = messages[messages.length - 1].root ? messages[messages.length - 1].root : []
      const root = [...oldRoot]
      root.push(msg.message === 'Có biết' ? 1 : 0)
      postMessages = {
        root: [...root],
        list_message: [],
        message: msg.message,
      }
    }
    return sendMessageRequest({...postMessages})
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