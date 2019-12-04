import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import TopicForm from './TopicForm'

const TopicCreate = (props) => {
  const [topic, setTopic] = useState({ title: '', author: '', originalLanguage: '' })

  const handleChange = event => {
    event.persist()
    setTopic({ ...topic, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/topics`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { topic }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a topic', variant: 'success' })
        props.history.push(`/topics/${response.data.topic._id}`)
      })
      .catch(() => props.alert({ heading: 'Errr...', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <TopicForm
      heading="New Study Topic"
      topic={topic}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath='#/topics'
    />
  )
}

export default withRouter(TopicCreate)
