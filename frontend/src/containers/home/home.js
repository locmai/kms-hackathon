import React from 'react'
import { connect } from 'react-redux'
import * as homeActions from './middlewares'
import { bindActionCreators } from 'redux'
import './styles.scss'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Scrollbars } from 'react-custom-scrollbars'

class Home extends React.Component {
  state = {
    message: '',
  }

  handleChange = maessage => event => {
    this.setState({
      [maessage]: event.target.value,
    })
  }

  componentDidMount() {
    this.props.actions.getAllQuestions()
  }

  componentDidUpdate() {
    if (this.scrollbars) {
      this.scrollbars.scrollToBottom()
    }
  }
  isEmpty(input) {
    if (!input || input.match(/^[\s]*$/)) {
      return true
    }
    return false
  }

  onSendMessage = message => {
    if (!this.isEmpty(message)) {
      const { actions } = this.props
      actions.sendMessage({ message, isFromUser: true })

      this.setState({
        message: '',
      })
    }
  }

  onDetectEnterKey = (event, message) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
    }
    if (!this.isEmpty(message) && (event.key === 'Enter' && !event.shiftKey)) {
      this.onSendMessage(message)
    }
  }

  onClickMultiChoiceButton(message) {
    this.onSendMessage(message)
  }

  render() {
    const { message } = this.state
    const { messages, isLoadingMessages } = this.props
    let isYesNoQuestion = false
    let isPredicted = false
    const hasMessage = messages && messages.length > 0
    const hasLastMessage = hasMessage && messages[messages.length - 1]
    const isConsultMessage = messages.length > 0 && messages[messages.length - 1].answers && messages[messages.length - 1].answers.length > 0
    const isHasChoice = hasMessage && isConsultMessage
    const isStillAskQuestion = hasLastMessage && isHasChoice
    const isDonePredicted = messages &&
      messages.length > 0 &&
      messages[messages.length - 1] && messages[messages.length - 1].predict
    if (isStillAskQuestion) {
      isYesNoQuestion = true
    }
    if (isDonePredicted) {
      isPredicted = true
    }

    return (
      <div className='chatbox-container'>
        <Scrollbars className='chatbox-body' autoHide={true} ref={(c) => this.scrollbars = c}>
          {messages && messages.length > 0 && (
            <React.Fragment>
              {messages.map((message, index) =>
                (
                  <React.Fragment key={index}>
                    {!message.isFromUser
                      ? (
                        <div className='admin'>
                          {message.message}
                        </div>
                      )
                      : (
                        <div className='user'>
                          {message.message}
                        </div>
                      )
                    }
                    {/* <div className='user'>
                  Hello
                  </div> */}
                  </React.Fragment>
                ))
              }
              {isYesNoQuestion && (
                <div className='button-groups'>
                  <Button variant='outlined' size='medium' className='success-button' onClick={() => this.onClickMultiChoiceButton(messages[messages.length - 1].answers[0])}>
                    {messages[messages.length - 1].answers[0]}
                  </Button>
                  <Button variant='outlined' size='medium' className='failure-button' onClick={() => this.onClickMultiChoiceButton(messages[messages.length - 1].answers[1])}>
                    {messages[messages.length - 1].answers[1]}
                  </Button>
                </div>
              )}
              {isPredicted && (
                <div className='button-groups'>
                  <Button variant='outlined' size='medium' className='success-button' onClick={() => { }}>
                    Xem danh sách
                  </Button>
                </div>
              )}
            </React.Fragment>
          )}
          {isLoadingMessages && <CircularProgress className={'progress'} />}
        </Scrollbars>

        {!isLoadingMessages && (
          <Input
            id='message-input'
            // label='Type'
            className={'message-input'}
            value={message}
            onChange={this.handleChange('message')}
            // margin='normal'
            placeholder={isYesNoQuestion || isPredicted ? 'Xin hãy bấm chọn' : 'Nhập câu trả lời'}
            disableUnderline={true}
            multiline={true}
            rows={1}
            disabled={isYesNoQuestion || isPredicted}
            rowsMax={4}
            autoFocus={true}
            onKeyPress={e => this.onDetectEnterKey(e, message)}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.homeReducers.messages,
    isLoadingMessages: state.homeReducers.isLoadingMessages,
    // successMessage: state.account.successMessage,
    // isFetching: state.account.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getAllQuestions: homeActions.onGetAllQuestions,
      sendMessage: homeActions.onSendMessage,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)