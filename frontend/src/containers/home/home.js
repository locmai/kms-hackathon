import React from 'react'
import './styles.scss'
import Input from '@material-ui/core/Input'

export default class Home extends React.Component {
  state = {
    message: '',
  }

  handleChange = maessage => event => {
    this.setState({
      [maessage]: event.target.value,
    })
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
          margin='normal'
          placeholder='Type a message'
          disableUnderline={true}
          multiline={true}
          rows={1}
          rowsMax={3}
        />
      </div>
    )
  }
}