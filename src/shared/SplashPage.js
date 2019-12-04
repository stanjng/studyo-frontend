import React, { Fragment } from 'react'

// Define the Movie component
// if your component JUST RENDERS JSX, YOU JUST NEED A FUNCTIONAL COMPONENT!
const Splash = (props) => (
  <Fragment>
    <div className="container container-fluid h-100 justify-content-center">
      <div className="row splash-page d-flex justify-content-between align-items-center">
        <div className="col">
          <h1 className="titles">Welcome!</h1>
          <h5>{'Make yourself at home, and let\'s study!'}</h5>
        </div>
      </div>
    </div>
  </Fragment>
)

// Export Actor Component
export default Splash
