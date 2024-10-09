import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import { MdOutlineHome } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { TfiBag } from "react-icons/tfi";
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div>
        <Link to="/" className="link-item">
          <h1 className='app-logo'>JobFinder</h1>
        </Link>
      </div>
      <div className='links-container'>
      <ul className="header-list-items">
        <Link to="/" className="link-item">
          <li className="home-heading home">Home</li>
          <li className="home-icon icon"><MdOutlineHome/></li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="job-heading home">Jobs</li>
          <li className='icon'><TfiBag/></li>
        </Link>
      </ul>
      <div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
        <button  onClick={onClickLogout} type="button" className=" icon-button"><IoIosLogOut/></button>
      </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
