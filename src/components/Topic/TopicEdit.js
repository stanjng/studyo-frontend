import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
/* uses the same TopicForm to update an existing topic */
import TopicForm from './TopicForm.js'

const TopicEdit = props => {
  /* initializes the topic and setTopic as empty strings for required fields */
  const [ topic, setTopic ] = useState({ title: '', information: '' })
  /* initializes updates and setUpdated as false */
  const [ updated, setUpdated ] = useState(false)
  /* axios request to get the topic that matched the existing id */
  console.log(props)
  useEffect(() => {
    axios(`${apiUrl}/topics/${props.match.params.id}`)
      .then(res => setTopic(res.data.topic))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    /* update existing topics fields with input from form */
    setTopic(topic => ({ ...topic, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    /* axios PATCH request that requires user Authorization */
    axios({
      url: `${apiUrl}/topics/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { topic }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a topic', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  /* redirect user to topics list on successful update */
  if (updated) {
    return <Redirect to={`/topics/${props.match.params.id}`} />
  }

  return (
    <TopicForm
    /* rquired properties from TopicForm */
      heading="Edit Topic Details"
      prop1="Title"
      prop2="Information"
      topic={topic}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      /* cancelPath will take user to the original topic */
      cancelPath={`#/topics/${props.match.params.id}/`}
    />
  )
}

export default withRouter(TopicEdit)
