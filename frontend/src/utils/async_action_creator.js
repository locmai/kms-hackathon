import { createAction } from 'redux-actions'

export const createAsyncAction = (
  actionType,
  payloadHandler,
  successPayloadHandler,
  errorPayLoadHandler,
) => {
  const type = String(actionType || 'UNK').toUpperCase()
  const defaultHandler = params => params
  const mainAction = createAction(type, payloadHandler || defaultHandler)
  mainAction.done = createAction(
    `${type}__DONE`,
    successPayloadHandler || defaultHandler,
  )
  mainAction.error = createAction(
    `${type}__ERROR`,
    errorPayLoadHandler || defaultHandler,
  )
  return mainAction
}
