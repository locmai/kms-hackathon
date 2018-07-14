import { getAllQuestions } from './actions'

import { getAllQuestions as getAllQuestionsRequest } from '../../services/homeApi'

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
