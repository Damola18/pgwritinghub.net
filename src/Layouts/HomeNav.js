import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { isAuthenticated } from '../services/UserDataApi'
import { IconProfile } from '../utils/icons'

const HomeNav = () => {
  return (
      <NavContainer>
            <Link to="/" className="brand">
                <h1>PG Writing Hub</h1>
            </Link>
            {!(isAuthenticated === 'true') ?
                <Link to='/login' className='getstarted'>Get Started</Link>
            :
                <Link to='/login' className='userprofile'><IconProfile /></Link>
            }
      </NavContainer>
  )
}

export default HomeNav

const NavContainer = styled.div`
    position: fixed;
    height: 80px;
    width: 100%;
    box-shadow: 0px 1px 5px #D7D9F260;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    z-index: 1000;
    background: #FFFFFF;
    top: 0px;

    .brand {
        margin: 10px 30px;
        text-decoration: none;
        color: #39CDCC;
        min-width: max-content;

        h1 {
            font-size: 32px;
            font-weight: 700;
        }

        @media screen and (max-width: 498px) {
            margin: 10px 0px;
            margin-right: 15px;
            h1 {
                transform: scale(0.6);
            }
        }
    }
    .userprofile {
        margin: 10px 30px;
        svg {
            width: 40px;
            height: 40px;
            fill: #D7D9F2;
        }
    }
    
    .getstarted {
        margin: 10px 30px;
        background: #39CDCC;
        color: #FFFFFF;
        text-decoration: none;
        padding: 10px;
        border-radius: 8px;
        min-width: max-content;
        
        @media screen and (max-width: 498px) {
            margin: 10px 0px;
            transform: scale(0.6);
        }
    }
`