import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect , Link} from 'react-router-dom'

import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '', 
    verifyMsg:""
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    
    
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://jobby-backend-app.onrender.com/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    //

    this.setState({verifyMsg:"verifying...."})
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({verifyMsg:""})
      alert("User registered successfully")
        this.onSubmitSuccess()
    } else {
      this.setState({verifyMsg:""})
      this.onSubmitFailure(data.error_msg)
    }
  }

  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          className="user-input"
          value={username}
          onChange={this.onEnterUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="user-input"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg,verifyMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="jobby-app-container">
        <div className="card-container">
          <h1 className='logo-name'>JobFinder</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button className="login-button" type="submit">
              Register
            </button>
            <p className='login-here-text'>{verifyMsg}</p>
            <p className='login-here-text'>If you registered already <Link to="/login">Login here</Link></p>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm
