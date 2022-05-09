import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { CreateAssignment, db, DeleteAssignment, EditAssignment, GetCategories } from '../services/firebase'
import { getUserProfile } from '../services/UserDataApi'
import { IconAngleDown, IconCloseCircled, IconDocumentAdd, IconTrashAlt } from '../utils/icons'

const Assignments = () => {
    const [assignmentList, setAssignmentList] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [userData, setUserData] = useState()
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [categories, setCategories] = useState()
    const [form, setForm] = useState({category: "", link: "", deadline: ""})
    const [deleteModal, setDeleteModal] = useState("")
    const [editModal, setEditModal] = useState("")
    const [submitModal, setSubmitModal] = useState({id: "", link: "", deadline: ""})
    const [viewModal, setViewModal] = useState({id: "", link: "", deadline: ""})
    const [submission, setSubmission] = useState("")
    
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
        onSnapshot(collection(db, 'assignments'), (snapshot) => {
            setAssignmentList(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            setPending(false)
        })
    }, [])

    const HandleCreateAssignment = (e) => {
        e.preventDefault()
        setLoading(true)
        CreateAssignment(form).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setForm({category: "", link: "", deadline: ""})
                setLoading(false)
                setModalOpen(false)
            }
        })
    }

    const HandleEditAssignment = (e, group, assignmentLink, assignmentDeadline) => {
        e.preventDefault()
        setLoading(true)
        let newAssignmentList = group.assignments.filter(item => item.link !== assignmentLink && item.deadline !== assignmentDeadline)
        console.log(newAssignmentList);
        EditAssignment(group.id, newAssignmentList).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setLoading(false)
            }
        })
    }

    const HandleSubmitAssignment = (e, group) => {
        e.preventDefault()
        setLoading(true)
        let newSubmission = {
            student: `${userData.firstname || userData.username} ${userData.lastname || ""}`,
            link: submission
        }
        let otherAssignmentList = group.assignments.filter(item => item.link !== submitModal.link && item.deadline !== submitModal.deadline)
        let thisAssignmentList = group.assignments.find(item => item.link === submitModal.link && item.deadline === submitModal.deadline)
        if(thisAssignmentList.submissions?.length > 0) {
            thisAssignmentList = {...thisAssignmentList, submissions: [...thisAssignmentList.submissions, newSubmission]}
        } else {
            thisAssignmentList = {...thisAssignmentList, submissions: [newSubmission]}
        }
        otherAssignmentList.push(thisAssignmentList)
        EditAssignment(group.id, otherAssignmentList).then(data => {
            if(data.includes('Error')) {
                setErr(data)
            } else {
                setErr("")
                setLoading(false)
                setSubmission("")
                setSubmitModal(false)
            }
        })
    }

    const HandleDeleteAssignment = (e, id) => {
        e.preventDefault()
        setLoading(true)
        DeleteAssignment(id).then(data => {
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
        <AssignmentContainer>
            <div className="header">
                <h1>Assignments</h1>
                <div className="btns">
                    {userData?.role !== 'student' &&
                        <button onClick={() => setModalOpen(true)}><IconDocumentAdd /> Add New Assignment</button>
                    }
                </div>
            </div>        
            <h3 className='subheading'>Cohort Assignments</h3>
            <div className="cohort_resources">
                {!pending ?
                    assignmentList?.length > 0 ?
                        <>
                            {assignmentList.map(group => (
                                <div key={group.id}>
                                    <h1 onClick={() => ToggleCategory(group.id)}>
                                        <span>
                                            {group.id.replace("_", " ")} 
                                        </span>
                                        <IconAngleDown />
                                    </h1>
                                    <div className="resources" style={{ height: selectedGroup === group.id ? "" : "0px" }}>
                                        {userData?.role !== 'student' &&
                                            <div className="btns">
                                                <button className='link' onClick={() => setEditModal(group.id)}>Edit</button>
                                                <button className='link' onClick={() => setDeleteModal(group.id)}>Delete</button>
                                            </div>
                                        }
                                        
                                        {editModal === group.id &&
                                            <NewForumModal>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <button onClick={() => setEditModal("")} className="close"><IconCloseCircled /></button>
                                                    <h2>Edit {group.id.replace("_", " ")}</h2><br />
                                                    <hr />
                                                    <div className="table_responsive">
                                                        {group?.assignments?.map(assignment => (
                                                            <table key={assignment.link}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><a href={assignment.link} target="_blank" rel="noopener noreferrer">{assignment.link}</a></td>
                                                                        <td>{assignment.deadline}</td>
                                                                        <td>
                                                                            <span onClick={(e) => HandleEditAssignment(e, group, assignment.link, assignment.deadline)}><IconTrashAlt /></span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        ))}
                                                    </div>
                                                    {err && <p style={{ color: "red" }}>{err}</p>}
                                                </form>
                                            </NewForumModal>
                                        }
                                        {deleteModal === group.id &&
                                            <NewForumModal>
                                                <form onSubmit={(e) => HandleDeleteAssignment(e, group.id.replace(" ","_"))}>
                                                    <button onClick={() => setDeleteModal("")} className="close"><IconCloseCircled /></button>
                                                    <h2 style={{textAlign: "center"}}>Are you sure you want to delete this category and all the assignments in it?</h2>
                                                    {err && <p style={{ color: "red" }}>{err}</p>}
                                                    {!loading ?
                                                        <button>Confirm Delete</button>
                                                        :
                                                        <button disabled={true}>Deleting . . .</button>
                                                    }
                                                </form>
                                            </NewForumModal>
                                        }
                                        <div className="table_responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Link</td>
                                                        <td>Deadline</td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {group?.assignments?.map((assignment, index) => (
                                                        <tr key={assignment.link + assignment.deadline}>
                                                            <td>{index + 1}</td>
                                                            <td><a href={assignment.link} target="_blank" rel="noopener noreferrer">{assignment.link}</a></td>
                                                            <td>{new Date(assignment.deadline).toDateString()}</td>
                                                            {userData.role === 'student'?
                                                                <td>{new Date().getTime() < new Date(assignment.deadline).getTime() && <button onClick={() => setSubmitModal({id: group.id, link: assignment.link, deadline: assignment.deadline})}>Submit</button>}</td>
                                                            :    
                                                                <td><button onClick={() => setViewModal({id: group.id, link: assignment.link, deadline: assignment.deadline})}>View [{assignment.submissions?.length || 0}] Submissions</button></td>
                                                            }
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {group?.assignments?.map(assignment => (
                                                <div key={assignment.link + assignment.deadline + "2"}>
                                                    {(viewModal.link === assignment.link && viewModal.deadline === assignment.deadline) &&
                                                            <NewForumModal>
                                                                <form onSubmit={(e) => {e.preventDefault()}}>
                                                                    <button onClick={() => setViewModal("")} className="close"><IconCloseCircled /></button>
                                                                    <h2>Assignment Submission</h2>
                                                                    <div className="table_responsive">
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Submission link</th>
                                                                                    <th>Student</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {assignment.submissions?.map(submission => (
                                                                                    <tr key={submission.link}>
                                                                                        <td><a href={submission.link} target="_blank" rel="noopener noreferrer">{assignment.link}</a></td>
                                                                                        <td>{submission.student}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </form>
                                                            </NewForumModal>
                                                        }    
                                                        {(submitModal.link === assignment.link && submitModal.deadline === assignment.deadline) &&
                                                            <NewForumModal>
                                                                <form onSubmit={(e) => HandleSubmitAssignment(e, group)}>
                                                                    <button onClick={() => setSubmitModal("")} className="close"><IconCloseCircled /></button>
                                                                    <h2>Submit assignment</h2>
                                                                    <input type="url" placeholder='Link' required value={submission} onChange={(e) => setSubmission(e.target.value)} />
                                                                    {err && <p style={{ color: "red" }}>{err}</p>}
                                                                    {!loading ?
                                                                        <button>Submit Assignment</button>
                                                                        :
                                                                        <button disabled={true}>Submitting . . .</button>
                                                                    }
                                                                </form>
                                                            </NewForumModal>
                                                        }  
                                                    </div>  
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    :
                    <h1>No assignment available yet!</h1>
                :
                    <Loader minH="40vh" iconH="80px" iconW="80px" />
                }
            </div>
        </AssignmentContainer>
        {modalOpen &&
            <NewForumModal>
                <form onSubmit={HandleCreateAssignment}>
                    <button onClick={() => setModalOpen(false)} className="close"><IconCloseCircled /></button>
                    <h2>Add new assignment</h2>
                    <select required value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                        <option value="">Choose Category</option>
                        {categories?.map(category => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                    <input type="url" placeholder='Link' required value={form.link} onChange={(e) => setForm({...form, link: e.target.value})} />
                    <label>Deadline: </label>
                    <input type="date" placeholder='Deadline' required value={form.deadline} onChange={(e) => setForm({...form, deadline: e.target.value})} />
                    {err && <p style={{ color: "red" }}>{err}</p>}
                    {!loading ?
                        <button>Create Assignment</button>
                        :
                        <button disabled={true}>Submitting . . .</button>
                    }
                </form>
            </NewForumModal>
        }
    </>
  )
}

export default Assignments

const AssignmentContainer = styled.div`
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
            width: 100%;
            overflow-y: hidden;

            .btns {
                margin: 10px;
                display: flex;
                align-items: center;

                .link {
                    text-decoration: none;
                    flex: 1;
                    margin: 0px 20px;
                    padding: 10px 0px;
                    background: #39CDCC;
                    border: none; 
                    outline: none;
                    border-radius: 10px;
                    font-weight: bolder;
                    cursor: pointer;
                    color: #000;
                    text-align: center;
                    font-size: 16px;
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

            .table_responsive {
                max-width: 100%;
                overflow-x: auto;
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
                        max-width: 350px;
                        white-space: nowrap;
                        overflow: hidden;
                        display: block;
                        text-overflow: ellipsis;
                    }
        
                    button {
                        padding: 10px;
                        background: #39CDCC;
                        border: none; 
                        outline: none;
                        border-radius: 10px;
                        cursor: pointer;
        
                        svg {
                            color: red;
                            font-size: 25px;
                        }
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

        table {
            width: 100%;
            padding: 10px 0px;
            
            td {
                border: 1px solid #000;
                min-width: 100px;

                span {
                    cursor: pointer;
                    
                    svg {
                        font-size: 25px;
                        color: red;
                    }
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

        input, select {
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