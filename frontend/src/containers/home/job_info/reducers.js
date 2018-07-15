import { handleActions } from 'redux-actions'
// import { fromJS } from 'immutable'
import {
  getJobsList,
} from './actions'

const initState = {
  jobsList: [],
  isLoadingJobs: false,
}

const jobsReducers = handleActions(
  {
    [getJobsList]: (state, action) => {
      return {
        ...initState,
        isLoadingJobs: true,
      }
    },
    [getJobsList.done]: (state, action) => {
      // console.log('huhu', action.payload)
      return {
        ...initState,
        jobsList: [...action.payload],
        isLoadingJobs: false,
      }
    },
    [getJobsList.error]: (state, action) => {
      return {
        ...initState,
        isLoadingJobs: false,
      }
    },
  },
  initState,
)

export default jobsReducers
