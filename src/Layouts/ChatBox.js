import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { db, DeleteForumChat } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconTrashAlt } from '../utils/icons'

const ChatBox = () => {
    const container = useRef(null)
    const { id }= useParams()
    const [userData, setUserData] = useState()
    const [chatList, setChatList] = useState()
    const [pending, setPending] = useState(false)
    
    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])

    useEffect(() => {
        setPending(true)
        onSnapshot(doc(db, 'forums_chat', id), (snapshot) => {
            setChatList(snapshot.data()?.chats.map(doc => doc))
            setPending(false)
        })
    }, [id])

    useEffect(() => {
        container.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatList, pending])


    const HandleDeleteChat = (e, content, date_sent, sender) => {
        e.preventDefault()

        let newChatList = chatList.filter(item => (!(item.content === content && item.date_sent === date_sent && item.sender === sender)))
        DeleteForumChat(id, newChatList).then(data => {
            //
        })
    }

    return (
        <ChatContainer>
            {!pending? 
                chatList?.length > 0 ?
                    chatList.map((chat, index) => (
                        chat.type === "link" ?
                            <div className={`message ${chat.sender === userData.username? 'me': ''}`} key={index}>
                                {chat.sender !== userData.username &&
                                    <h5>@{chat.sender}</h5>
                                }
                                <a href={chat.content} target="_blank" rel="noopener noreferrer">{chat.content}</a>
                                <p className='date_time'>
                                    {chat.date_sent.toDate().toDateString()} - {chat.date_sent.toDate().toLocaleTimeString()}
                                    {chat.sender === userData.username &&
                                        <button onClick={(e) => HandleDeleteChat(e, chat.content, chat.date_sent, chat.sender)}><IconTrashAlt /></button>
                                    }
                                </p>
                            </div>
                        :
                            <div className={`message ${chat.sender === userData.username? 'me': ''}`} key={index} >
                                {chat.sender !== userData.username &&
                                    <h5>@{chat.sender}</h5>
                                }
                                <p>{chat.content}</p>
                                <p className='date_time'>
                                    {chat.date_sent.toDate().toDateString()} - {chat.date_sent.toDate().toLocaleTimeString()}
                                    {chat.sender === userData.username &&
                                        <button onClick={(e) => HandleDeleteChat(e, chat.content, chat.date_sent, chat.sender)}><IconTrashAlt /></button>
                                    }
                                </p>
                            </div>
                    ))
                :
                <h1>No chats yet!</h1>
            :
                <Loader minH="40vh" iconH="80px" iconW="80px" />
            }
            <div ref={container}></div>
        </ChatContainer>
    )
}

export default ChatBox

const ChatContainer = styled.div`
    background: #FFFFFF;
    max-height: 60vh;
    min-height: 300px;
    overflow-y: auto;
    width: 100%;
    margin: 10px 0px;
    box-shadow: 3px 3px 20px #0000000A;
    border-radius: 10px;
    padding: 20px;

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 8px;
        background: #39CDCC30;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #39CDCCA0;
        border-radius: 8px;
     }

    .message {
        margin: 10px 0px;
        background: #39CDCC40;
        width: 500px;
        max-width: 70%;
        padding: 15px;
        border-radius: 15px;
        
        &.me {
            margin-left: auto;
            background: #39CDCC;
        }

        h5 {
            margin-bottom: 10px;
        }

        a {
            background: #ccc;
            color: #000;
            width: 350px;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            padding: 2px 10px;
            border-radius: 20px;

            &:hover {
                filter: brightness(0.8);
            }
        }

        .date_time {
            font-size: 15px;
            margin-top: 10px;
            text-align: right;

            button {
                background: none;
                border: none;
                outline: none;
                cursor: pointer;

                svg {
                    color: red;
                    font-size: 20px;
                }
            }
        }
    }
`