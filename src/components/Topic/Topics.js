import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Topics = props => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/topics',
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(response => {
        setTopics(response.data.topics.reverse())
      })
      .then(() => props.alert({ heading: 'Success', message: 'You got topics', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Not able to retrieve topics', message: 'Sorry this isn\'t working', variant: 'danger' }))
  }, [])

  const topicsJsx = topics.map(topic => (
    <ListGroup.Item
      key={topic._id}
      as='a'
      href={`#/topics/${topic._id}`}
    >
      {topic.title}
    </ListGroup.Item>
  ))

  return (
    <div className="row content-section">
      <div className="col-sm-10 col-md-12 mx-auto mt-5 h-100">
        <div>
          <div><h1 className="titles">Topics</h1></div>
          <div>{props.user && <Button href="#/create-topic" variant="warning">Add a Topic</Button>}</div>
        </div>
        <div className="mx-auto mt-3">
          { topics ? <ListGroup>{topicsJsx}</ListGroup> : <h4>{'Let\'s tudy something!'}</h4> }
        </div>
      </div>
    </div>
  )
}

export default Topics
