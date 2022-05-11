import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserProfile } from '../services/UserDataApi'


const Navbar = ({openSidebar, toggleSidebar}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserProfile(newUserProfile)
    }, [])
    
    return (
        <>
            <NavbarContainer>
                <div className="col1">
                    <button className='toggle' onClick={toggleSidebar}>
                        {openSidebar ?
                            <img src="https://res.cloudinary.com/dutcp8qkx/image/upload/v1652259771/hamburger_closed_i3s2cs.svg" alt="hamburger-menu-collapsed"/>
                        :
                            <img src="https://res.cloudinary.com/dutcp8qkx/image/upload/v1652259730/hamburger_opened_ffcczo.svg" alt="hamburger-menu-active"/>
                        }
                    </button>
                    
                    <a href="/" className='brand'><h1>PG Writing Hub</h1></a>
                </div>
                <div className="col2">
                    <a href='/profile' className="profile">
                        <img src="https://res.cloudinary.com/dutcp8qkx/image/upload/v1652261813/Vector_cbqkax.svg" alt="Profile" />
                        <span>{userProfile?.username}</span>
                    </a>
                </div>
                <button className='toggle hambuger' onClick={() => setShowMenu(!showMenu)}>
                    <img src="https://res.cloudinary.com/dutcp8qkx/image/upload/v1652260124/user-account_r0jh6e.svg" alt="user-account"/>    
                </button>
                {showMenu &&
                    <div className="mobileNav">
                        <div className="links">
                        </div>
                        <a href='/profile' className="profile">
                            <img src="https://i.postimg.cc/Kzv5mC22/image.png" alt="Profile" />
                            <span>{userProfile?.username}</span>
                        </a>
                    </div>
                }
            </NavbarContainer>
            <NavbarSpacer></NavbarSpacer>
        </>
    )
}

export default Navbar

const NavbarSpacer = styled.div`
    width: 100%;
    height: 100px;
`
const NavbarContainer = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 3px 0px 20px #0000000A;
    padding: 0px 30px;
    position: fixed;
    top: 0px;
    z-index: 1000;
    width: 100%;

    .toggle {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        display: none;
        margin-right: 20px;
        color: #545F7D;
        
        &.hambuger {
            margin-left: 20px;
            margin-right: 0px;
        }

        @media(max-width: 768px) {
            display: unset;
        }

        svg {
            width: 25px;
            height: 25px;
        }
    }

    .col1 {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .toggle {
            background: none;
            border: none;
            outline: none;
            cursor: pointer;
            display: none;
            margin-right: 20px;

            @media(max-width: 768px) {
                display: unset;
            }

            svg {
                width: 25px;
                height: 25px;
            }
        }

        .brand {
            color: #39CDCC;
            text-decoration: none;
            min-width: max-content;

            @media (max-width: 500px) {
                transform: scale(0.7);
            }
        }
    }

    .col2 {
        display: flex;
        align-items: center;

        @media(max-width: 768px) {
            display: none;
        }

        a {
            color: #213F7D;
            font-size: 16px;
            font-weight: 400px;
            margin-right: 30px;
            
            @media(max-width: 1000px) {
                margin-right: 20px;
            }
        }

        button {
            background: none;
            border: none;
            outline: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 30px;
            
            @media(max-width: 1000px) {
                margin-right: 20px;
            }

            svg {
                width: 20px;
                height: 22px;
                color: #213F7D;
            }
        }

        .profile {
            text-decoration: none;
            display: flex;
            align-items: center;
            margin-right: 30px;
            
            @media(max-width: 1000px) {
                margin-right: 20px;
            }

            img {
                width: 28px;
                height: 28px;
                object-fit: contain;
                border-radius: 50%;
                color: #213F7D;
            }

            span {
                margin: 0px 10px;
                color: #213F7D;
            }

            h6 {
                position:relative;
                top:30px;
                right:95px
            }

            svg {
                width: 20px;
                height: 12px;
                color: #213F7D;
            }
        }
    }

    .mobileNav {
        position: absolute;
        top: 85px;
        right: 20px;
        z-index: 1000;
        background: #FFFFFF;
        box-shadow: 3px 5px 20px #0000000A;
        border: 1px solid #213F7D0F;
        border-radius: 4px;
        padding: 20px;
        display: none;

        @media(max-width: 768px) {
            display: unset;
        }
        
        .links {
            display: flex;
            justify-content: space-between;
            margin: 30px 0px;

            a {
                color: #213F7D;
                font-size: 16px;
                font-weight: 400px;
                margin-right: 30px;
                
                @media(max-width: 1000px) {
                    margin-right: 20px;
                }
            }
    
            button {
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                margin-right: 30px;
                
                @media(max-width: 1000px) {
                    margin-right: 20px;
                }
    
                svg {
                    width: 20px;
                    height: 22px;
                    color: #213F7D;
                }
            }
        }
        
        .profile {
            text-decoration: none;
            display: flex;
            align-items: center;
            margin-right: 30px;
            
            @media(max-width: 1000px) {
                margin-right: 20px;
            }

            img {
                width: 48px;
                height: 48px;
                object-fit: contain;
                border-radius: 50%;
            }

            span {
                margin: 0px 10px;
                color: #213F7D;
            }

            svg {
                width: 20px;
                height: 12px;
                color: #213F7D;
            }
        }
    }
`