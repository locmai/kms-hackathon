import React from 'react'
import './styles.scss'
// import PropTypes from 'prop-types'
import * as jobActions from './middlewares'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import JobInfo from './job_info'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { Scrollbars } from 'react-custom-scrollbars'

class JobsList extends React.Component {
  state = { expanded: false }

  // componentDidMount() {
  //   console.log('sax')
  //   this.props.actions.getJobsList()
  // }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { messages } = this.props
    // const jobsList = [
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    //   { description: 'abc', skill: 'abc' },
    // ]
    // if (messages) {
    //   console.log('messages hihi', messages.)
    // }
    return (
      <div className='jobs-list-container'>
      {/* // <Scrollbars className='jobs-list-container' autoHide={true}> */}
        {messages && messages.length > 0 &&
          messages[messages.length - 1].map((job, index) => <JobInfo key={index} index={index} job={job} />)
        }
        {/* {isLoadingJobs && <CircularProgress className={'progress'} />} */}
        {/* // </Scrollbars> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chatboxReducers.messages,
    jobsList: state.jobsReducers.jobsList,
    isLoadingJobs: state.jobsReducers.isLoadingJobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getJobsList: jobActions.onGetJobsList,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsList)

// export default withStyles(styles)(JobInfo)