import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import QuestionForm from './QuestionForm'

const QuestionCreate = (props) => {
  const [question, setQuestion] = useState({ title: '', author: '', originalLanguage: '' })

  const handleChange = event => {
    event.persist()
    setQuestion({ ...question, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/topics/${props.match.params.id}/questions/`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { question }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a question', variant: 'success' })
        props.history.push(`/topics/${props.match.params.id}`)
      })
      .catch(() => props.alert({ heading: 'Errr...', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <QuestionForm
      heading="Ask Yourself a Question"
      question={question}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#/topics/${props.match.params.id}/`}
    />
  )
}

export default withRouter(QuestionCreate)
