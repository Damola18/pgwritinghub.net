import React from 'react'
import styled from 'styled-components'
import Footer from '../Layouts/Footer'
import HomeNav from '../Layouts/HomeNav'
import { IconAngleRightB } from '../utils/icons'

const Home = () => {
  return (
    <>
      <HomeNav />
      <HomeHeader>
        <div className="text">
          <h1>A Critical Thinking and Writing Forum for Postgraduate Students</h1>
        </div>
      </HomeHeader>
      <HomeContainer>
        <div className="application_call">
          <img src="https://i.postimg.cc/yNfqShbS/Happy-announcement-bro.png" alt="Call for Applications" />
          <div className="content">
            <h1>Call for Applications</h1>
            {/* <h3>Upcoming course</h3> */}
            <h3>VREF Short Course 2022: Critical Thinking and Writing Skills for Postgraduate Students</h3>
            <button onClick={() => document.location.assign("/call_for_application")}>Read More <IconAngleRightB /> </button>
          </div>
        </div>
        <h2 className='subheading'>Finding your way around</h2>
        <div className="tourguide">
          <div className="card">
            <h3 className='title'>1. Create a member profile</h3>
            <p>
            Follow the {"‘Get started’"} link at the top right corner of this page to create a unique profile and join the hub. Your profile will enable you to customize your hub experience, interact with other hub members and keep track of hub activities.
            </p>
          </div>
          
          <div className="card">
            <h3 className='title'>2. Update your profile</h3>
            <p>
            You can update or modify the information on your profile at any time. You can choose to make your profile visible to other members of the hub to increase your opportunities for networking and collaboration.
            </p>
          </div>
          
          <div className="card">
            <h3 className='title'>3. Apply for opportunities</h3>
            <p>
            As a member, you can apply for writing courses and other professional development opportunities that are posted periodically on the hub. Calls are also open to non-members; however, membership is required to access ongoing support from faculty and peers.  
            </p>
          </div>
          
          <div className="card">
            <h3 className='title'>4. Join one or more forums</h3>
            <p>
            Connect with other members and build community through a series of interactive chat forums. The forums provide space for members to ask questions and exchange knowledge on a range of writing-related topics. 
            </p>
          </div>
        </div>
      </HomeContainer>
      <Footer />
    </>
  )
}

export default Home

const HomeHeader = styled.div`
  background-image: url('https://i.postimg.cc/CKk9tr8f/image.png');
  background-size: cover;
  height: 400px;
  margin-top: 80px;

  .text {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #FFFFFF;
      text-align: center;
      font-size: 40px;
    }
  }
`

const HomeContainer = styled.div`
  padding: 100px;
  color: #545F7D;

  @media screen and (max-width: 855px) {
    padding: 50px;
  }

  @media screen and (max-width: 458px) {
    padding: 25px;
  }

  .application_call {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    img {
      width: 300px;
      max-width: 400px;
      object-fit: contain;
      margin: 0px 20px;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;

      img {
        margin: 20px 0px;
      }
    }

    .content {
      flex: 1;
      text-align: center;

      h1 {
        font-size: 64px;
        font-weight: 1200;
        background: #E74133;
        color: #FFFFFF;
        padding: 10px;
        margin: 10px 0px;
        
        @media screen and (max-width: 768px) {
          font-size: 54px;
        }
      }

      button {
        background: #E74133;
        color: #FFFFFF;
        border-radius: 10px;
        padding: 10px 15px;
        padding-right: 0px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        cursor: pointer;
        font-size: 18px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .subheading {
    display: flex;
    align-items: center;
    font-size: 30px;

    svg {
      margin-left: 15px;
      color: #FFFFFF;
      background: #2AAA89;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }

  .tourguide {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    
    @media screen and (max-width: 725px) {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 25px;
      border-radius: 4px;

      &:nth-child(even) {
        background: #2AAA89;
        color: #FFFFFF;
      }

      h3, p {
        margin: 20px 0px;
      }

      p {
        font-size: 18px;
      }

      h3 {
        font-size: 22px;
      }
    }
  }
`