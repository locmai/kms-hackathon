import { switchToJobsList } from './actions'

// import { 
//   getAllQuestions as getAllQuestionsRequest,
//   sendMessage as sendMessageRequest,
//  } from '../../../services/homeApi'

export const onSwitchToJobsList = (value) => {
  return dispatch => {
    dispatch(switchToJobsList(value))
    // return getAllQuestionsRequest()
    //   .then(res => {
    //     // console.log('abc', res)
    //     return res.json()
    //   })
    //   .then(data => {
    //     if (data) {
    //       dispatch(getAllQuestions.done(data))
    //     } else {
    //       dispatch(getAllQuestions.error({}))
    //     }
    //   })
  }
}
