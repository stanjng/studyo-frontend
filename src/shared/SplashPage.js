import React, { Fragment } from 'react'

// Define the Movie component
// if your component JUST RENDERS JSX, YOU JUST NEED A FUNCTIONAL COMPONENT!
const Splash = (props) => (
  <Fragment>
    <div className="masthead">
      <div className="col masthead-bg"></div>
    </div>
    <div className="container">
      <div className="row splash-page">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="titles">Welcome!</h1>
        </div>
        <div className="col-3"></div>
        <div className="w-100"></div>
        <div className="col-3"></div>
        <div className="col-6">
          <h5>{'Make yourself at home, and let\'s study!'}</h5>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  </Fragment>
)

// Export Actor Component
export default Splash
