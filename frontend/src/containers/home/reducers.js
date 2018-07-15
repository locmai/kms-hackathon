import { handleActions } from 'redux-actions'

import {
  switchToJobsList,
} from './actions'

const initState = {
  isChatboxShown: true,
  // jobsList: [],
  // isLoadingJobs: false,
}

const homeReducers = handleActions(
  {
    [switchToJobsList]: (state, action) => {
      // console.log('abc', action.payload)
      return {
        ...initState,
        // jobsList: [...action.payload.value],
        isChatboxShown: false,
      }
    },
  },
  initState,
)

export default homeReducers
