import React, { Component } from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import { connect } from 'react-redux';

class MessageTimeLine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { profileImageUrl, username } = this.props;
    return (
      <div className='row'>
        <UserAside
          profileImageUrl={profileImageUrl}
          username={username}
        />
        {this.props.errors.message && (
          <div className='alert alert-danger'>
            {this.props.errors.message}
          </div>
        )}
        <MessageList />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, null)(MessageTimeLine);