import { getAllQuestions } from './actions';

import { getAllQuestions as getAllQuestionsRequest } from '../../services/homeApi';

export const onGetAllQuestions = () => {
  return dispatch => {
    // dispatch(getAllQuestions())
    return fetch('http://127.0.0.1:5000/api/question', {
      method: 'GET',
      // body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('abc', res);
        return res.json();
      })
      .then(data => {
        console.log('abc', data);
      });
  };
};
