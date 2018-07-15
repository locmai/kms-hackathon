import React from 'react'
import { connect } from 'react-redux'
import * as homeActions from './actions'
import { bindActionCreators } from 'redux'
import './styles.scss'
import { Chatbox } from './chatbox'
import { JobInfo } from './job_info'

class Home extends React.Component {
  render() {
    const { isChatboxShown, jobsList } = this.props
    console.log('isChatboxShown', isChatboxShown)
    return (
      <div className='home-container'>
        {isChatboxShown
          ? <Chatbox />
          : (
            <div className='jobs-list-container'>
              {jobsList && jobsList.length > 0 &&
                jobsList.map((job, index) => <JobInfo key={index} index={index} job={job} />)
              }
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isChatboxShown: state.homeReducers.isChatboxShown,
    jobsList: state.homeReducers.jobsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)