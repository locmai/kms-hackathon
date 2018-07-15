import React from 'react'
// import PropTypes from 'prop-types'
import * as jobActions from './middlewares'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import JobInfo from './job_info'
import CircularProgress from '@material-ui/core/CircularProgress'

class JobsList extends React.Component {
  state = { expanded: false }

  componentDidMount() {
    console.log('sax')
    this.props.actions.getJobsList()
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { jobsList, isLoadingJobs } = this.props
    return (
      <div className='jobs-list-container'>
        {jobsList && jobsList.length > 0 &&
          jobsList.map((job, index) => <JobInfo key={index} index={index} job={job} />)
        }
        {isLoadingJobs && <CircularProgress className={'progress'} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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