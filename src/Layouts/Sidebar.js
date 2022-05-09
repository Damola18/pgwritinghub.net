import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LogoutUser } from '../services/firebase'
import { getUserProfile, isAuthenticated } from '../services/UserDataApi'
import { IconUserX } from '../utils/icons'
import { menuList } from '../utils/SidebarMenu'

const Sidebar = ({route, openSidebar}) => { 
    const [userData, setUserData] = useState()
    
    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])
    
    useEffect(() => {
        if(!isAuthenticated()) {
            document.location.assign('/login')
        }
    }, [])
    
    const HandleLogout = () => {
        LogoutUser().then(() => {
            document.location.assign('/login')
        })
    }

  return (
      <SidebarContainer openSidebar={openSidebar}>
          {menuList.map(item => 
            ((item.role === userData?.role || !item.role) && 
                (userData?.cohort !== 'Rejected' && !(userData?.role === 'student' && !userData?.cohort))) && (                    
                    <div className='category' key={item.category}>
                        <p>{item.category}</p>
                        {item.menu.map(menu => (
                            <a href={menu.link || "/"} key={menu.title} className={`${route.replace("/", "") === menu.title.toLowerCase() ? 'active': ''}`}>
                            {menu.icon}
                            <span>{menu.title}</span>
                            </a>
                        ))}
                    </div>
                )
            )}
          <button onClick={HandleLogout} ><IconUserX /> <span>Logout</span></button>
      </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.div`
    width: 283px;
    height: 100%;
    overflow-y: auto;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px #0000000A;
    display: flex;
    flex-direction: column;
    padding: 0px;
    padding-bottom: 120px;
    position: fixed;
    z-index: 900;
    transition: ease 1s;

    @media(max-width: 768px) {
        width: ${props => props.openSidebar ? "283px" : "0px"};
    }

    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 8px;
        background: #39CDCC10;
    }
    &::-webkit-scroll-thumb {
        border-radius: 8px;
        background: #213F7D;
        border: 1px solid black;
    }

    button {
        padding: 20px 30px;
        text-align: left;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;

        svg {
            width: 16px;
            height: 16px;
            color: #213F7D;
        }

        span {
            color: #213F7D;
            font-size: 16px;
            margin: 0px 10px;
        }

        &:hover {
            background: #39CDCC10;
        }
    }

    .category {
        display: flex;
        flex-direction: column;

        p {
            padding: 10px 30px;
            color: #545F7D;
            font-size: 12px;
            font-weight: 500;
        }
    }
    
    a {
        padding: 20px 30px;
        color: #213F7D70;
        font-size: 16px;
        text-decoration: none;
        
        svg {
            width: 16px;
            height: 16px;
        }
        
        span {
            margin: 0px 10px;
        }

        &.active, 
        &:hover {
            color: #213F7D;
            background: #39CDCC09;
        }

        &.active {
            color: #213F7D;
            border-left: 3px solid #39CDCC;
        }
    }
`