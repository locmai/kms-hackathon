import { createAsyncAction } from '../../utils/async_action_creator'

export const switchToJobsList = createAsyncAction('SWITCH_TO_OTHER_COMPONENTS',
(value) => {
  return {
    value,
  }
})