import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Topic = props => {
  const [topic, setTopic] = useState(null)
  // Sets the userId to the _id of the user
  const userId = props.user._id
  useEffect(() => {
    axios({
      url: apiUrl + `/topics/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setTopic(res.data.topic))
      .catch(() => props.alert({ heading: 'That didn\'t work', message: 'Couldn\'t retrieve the requested topic', variant: 'danger' }))
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/topics/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a topic', variant: 'warning' })
        props.history.push('/topics')
      })
      .catch(() => {
        props.alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' })
      })
  }

  if (!topic) {
    return <p>Loading stuff...</p>
  }

  const topicId = topic._id

  const questionsJsx = topic.questions.map(question => (
    <ListGroup.Item
      key={question._id}
      as='a'
      href={`#/topics/${topicId}/questions/${question._id}`}
    >
      {question.query}
    </ListGroup.Item>
  ))

  return (
    <Container>
      <Row>
        <Col sm={6} className="study-topic">
          <h2 className="titles">Study Topic</h2>
          <h3 className="topic-title">{topic.title}</h3>
          <h5>About this Topic:</h5>
          <p>{topic.information}</p>
          {userId === topic.owner && (
            <Fragment>
              <Button
                href={`#topics/${props.match.params.id}/edit`}
                variant="primary"
                className="mr-2"
              >
              Update
              </Button>
              <Button onClick={handleDelete} variant="danger" className="mr-2">Delete</Button>
            </Fragment>
          )}
          <Button href="#/topics/" variant="secondary" className="mr-2">Back</Button>
        </Col>
        <Col sm={6}>
          <h2 className="titles">Important Questions</h2>
          <ListGroup>
            {props.user && <Button href={`#/topics/${props.match.params.id}/create-question`} variant="primary">Add Question</Button>}
            {questionsJsx}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(Topic)
