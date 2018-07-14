import {
  getAllQuestions
} from './actions'

import {
  getAllQuestions as getAllQuestionsRequest,
} from '../../services/homeApi'

export const onGetAllQuestions = () => {
  return (dispatch) => {
    // dispatch(getAllQuestions())
    return fetch('https://c8c2d869.ngrok.io/api/question', {
      method: 'GET',
      // body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('abc', res)
        res.json()
      })
      .then((data) => {
        console.log('abc', data)
      })
  }
}
