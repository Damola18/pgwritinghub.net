import React from 'react'
import styled from 'styled-components'
import { IconLinkedin, IconSendEmail, IconTwitterBird } from '../utils/icons'

const Footer = () => {
  return (
      <FooterContainer>
          <div className="brand">
              <div className="images">
                <img src="https://i.postimg.cc/RFRHFGc3/image.png" alt="" />
                <img src="https://i.postimg.cc/8zPRrXxN/image.png" alt="" />
                <img src="https://i.postimg.cc/KzX3Q0pK/image.png" alt="" />
                <img src="https://i.postimg.cc/nLNBgFrh/image.png" alt="" />
              </div>
              <p>&copy; {new Date().getFullYear()} - All Rights Reserved.</p>
          </div>
          <div className="socials">
              <a href="mailto://admin@pgwritinghub.net" target="_blank" rel="noopener noreferrer"><IconSendEmail /></a>
              <a href="https://twitter.com/pgwritinghub" target="_blank" rel="noopener noreferrer"><IconTwitterBird /></a>
              <a href="https://www.linkedin.com/company/pg-writing-hub" target="_blank" rel="noopener noreferrer"><IconLinkedin /></a>
          </div>
      </FooterContainer>
  )
}

export default Footer


const FooterContainer = styled.div`
    display: flex;
    padding: 30px;
    background: #FFFFFF;
    box-shadow: 0px -1px 5px #D7D9F260;
    color: #545F7D;
    
    @media screen and (max-width: 720px) {
        display: grid;
        grid-template-columns: 1fr;
    }

    .brand {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;

        @media screen and (max-width: 530px) {
            margin-bottom: 20px;
        }

        .images {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;

            img {
                width: 100px;
                margin: 10px;
                object-fit: contain;
            }
        }
        
        p {
            margin: 10px 0px;
            color: #8A8A8A;
        }
    }

    .socials {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        a {
            background: #39CDCC;
            color: #FFFFFF;
            margin: 0px 5px;
            width: 40px; 
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%; 
        }
    }
`