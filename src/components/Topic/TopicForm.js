import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TopicForm = (props) => {
  console.log(props)
  const { topic, handleChange, handleSubmit, cancelPath, heading, prop1, prop2 } = props
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{heading}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>{prop1}</Form.Label>
            <Form.Control
              placeholder="What would you like to study?"
              value={topic.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="information">
            <Form.Label>{prop2}</Form.Label>
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
      </div>
    </div>
  )
}

export default TopicForm
