import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const QuestionForm = (props) => {
  const { question, handleChange, handleSubmit, cancelPath, heading } = props
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{heading}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="query">
            <Form.Label>Question</Form.Label>
            <Form.Control
              placeholder="Enter question"
              value={question.query}
              name="query"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="answer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              placeholder="Enter answer"
              value={question.answer}
              name="answer"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Submit</Button>
          <Button type="button" href={cancelPath} variant="secondary" className="ml-2">Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default QuestionForm
