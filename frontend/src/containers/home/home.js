import React from 'react'
import { connect } from 'react-redux'
import * as homeActions from './middlewares'
import { bindActionCreators } from 'redux'
import './styles.scss'
import Input from '@material-ui/core/Input'

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

  render() {
    const { message } = this.state
    return (
      <div className='chatbox-container'>
        <div className='chatbox-body'>
          <div className='admin'>
            Hi
        </div>
          <div className='user'>
            Hello
        </div>
        </div>

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
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // errorMessage: state.account.errorMessage,
    // successMessage: state.account.successMessage,
    // isFetching: state.account.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getAllQuestions: homeActions.onGetAllQuestions,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)