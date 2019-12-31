import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const QuestionForm = (props) => {
  const { question, handleChange, handleSubmit, cancelPath, heading } = props
  return (
    <Fragment>
      <Col className="study-topic">
        <h2 className="titles mt-0">{heading}</h2>
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
      </Col>
    </Fragment>
  )
}

export default QuestionForm
