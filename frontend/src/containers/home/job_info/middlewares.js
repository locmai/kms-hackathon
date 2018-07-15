import { getJobsList } from './actions'

import {
  getJobsList as getJobsListRequest,
} from '../../../services/homeApi'

export const onGetJobsList = () => {
  return dispatch => {
    dispatch(getJobsList())
    return getJobsListRequest()
      .then(res => {
        // console.log('abc', res)
        return res.json()
      })
      .then(data => {
        if (data) {
          console.log('ỏ', data)
          dispatch(getJobsList.done(data))
        } else {
          dispatch(getJobsList.error({}))
        }
      })
  }
}