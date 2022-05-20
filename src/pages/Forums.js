import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar'
import { CreateForum, db, DeleteForum } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconCloseCircled, IconDocumentAdd, IconTrashAlt } from '../utils/icons'

const Forums = () => {
    const [forumList, setForumList] = useState()
    const [userData, setUserData] = useState()
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [form, setForm] = useState({access: "all", title: "", password: ""})
    const [searchResult, setSearchResult] = useState()
    const tableData = searchResult || forumList
    const [activeTab, setActiveTab] = useState("all")
    
    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])

    useEffect(() => {
        setLoading(true)
        onSnapshot(collection(db, 'forums'), (snapshot) => {
            setForumList(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
            setLoading(false)
        })
    }, [])

    const HandleCreateForum = (e) => {
        e.preventDefault()
        setErr("")
        setPending(true)
        CreateForum(form).then(data => {
            if (data?.includes('Error')) {
                setErr(data)
                setPending(false)
            } else {
                setErr("")
                setForm({access: "all", title: "", password: ""})
                setPending(false)
                setModalOpen(false)
            }
        })
    }

    
    const HandleDeleteForum = (e, id) => {
        e.preventDefault()
        setErr("")
        setPending(true)
        DeleteForum(id).then(data => {
            if (data?.includes('Error')) {
                setErr(data)
                setPending(false)
            } else {
                setErr("")
                setPending(false)
            }
        })
    }

    const handleSearch = (term) => {
        const termL = term?.toLowerCase()
        if(!term) {
            setSearchResult()
        } 
        if(forumList.length > 0) {
            let newDataList = forumList.filter(item => item.title?.toLowerCase().includes(termL))
            setSearchResult(newDataList)
        }
    }

  return (
      <>
        <CohortContainer>
            <div className="header">
                <h1>Forums</h1>
                {userData?.role !== 'student' && 
                    <div className="btns">
                        <button onClick={() => setModalOpen(true)}><IconDocumentAdd /> Create New Topic</button>
                    </div>
                }
            </div>
            <SearchBar submitSearch={handleSearch} />
            <div className='tabs'>
                <button onClick={() => setActiveTab("all")} className={activeTab === 'all'? "active": ""}>
                    {/* All */}
                </button>
                {/* {userData?.role !== 'student' &&
                    <button onClick={() => setActiveTab("facilitator")} className={activeTab !== 'all'? "active": ""}>Facilitators</button>
                } */}
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Forum Topics</td>
                        <td>Participants</td>
                        <td>Date Created</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {!loading ?
                        tableData?.length > 0 ?
                            tableData.map(forum => forum.access === activeTab && (
                                <tr key={forum.id}>
                                    <td><a href={`forums/${forum.id}`}>{forum.title}</a></td>
                                    <td>{forum.participants.length}</td>
                                    <td>{forum.date_created.toDate().toDateString()}</td>
                                        <td>
                                            {
                                                userData?.role !== "student" && 
                                                <button onClick={(e) => HandleDeleteForum(e, forum.id)}><IconTrashAlt /></button>
                                            }
                                            
                                        </td>
                                </tr>
                            ))
                        :
                        <tr>
                            <td colSpan="100%">No Forums yet    !</td>
                        </tr>
                    :
                    <tr>
                        <td colSpan="100%">
                            <Loader minH="40vh" iconH="80px" iconW="80px" />
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </CohortContainer>
        {modalOpen &&
            <NewForumModal>
                <form onSubmit={HandleCreateForum}>
                    <button onClick={() => setModalOpen(false)} className="close"><IconCloseCircled /></button>
                    {/* <label>Who has access?</label>
                    <select required value={form.access} onChange={(e) => setForm({...form, access: e.target.value})}>
                        <option value="all">All</option>
                        <option value="facilitator">Facilitators</option>
                    </select> */}
                    <input type="text" placeholder='Topic' required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                    {form.access !== "all" &&
                        <input type="password" placeholder='Password' required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                    }
                    {!pending ?
                        <button>Create Forum</button>
                        :
                        <button disabled={true}>Submitting . . .</button>
                    }
                    {err && <p style={{ color: "red", position: 'absolute', bottom: '30px' }}>{err}</p>}
                </form>
            </NewForumModal>
        }
    </>
  )
}

export default Forums

const CohortContainer = styled.div`
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

            button {
                background: #FFFFFF;
                border-radius: 8px;
                padding: 0px 10px;
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

                svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }
        }
    }

    .tabs {
        display: flex;
        border-bottom: 2px solid #213F7D;

        button {
            display:none
            padding: 10px 15px;
            border: none;
            outline: none;
            cursor: pointer;
            min-width: 80px;

            &.active {
                background: #fff;
            }
        }
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0px;

        thead {
            tr{
                background: #213F7DAA;
                color: #FFFFFF;
            }
            td {
                font-weight: 700;
            }
        }
        tr {
            &:nth-child(even) {
                background: #213F7D3A;
            }
        }
        td {
            border: 1px solid #213F7D;
            padding: 10px;

            a {
                color: #213F7D;
            }

            button {
                background: none;
                border: none;
                outline: none;
                cursor: pointer;

                svg {
                    color: red;
                    font-size: 25px;
                }
            }
        }
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
        display: flex;
        flex-direction: column;

        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            cursor: pointer;
            border: none;
    
            svg {
                width: 30px;
                height: 30px;
                color: #000000;
            }
        }

        @media (max-width: 440px) {
            max-width: 95%;
            padding: 100px 20px;

            .close {
                top: 13px;
                right: 10px;
            }
        }

        input, select {
            border-radius: 20px;
            border: 1px solid #213F7D;
            padding: 10px;
            flex: 1;
            margin: 10px 0px;
        }
        
        button {
            margin: 10px 0px;
            border-radius: 20px;
            border: 1px solid #213F7D;
            padding: 10px 15px;
            background: #213F7D;
            color: #FFFFFF;
        }

        @media (max-width: 576px) {
            flex-direction: column;
            
            input {
                border-radius: 20px;
                margin-bottom: 10px;
            }
            
            button {
                border-radius: 20px;
            }
        }
    }
`