import React from 'react'
// import PropTypes from 'prop-types'
import * as jobActions from './middlewares'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import JobImage from '../../../static/media/job.jpg'
const styles = theme => ({
  card: {
    maxWidth: 280,
    minWidth: 280,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
})

class JobInfo extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }
  render() {
    const { classes, job, index } = this.props
    // console.log('abc', job)
    let field = ''
    field = job.field && job.field.map((field, index) => <div key={index}>{field}</div>)
    console.log('field', field)
    let skill = ''
    skill = job.skill && job.skill.map((skill, index) => <div key={index}>{skill}</div>)
    return (
      <Card className='job-container'>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className='avatar'>
              {index + 1}
            </Avatar>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={field}
          subheader={skill}
        />
        <CardMedia
          className={classes.media}
          image={JobImage}
          title='Contemplative Reptile'
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label='Show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {job.description && (
              <Typography paragraph>
                Description: {job.description}
              </Typography>
            )}
            {job.benefit && (
              <Typography paragraph>
                Benefit: {job.benefit}
              </Typography>
            )}
            {/* {job.skills && (
              <Typography paragraph>
                Skills: {job.skills}
              </Typography>
            )} */}
            {job.requirement && (
              <Typography paragraph>
                Requirement: {job.requirement}
              </Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // messages: state.chatboxReducers.messages,
    // isLoadingMessages: state.chatboxReducers.isLoadingMessages,
    // successMessage: state.account.successMessage,
    // isFetching: state.account.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getJobsList: jobActions.onGetJobsList,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobInfo))

// export default withStyles(styles)(JobInfo)