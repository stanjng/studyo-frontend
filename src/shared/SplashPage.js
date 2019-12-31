import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'

// Define the Movie component
// if your component JUST RENDERS JSX, YOU JUST NEED A FUNCTIONAL COMPONENT!
const Splash = (props) => (
  <Fragment>
    <p>
      {props.user &&
            <Fragment>
              <h6>Select an Option</h6>
              <Button
                href="#/topics"
                variant="primary"
              >
              View Topics
              </Button>
              <Button
                href="#/create-topic"
                variant="warning"
              >
              Create Topic
              </Button>
            </Fragment>
      }
    </p>
  </Fragment>
)

// Export Actor Component
export default Splash
