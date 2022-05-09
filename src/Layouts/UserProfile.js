import React from 'react'
import styled from 'styled-components'
import { IconUserCheck } from '../utils/icons'

const UserProfile = ({userData}) => {

    return (
        <UserHeader>
            <div className="profile">
                <div className='column'>
                    <img src="https://i.postimg.cc/Kzv5mC22/image.png" alt="profile" />
                    <div className="col">
                        <h1>{userData.firstname} {userData.lastname}</h1>
                        <p>{userData.username}</p>
                    </div>
                </div>
                <div className='column'>
                    <div className="col center">
                        <p></p>
                        {userData?.role === "student" &&
                            <p className='role'>Student</p>
                        }
                        {userData?.role === "tutor" &&
                            <p className='role'>Lecturer</p>
                        }
                        {(userData?.role !== "student" && userData?.role !== 'tutor') &&
                            <p className='role'>Facilitator</p>
                        }
                    </div>

                    {userData?.role !== 'student'?
                        <div className="col">
                            <p>Verification:</p>
                            <h1>Verified <IconUserCheck /></h1>
                        </div>
                    :
                        <div className="col">
                            <p>Cohort:</p>
                            <h1>{userData.cohort || 'Pending . . .'}</h1>
                        </div>
                    }
                </div>
            </div>
        </UserHeader>
    )
}

export default UserProfile

const UserHeader = styled.div`
    padding: 30px;
    padding-bottom: 0px;
    background: #FFFFFF;
    box-shadow: 3px 5px 20px #0000000A;
    border: 1px solid #213F7D0F;
    border-radius: 4px;
    position: relative;
        
    @media(max-width: 1100px) {
        padding-bottom: 30px;
    }

    .profile {
        display: flex;
        align-items: center;
        margin-bottom : 50px;
        
        @media(max-width: 1100px) {
            flex-direction: column;
            margin-bottom : 0px;
        }

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        
        .column {
            display: flex;
            align-items: center;
        
            @media(max-width: 1100px) {
                flex-direction: column;
            }
        }

        .col {
            padding: 0px 30px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        
            @media(max-width: 1100px) {
                align-items: center;
            }

            &.center {
                border-left: 1px solid #545F7D75;
                border-right: 1px solid #545F7D75;

                @media(max-width: 1100px) {
                    border: none;
                }

                .role {
                    background: #545F7D75;
                    padding: 3.5px 5px;
                    border-radius: 5px;
                }
            }

            h1 {
                color: #213F7D;
                font-size: 22px;
                font-weight: 500;
                display: flex;
                align-items: center;

                svg {
                    margin-left: 10px;
                }
            }

            p {
                color: #213F7D;
                font-size: 12px;


                svg {
                    color: #FFFFFF;
                    stroke: #E9B200;
                    width: 15px;
                    height: 15px;
                    
                }
                .active {
                    svg {
                        color: #E9B200;
                    }
                }
            }
        }
    }
`