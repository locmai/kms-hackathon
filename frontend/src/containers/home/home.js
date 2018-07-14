import React from 'react'
import { connect } from 'react-redux'
import * as homeActions from './middlewares'
import { bindActionCreators } from 'redux'
import './styles.scss'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
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
    const { messages } = this.props
    return (
      <div className='chatbox-container'>
        <Scrollbars className='chatbox-body' autoHide={true} ref={(c) => this.scrollbars = c}>
          {messages && messages.length > 0 &&
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
              {messages[messages.length - 1].type === 'multiple_choice' && (
                <div className='multichoice-container'>
                  <Button variant='outlined' size='medium' className='yes-button' onClick={() => this.onClickMultiChoiceButton('Yes')}>
                    Yes
                  </Button>
                  <Button variant='outlined' size='medium' className='no-button' onClick={() => this.onClickMultiChoiceButton('No')}>
                    No
                  </Button>
                </div>
              )}
            </React.Fragment>
          }
        </Scrollbars>

        <Input
          id='message-input'
          // label='Type'
          className={'message-input'}
          value={message}
          onChange={this.handleChange('message')}
          // margin='normal'
          placeholder='Type a message'
          disableUnderline={true}
          multiline={true}
          rows={1}
          rowsMax={3}
          autoFocus={true}
          onKeyPress={e => this.onDetectEnterKey(e, message)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.homeReducers.messages,
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