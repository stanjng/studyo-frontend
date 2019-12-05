import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const Question = props => {
  const [question, setQuestion] = useState(null)
  // Sets the userId to the _id of the user
  const userId = props.user._id
  useEffect(() => {
    axios({
      url: apiUrl + `/topics/${props.match.params.id}/questions/${props.match.params.qid}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setQuestion(res.data.question))
      .catch(() => props.alert({ heading: 'That didn\'t work', message: 'Couldn\'t retrieve the requested question', variant: 'danger' }))
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/topics/${props.match.params.id}/questions/${props.match.params.qid}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a question', variant: 'warning' })
        props.history.push(`/topics/${props.match.params.id}`)
      })
      .catch(() => {
        props.alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' })
      })
  }

  if (!question) {
    return <p>Loading stuff...</p>
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h4>Question:</h4>
        <p>{question.query}</p>
        <h4>Answer:</h4>
        <p>{question.answer}</p>
        {userId === question.owner && (
          <Fragment>
            <Button
              href={`#topics/${props.match.params.id}/questions/${props.match.params.qid}/edit`}
              variant="primary"
            >
            Update
            </Button>
            <Button
              onClick={handleDelete}
              variant="danger"
            >
            Delete
            </Button>
          </Fragment>
        )}
        <Button href={`#topics/${props.match.params.id}/`} variant="secondary">Back</Button>
      </div>
    </div>
  )
}

export default withRouter(Question)
