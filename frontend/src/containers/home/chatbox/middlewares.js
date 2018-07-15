import { getAllQuestions, sendMessage, importCV } from './actions'

import { 
  getAllQuestions as getAllQuestionsRequest,
  sendMessage as sendMessageRequest,
  importCV as importCVRequest,
} from '../../../services/homeApi'

 export const onImportCV = (file1, file2, file3) => {
  return dispatch => {
    dispatch(importCV())
    return importCVRequest({ file: file3 })
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
    const { messages } = getState()
    dispatch(sendMessage(msg))
    let postMessages = {}
    if (messages && messages.length > 0) {
      postMessages = {
        root: [],
        list_message: [],
        message: msg.message,
      }
    } else {
      postMessages = {
        root: [],
        list_message: [],
        message: msg.message,
      }
      console.log('hihi', postMessages)
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