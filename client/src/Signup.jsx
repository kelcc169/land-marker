import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.data.type === 'error') {
        this.setState({
          name: '',
          email: '',
          password: '',
          message: res.data.message
        })
      } else {
        localStorage.setItem('mernToken', res.data.token);
        this.props.liftToken(res.data, this.props.history);
      }
    }).catch(err => {
      this.setState({
        message: 'Maximum accounts exceeded. Please try again later'
      })
    })
  }

  render() {
    return (
      <div>
        <h3>Create a new account:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            name="name"
            placeholder="Enter your name..."
            onChange={this.handleInputChange}
            value={this.state.name} /><br />
          <input type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={this.handleInputChange}
            value={this.state.email} /><br />
          <input type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={this.handleInputChange}
            value={this.state.password} /><br />
          <input type="submit" value="Sign Up!" />
        </form>
      </div>
    )
  }
}

export default Signup;