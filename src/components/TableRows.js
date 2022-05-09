import React, { useState } from 'react'
import styled from 'styled-components'
import { ConfirmUserApplication } from '../services/firebase'
import { IconMenuKebab, IconSpinner, IconUserCheck, IconUserX } from '../utils/icons'

const TableRows = ({user}) => {
    const {firstname, lastname, username, uid, email, role, cohort} = user
    const [popOpen, setPopOpen] = useState(false)
    const [pendinga, setPendinga] = useState(false)
    const [pendingr, setPendingr] = useState(false)

    const statusColor = {
        student : "#39CD62",
        tutor: "#FF3366",
        admin: "#E9B200"
    }
    const handleOpenPop = () => {
        if(popOpen) {
            setPopOpen(false)
        }
        else{
            setPopOpen(true)
        }
    }

    
    let closingTimer
    let closingInterval = 1000

    const handleClosePop = () => {
        clearTimeout(closingTimer)
        closingTimer = setTimeout(() => {
            setPopOpen(false)
        }, closingInterval);
    }
    
    const handleOpening = () => {
        clearTimeout(closingTimer)
    }

    const HandleAccept = () => {
        setPendinga(true)
        let newUserData = {...user, cohort: 1}
        ConfirmUserApplication(uid, newUserData).then(() => {
            setPendinga(false)
            handleClosePop()
        })
    }
    
    const HandleReject = () => {
        setPendingr(true)
        let newUserData = {...user, cohort: "Rejected"}
        ConfirmUserApplication(uid, newUserData).then(() => {
            setPendingr(false)
            handleClosePop()
        })
    }
    return (
        <>
            <TR>
                <td>{firstname} {lastname}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{cohort ? cohort : "Pending"}</td>
                <td>
                    <span style={{ color: statusColor[`${role}`], background: statusColor[`${role}`] + "15" }}>
                        {role}
                    </span>
                </td>
                <td>
                    {role === 'student' &&
                        <button onClick={handleOpenPop}><IconMenuKebab /></button>
                    }
                    {popOpen &&
                        <Popover onMouseLeave={handleClosePop} onMouseEnter={handleOpening}>
                            {!pendinga ?
                                <button onClick={HandleAccept}><IconUserCheck />Accept Application</button>
                            :
                                <button onClick={() => {}}><IconSpinner /> Loading . . .</button>
                            }
                            {!pendingr ?
                                <button onClick={HandleReject}><IconUserX /> Reject Application</button>
                            :
                                <button onClick={() => {}}><IconSpinner /> Loading . . .</button>
                            }
                        </Popover>
                    }
                </td>
            </TR>
        </>

    )
}

export default TableRows

const TR = styled.tr`
    border-bottom: 1px solid #213F7D1A;
    height: 60px;
    position: relative;
    

    td {
        white-space: nowrap;
        padding-right: 45px;

        span {
            border-radius: 100px;
            padding: 5px 10px;
        }

        button {
            background: none;
            border: none;
            outline: none;
            cursor: pointer;

            svg {
                width: 20px;
                height: 20px;
                color: #545F7D;
            }
        }
    }

    &:last-of-type {
        border-bottom: none;
    }
`
const Popover = styled.div`
    position: absolute;
    right: 10px;
    background: #FFFFFF;
    box-shadow: 3px 5px 20px #0000000A;
    border: 1px solid #213F7D0F;
    border-radius: 4px;
    padding: 20px 30px;
    z-index: 100;
    display: flex;
    flex-direction: column;

    button {
        color: #545F7D;
        display: flex;
        align-items: center;
        margin: 10px 0px;

        svg {
            width: 15px;
            height: 15px;
            margin-right: 10px;
        }
    }
`