import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
/* uses the same QuestionForm to update an existing question */
import QuestionForm from './QuestionForm.js'

const QuestionEdit = props => {
  /* initializes the question and setQuestion as empty strings for required fields */
  const [ question, setQuestion ] = useState({ title: '', information: '' })
  /* initializes updates and setUpdated as false */
  const [ updated, setUpdated ] = useState(false)
  /* axios request to get the question that matched the existing id */
  useEffect(() => {
    axios({
      url: apiUrl + `/topics/${props.match.params.id}/questions/${props.match.params.qid}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setQuestion(res.data.question))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    /* update existing questions fields with input from form */
    setQuestion(question => ({ ...question, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    /* axios PATCH request that requires user Authorization */
    axios({
      url: `${apiUrl}/topics/${props.match.params.id}/questions/${props.match.params.qid}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { question }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a question', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  /* redirect user to questions list on successful update */
  if (updated) {
    return <Redirect to={`/topics/${props.match.params.id}/questions/${props.match.params.qid}`} />
  }

  return (
    <QuestionForm
    /* rquired properties from QuestionForm */
      heading="Modify This Question"
      question={question}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      /* cancelPath will take user to the original question */
      cancelPath={`#/topics/${props.match.params.id}/questions/${props.match.params.qid}`}
    />
  )
}

export default withRouter(QuestionEdit)
