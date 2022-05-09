import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import UserProfile from '../Layouts/UserProfile'
import { EditUser, ValidateUsername } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'

const Profile = () => {
    const [userData, setUserData] = useState()
    const [iusername, setIUsername] = useState(false)
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [form, setForm] = useState({firstname: "", lastname: "", username: "", calendly: ""})

    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])

    useEffect(() => {
        const newFormData = {firstname: userData?.firstname || "", lastname: userData?.lastname || "", username: userData?.username || "", calendly: userData?.calendly || ""}
        setForm(newFormData)
    }, [userData])

    const handleEditProfile = (e) => {
        e.preventDefault()
        setPending(true)
        if(!err) {
            EditUser( form.firstname, form.lastname, form.username, form.calendly).then(data => {
                if(data){
                    if(data.includes("Error")){
                        setErr(data)
                        setPending(false)
                    } else {
                        let newUserData = getUserProfile()
                        setUserData(newUserData)
                        setPending(false)
                    }
                } else {
                    setErr('Network Error: Try again later')
                    setPending(false)
                }
            })
        }
    }
    
    const HandleCheckUsername = (e) => {
        const username = e.target.value
        if(username !== userData.username) {
            ValidateUsername(username).then(data => {
                if (data) {
                    setErr("Username taken!")
                    setIUsername(true)
                }
                else {
                    setErr("")
                    setIUsername(false)
                }
            })
        }
    }

  return (
      <UserDetailsContainer>
          <div className="header">
              <h1>Profile</h1>
              <div className="btns">
                  <a href='#edit_profile'>Edit Profile</a>
              </div>
          </div>
        {userData ?
            <>
            <UserProfile userData={userData} />
            </>  
          :
            <Loader minH="40vh" iconH="80px" iconW="80px" />
        }
        <br /><br /><br /><br />
        <div className="header" id='edit_profile'>
            <h1>Edit Profile</h1>
        </div>
        <form onSubmit={handleEditProfile}>
            <div className="row">
                <input type="text" placeholder='Firstname' onChange={(e) => setForm({...form, firstname: e.target.value})} value={form.firstname} />
                <input type="text" placeholder='Lastname' onChange={(e) => setForm({...form, lastname: e.target.value})} value={form.lastname} />
            </div>
            <div className="row">
                <input type="text" placeholder='Username' onChange={(e) => setForm({...form, username: e.target.value})} onKeyUp={HandleCheckUsername} value={form.username} style={{ borderBottom: `solid 1px ${iusername? "red": "#213F7D"}` }} />
                {userData?.role === 'tutor' && <input type="text" placeholder='Calendly Link' onChange={(e) => setForm({...form, calendly: e.target.value})} value={form.calendly} />}
            </div>
            {err && <p style={{ color: "red" }}>{err}</p>}
            {!pending ?
                <button>Edit Profile</button>
                :
                <button disabled={true}>Submitting . . .</button>
            }
        </form>


      </UserDetailsContainer>
  )
}

export default Profile

const UserDetailsContainer = styled.div`
    padding: 70px 60px;
    color: #213F7D;
    
    @media(max-width: 1100px) {
        padding: 30px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media(max-width: 950px) {
            flex-direction: column;
        }

        h1 {
            font-size: 24px;
            font-weight: 500;
        }

        .btns {
            display: flex;
            margin: 10px 0px;

            @media(max-width: 445px) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            a {
                background: #FFFFFF;
                border-radius: 8px;
                width: 170px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                border: 1px solid #39CDCC;
                color: #39CDCC;
                outline: none;
                cursor: pointer;
                margin-left: 20px;
                
                @media(max-width: 445px) {
                    margin-left: unset;
                    margin-bottom: 10px;
                }
            }
        }
    }

    form {
        .row {
            margin: 20px 0px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
            
            @media (max-width: 490px) {
                grid-template-columns: 1fr;
            }

            input {
                padding: 10px;
                border: none;
                border-bottom: 1px solid #213F7D;
                outline: none;
            }
        }

        button {
            padding: 10px 10px;
            border-radius: 10px;
            background: #213F7D;
            border: none;
            outline: none;
            cursor: pointer;
            color: #FFFFFF;

            &:hover {
                box-shadow: 3px 3px 4px #8a8a8a;
            }
        }
    }
`