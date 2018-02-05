import React, { Component } from 'react';
import PropTypes from 'prop-types';



class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="wrapper" id="app_wrapper">
        {children}
      </div>
    );
  }
}

export default App;
