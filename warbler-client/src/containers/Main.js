import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import Authform  from '../components/Authform';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props
  return (
    <div className='container'>
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Homepage currentUser={currentUser} {...props} /> }
        />
        <Route 
          exact
          path='/signin' 
          render={props => {
          return (
            <Authform 
              buttonText='Log In' 
              heading='Welcome Back.' 
              onAuth={authUser}
              removeError={removeError}
              errors={errors}
              {...props} 
            />
          );
        }}
        />
        <Route exact path='/signup' render={props => {
          return (
            <Authform
              signup
              buttonText='Sign me up!'
              heading='Join Warbler today.'
              onAuth={authUser}
              removeError={removeError}
              errors={errors}
              {...props} 
            />
          );
        }}
        />
        <Route 
          path='/users/:id/messages/new'
          component={withAuth(MessageForm)}
        />
      </Switch>
    </div>
    )
  };

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main))