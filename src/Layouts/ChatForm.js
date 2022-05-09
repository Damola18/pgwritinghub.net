import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SendForumChat } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconSend } from '../utils/icons'

const ChatForm = () => {
    const { id }= useParams()
    const [userData, setUserData] = useState()
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [form, setForm] = useState({type: "text", content: ""})

    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])

    const HandleSubmitChat = (e) => {
        e.preventDefault()
        setPending(true)
        const chatData = {...form, sender: userData.username}
        SendForumChat(id, chatData).then(data => {
            if(data.includes("Error")){
                setErr(data)
                setPending(false)
            } else {
                setErr("")
                setForm({type: form.type, content: ""})
                setPending(false)
            }
        })
    }

  return (
      <FormContainer err={err}>
          <form onSubmit={HandleSubmitChat}>
              <select defaultValue={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                  <option value="text">Text</option>
                  <option value="link">Link</option>
              </select>

              {form.type === 'text' ?
                <textarea draggable={false} placeholder='Type your message here...' value={form.content} required onChange={(e) => setForm({...form, content: e.target.value})}></textarea>
              :
                <input type="url" placeholder='Paste your link here...' value={form.content} required onChange={(e) => setForm({...form, content: e.target.value})} />
              }
              {!pending && <button><IconSend /></button>}
          </form>
      </FormContainer>
  )
}

export default ChatForm

const FormContainer = styled.div`
    margin: 10px 0px;

    form {
        display: flex;
        
        select {
            height: 60px;
            width: 100px;
            border-radius: 40px 0px 0px 40px;
            padding: 0px 10px;
            background: #39CDCCA0;
            border: none;
            outline: none;
        }
        
        textarea, input {
            border: 1px solid ${props => props.err !== "" ? "red": "#39CDCCA0"};
            background: #FFFFFF;
            height: 60px;
            flex: 1;
            resize: none;
            outline: none;
            padding: 10px;
            
            &::-webkit-scrollbar {
                width: 8px;
                border-radius: 8px;
                background: #39CDCC30;
            }
            
            &::-webkit-scrollbar-thumb {
                background: #39CDCCA0;
                border-radius: 8px;
            }
        }

        button {
            margin: 10px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: none;
            outline: none;
            cursor: pointer;
            background: #39CDCC; 

            svg {
                width: 30px;
                height: 30px;
                color: white;
            }
        }
    }

`