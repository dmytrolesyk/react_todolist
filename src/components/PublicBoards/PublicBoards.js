import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from './../Spinner'
import getPublicBoardsAction from '../../actions/boardActions/getPublicBoards'

class PublicBoards extends Component {
  componentDidMount() {
    const { user, getPublicBoards } = this.props
    getPublicBoards(user.token)
  }
  render() {
    const { boards } = this.props
    if (boards.length){
      return (
      <>
        {boards.map(board => (
          <Link to={`board/${board.id}`}>
            {`${board.name}'s board`}
        </Link>))}
      </>  
      )
    } else {
      return <Spinner />
    }
  }
}

const mapStateToProps = state => ({
  boards: state.boards,
  user: state.user,
})

const mapDispatchToProps = {
  getPublicBoards: getPublicBoardsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicBoards)
