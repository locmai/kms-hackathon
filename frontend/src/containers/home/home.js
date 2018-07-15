import React from 'react'
import { connect } from 'react-redux'
import * as homeActions from './actions'
import { bindActionCreators } from 'redux'
import './styles.scss'
import { Chatbox } from './chatbox'
import { JobsList } from './job_info'

class Home extends React.Component {
  render() {
    const { isChatboxShown } = this.props
    return (
      <div className='home-container'>
        {isChatboxShown
          ? <Chatbox />
          : <JobsList />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isChatboxShown: state.homeReducers.isChatboxShown,
    // jobsList: state.jobsReducers.jobsList,
    // isLoadingJobs: state.jobsReducers.isLoadingJobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)