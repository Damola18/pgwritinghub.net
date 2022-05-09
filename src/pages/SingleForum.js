import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader'
import ChatBox from '../Layouts/ChatBox'
import ChatForm from '../Layouts/ChatForm'
import { GetSingleForum, JoinForum } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconCloseCircled } from '../utils/icons'

const SingleForum = () => {
  const { id }= useParams()
  const [forumData, setForumData] = useState()
  const [err, setErr] = useState("")
  const [form, setForm ] = useState({password: ""})
  const [userData, setUserData] = useState()
  const [pending, setPending] = useState(true)
  const [joining, setJoining] = useState(false)
  
  useEffect(() => {
      const newUserProfile = getUserProfile()
      setUserData(newUserProfile)
  }, [])

  useEffect(() => {
    setPending(true)
    GetSingleForum(id).then(data => {
      setForumData(data)
      setPending(false)
    })
  }, [id])

  const HandleRequestAccess = (e) => {
    e.preventDefault()
    setJoining(true)
    if(form.password !== forumData.password){
      setErr("Invalid password")
      setJoining(false)
      return
    }
    if(forumData && userData && form.password === forumData.password) {
      setErr("")
      let newForumData = forumData 
      if(!forumData.participants.includes(userData.uid)){
        newForumData = {...forumData, participants: [...forumData.participants, userData.uid]}
        JoinForum(id, newForumData).then(data => {
          if(data.includes('Error')){
            setErr(data)
            setJoining(false)
          } else {
            setErr("")
            setForumData(newForumData)
            setJoining(false)
          }
        })
      }
    }
  }

  return (
    <>
      <GeneralContainer>
        {!pending ?
          <>
            <h3>Forum - {forumData?.title}</h3>
            <ChatBox />
            <ChatForm />
          </>
        :
          <Loader minH="40vh" iconH="80px" iconW="80px" />
        }
      </GeneralContainer>
      {forumData?
        !forumData?.participants.includes(userData.uid) &&
          <NewForumModal>
              <form>
                <h1>Request Access</h1>
                {err && <p style={{ color: "red" }}>{err}</p>}
                {forumData.password &&
                  <input type="password" placeholder='Password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                }
                {!joining ?
                  <button onClick={HandleRequestAccess}>Request</button>
                  :
                  <button disabled={true}>Requesting . . .</button>
                }
                <a href='/forums'>Exit <IconCloseCircled /></a>
              </form>
          </NewForumModal>
      :
        <></>
      }
    </>
  )
}

export default SingleForum


const GeneralContainer = styled.div`
    padding: 20px 60px;
    color: #213F7D;

    @media(max-width: 1100px) {
        padding: 20px;
    }
`


const NewForumModal = styled.div`
    position: fixed;
    z-index: 1000000;
    background: rgba(0, 0, 0, 0.7);
    width: calc(100% - 283px);
    height: 100vh;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;


    @media (max-width: 768px) {
        width: 100%;
    }

    form {
        width: 800px;
        max-width: 80%;
        background: #FFFFFF;
        padding: 100px 30px;
        border-radius: 10px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;

        @media (max-width: 440px) {
            max-width: 95%;
            padding: 100px 20px;
        }

        h1 {
          text-align: center;
        }

        button, a, input {
          padding: 10px 15px;
          border: none;
          background: #213F7D;
          color: #FFFFFF;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 15px;
        }
        input {
          background: #FFFFFF;
          border: 1.5px solid #213F7D;
          color: #213F7D;
          outline: none;
        }
        a {
          background: red;
          text-decoration: none;
        }
    }
`