import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import ResourceContainer from '../components/ResourceContainer'
import Schedule from '../Layouts/Schedule'
import { CreateResource, db, DeleteCategory, EditResources, GetCategories } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconAngleDown, IconCloseCircled, IconDocumentAdd, IconTrashAlt } from '../utils/icons'
import LecturerProfile from '../Layouts/LecturerProfile'

const Cohorts = () => {
    const [resourcesList, setResourcesList] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [userData, setUserData] = useState()
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [categories, setCategories] = useState()
    const [form, setForm] = useState({category: "", title: "", link: ""})
    const [deleteModal, setDeleteModal] = useState("")
    const [editModal, setEditModal] = useState("")
    
    useEffect(() => {
        const newUserProfile = getUserProfile()
        setUserData(newUserProfile)
    }, [])

    useEffect(() => {
        GetCategories().then(data => {
            setCategories(data.map(item => item.replace("_", " ")))
        })
    }, [])

    useEffect(() => {
        setPending(true)
        onSnapshot(collection(db, 'resources'), (snapshot) => {
            setResourcesList(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            setPending(false)
        })
    }, [])

    const HandleCreateResource = (e) => {
        e.preventDefault()
        setLoading(true)
        CreateResource(form).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setForm({category: "", title: "", link: ""})
                setLoading(false)
                setModalOpen(false)
            }
        })
    }

    const HandleDeleteResource = (e, group, resourceTitle) => {
        e.preventDefault()
        setLoading(true)
        let newResourcesList = group.resources.filter(item => item.title !== resourceTitle)
        EditResources(group.id, newResourcesList).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setLoading(false)
            }
        })
    }

    const HandleDeleteCategory = (e, id) => {
        e.preventDefault()
        setLoading(true)
        DeleteCategory(id).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setLoading(false)
                setDeleteModal("")
            }
        })
    }

    const ToggleCategory = (group) => {
        if(selectedGroup === group) {
            setSelectedGroup("")
        } else {
            setSelectedGroup(group)
        }
    }

  return (
      <>
        <CohortContainer>
            <div className="header">
                <h1>Course Information</h1>

                
                <div className="btns">
                    {userData?.role !== 'student' && userData?.role !== 'facilitator' && 
                        <button onClick={() => setModalOpen(true)}><IconDocumentAdd /> Add New Resource</button>
                    }
                </div>
            </div>   

            <h3 className='subheading'>General</h3>        
            <h3 className='subheading'>Lecture schedule</h3>
            <p style={{ margin: "10px 0px" }}> Recurring link: <a href="https://zoom.us/j/95259016651?pwd=ZXVrd21ERm0wNFJRaG1hcnU2N1hmdz09" target="_blank" rel="noopener noreferrer">https://zoom.us/j/95259016651?pwd=ZXVrd21ERm0wNFJRaG1hcnU2N1hmdz09</a></p>
            <Schedule />
            <h3 className='subheading'>Resources</h3>
            <div className="cohort_resources">
                {!pending ?
                    resourcesList?.length > 0 ?
                        <>
                            {resourcesList.map((group, index) => (
                                <div key={group.id + index}>
                                    <h1 onClick={() => ToggleCategory(group.id)} className="resourceHeader">
                                        <span>
                                            {group.id.replace("_", " ")} 
                                        </span>
                                        <IconAngleDown className="angleDowm" />
                                    </h1>
                                    <div className="resources" style={{ height: selectedGroup === group.id ? "" : "0px" }}>
                                        {userData?.role !== 'student' &&
                                            <div className="btns">
                                                <button onClick={() => setEditModal(group.id)}>Edit</button>
                                                <button onClick={() => setDeleteModal(group.id)}>Delete</button>
                                            </div>
                                        }
                                        
                                        {editModal === group.id &&
                                            <NewForumModal>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <button onClick={() => setEditModal("")} className="close"><IconCloseCircled /></button>
                                                    <h2>Edit {group.id.replace("_", " ")}</h2><br />
                                                    <hr />
                                                    {group?.resources?.map((resource, index) => (
                                                        <div key={resource.title + index}>
                                                            <h3 className='row'>
                                                                {resource.title}
                                                                <span onClick={(e) => HandleDeleteResource(e, group, resource.title)}><IconTrashAlt /></span>
                                                            </h3>
                                                            <hr />
                                                        </div>
                                                    ))}
                                                    {err && <p style={{ color: "red" }}>{err}</p>}
                                                </form>
                                            </NewForumModal>
                                        }

                                        {deleteModal === group.id &&
                                            <NewForumModal>
                                                <form onSubmit={(e) => HandleDeleteCategory(e, group.id.replace(" ","_"))}>
                                                    <button onClick={() => setDeleteModal("")} className="close"><IconCloseCircled /></button>
                                                    <h2 style={{textAlign: "center"}}>Are you sure you want to delete this category and all the resources in it?</h2>
                                                    {err && <p style={{ color: "red" }}>{err}</p>}
                                                    {!loading ?
                                                        <button>Confirm Delete</button>
                                                        :
                                                        <button disabled={true}>Deleting . . .</button>
                                                    }
                                                </form>
                                            </NewForumModal>
                                        }
                                        
                                        {group?.resources?.map((resource, index) => (
                                                <ResourceContainer key={resource.title + index} resource={resource} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    :
                    <h1>No course available yet!</h1>
                :
                    <Loader minH="40vh" iconH="80px" iconW="80px" />
                }
            </div>

            <h3 className='subheading'>Lecturer profiles</h3>
            <LecturerProfile/>
        </CohortContainer>
        {modalOpen &&
            <NewForumModal>
                <form onSubmit={HandleCreateResource}>
                    <button onClick={() => setModalOpen(false)} className="close"><IconCloseCircled /></button>
                    <h2>Add new resource</h2>
                    <input list="category" placeholder='Category' required value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} />
                    <datalist id="category">
                        {categories?.map((category, index) => (
                            <option value={category} key={category + index}>{category}</option>
                        ))}
                    </datalist>
                    <input type="text" placeholder='Topic' required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                    <input type="url" placeholder='Link' required value={form.link} onChange={(e) => setForm({...form, link: e.target.value})} />
                    {err && <p style={{ color: "red" }}>{err}</p>}

                    {!loading ?
                        <button>Create Resource</button>
                        :
                        <button disabled={true}>Submitting . . .</button>
                    }
                </form>
            </NewForumModal>
        }
    </>
  )
}

export default Cohorts

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

            a, button {
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

    .resourceHeader{
        font-size:20px;
    }
    
    .subheading {
        margin-top: 25px;
        padding: 10px ;
        border-bottom: 1px solid #DADCE0;
    }

    .cohort_resources {
        width: 100%;
        padding: 10px 0px;

        h1 {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;

            &:hover {
                background: #ccc;
            }
        }

        .resources {
            padding: 0px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            overflow-y: hidden;

            .btns {
                width: 190px;
                min-height: 190px;
                background: #ccc;
                margin: 10px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;

                button {
                    width: 80%;
                    padding: 10px 0px;
                    background: #39CDCC;
                    border: none; 
                    outline: none;
                    border-radius: 10px;
                    font-weight: bolder;
                    cursor: pointer;
                    transition: ease 0.4s all;

                    &:nth-of-type(2) {
                        background: red;
                        color: #fff;
                    }

                    &:hover {
                        filter: brightness(1.2);
                        box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
                    }
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

        .row {
            padding: 10px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                cursor: pointer;
                
                svg {
                    font-size: 25px;
                    color: red;
                }
            }
        }

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

        input {
            border-radius: 20px;
            border: 1px solid #213F7D;
            padding: 10px;
            flex: 1;
            margin: 10px 0px;
        }
        
        button {
            border: 1px solid #213F7D;
            padding: 10px 15px;
            background: #213F7D;
            color: #FFFFFF;
            border-radius: 20px;
            margin: 10px 0px;
        }
    }
`