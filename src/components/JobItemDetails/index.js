import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";


import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
   
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
   
  })

  getJobItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://jobby-backend-app.onrender.com/job/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const {job_details} = await response.json()
      console.log(job_details[0])
      const updatedData = this.getFormattedData(job_details[0])
      
      console.log(updatedData)
     
      this.setState({
        jobItemList: updatedData,
       
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobItemList} = this.state
    const {
      companyLogoUrl,
     
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
     
    } = jobItemList
   
    return (
      <div className="full-job-item-container">
        <div className="job-items-container">
          <div className="logo-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-justify"
            />
            <div className="title-container">
              <h1 className="company-title-head">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="count-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="location-desc">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="location-logo-brief" />
                <p className="location-desc">{employmentType}</p>
              </div>
            </div>
            <p className="package-desc">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="desc-heading">Description</h1>
           
          </div>
          <p className="job-story-desc">{jobDescription}</p>
          
          
        </div>
       
      </div>
    )
  }

  renderFailureView = () => (
    <div className="render-loading-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <p className='loading-text'>Loading ...</p>
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-products-details-container">
          <Link to='/jobs' className='back-link'><p className='back-btn-text'><FaArrowLeft/> <span style={{marginLeft:'15px'}}>Back </span></p></Link>
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
