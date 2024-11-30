
import { Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="responsive-container">
          <div>
          <h1 className="main-heading">Your Dream Job Awaits!</h1>
          <p className="job-desc">
          Discover opportunities across industries, tailored to your skills and career goals.
          Start your journey towards a better future today.
          </p>
          <Link to="/jobs" className="link-item">
            <button type="button" className="find-jobs">
              Find Jobs
            </button>
          </Link>
          </div>
          <div>
            <img className='home-page-jobs-img' src="https://res.cloudinary.com/dtcogqxhp/image/upload/v1732965569/Building-Blocks-of-Job-Seeking_ltfkbt.jpg"/>
          </div>
        </div>

        
        <h2 className="cta-heading">Ready to Get Hired?</h2>
        <p className="cta-desc">
          Create your profile and start applying to your dream jobs in just a few clicks. 
          Don’t wait—start building your future now!
          </p>
        <a className="cta-button" href="/register">Sign Up Today</a>
       
        <div className='home-page-card-container'>
<p className="footer-tagline">
"Helping you find a career, not just a job!"
</p>
<ul className="tips-list">
  <li> Build skills</li>
  <li> Build Resume and profile</li>
  <li> Apply jobs that fit you</li>
  <li> Start your journey !</li>
  
</ul>
</div>

      </div>
    </>
  )
}

export default Home
