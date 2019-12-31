import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const TopicForm = (props) => {
  const { topic, handleChange, handleSubmit, cancelPath, heading } = props
  return (
    <Fragment>
      <Col className="study-topic">
        <h2 className="titles mt-0">{heading}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="What would you like to study?"
              value={topic.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="information">
            <Form.Label>Information</Form.Label>
            <Form.Control
              placeholder="Topic Information"
              value={topic.information}
              name="information"
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

export default TopicForm
