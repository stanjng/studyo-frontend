import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Topic from '../Topic/Topic.js'
import Topics from '../Topic/Topics.js'
import TopicCreate from '../Topic/TopicCreate.js'
import TopicEdit from '../Topic/TopicEdit.js'
import Question from '../Question/Question.js'
import QuestionCreate from '../Question/QuestionCreate.js'
import QuestionEdit from '../Question/QuestionEdit.js'
import SplashPage from '../../shared/SplashPage.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container content-section">
          <div className="row">
            <Header user={user} />
            <Route exact path='/' render={() => (
              <SplashPage user={user} />
            )} />
            <Route path='/sign-up' render={() => (
              <SignUp alert={this.alert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn alert={this.alert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute exact path='/topics/' user={user} render={() => (
              <Topics alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute exact path='/topics/:id/questions/:qid' user={user} render={() => (
              <Question alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute exact path='/topics/:id/create-question/' user={user} render={() => (
              <QuestionCreate alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute exact path='/topics/:id' user={user} render={() => (
              <Topic alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/create-topic' render={() => (
              <TopicCreate alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/topics/:id/edit' render={() => (
              <TopicEdit alert={this.alert} user={user} />
            )} />
            <AuthenticatedRoute exact path='/topics/:id/questions/:qid/edit' user={user} render={() => (
              <QuestionEdit alert={this.alert} user={user} />
            )} />
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
