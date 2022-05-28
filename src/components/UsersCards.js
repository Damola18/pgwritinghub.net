import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GetUsers } from '../services/firebase'
import { IconGroup, IconUserCheck,IconUserSettingsVariant, IconUsers } from '../utils/icons'

const UsersCards = () => {
    const [usersList, setUsersList] = useState()
    const [students, setStudents] = useState("0")
    const [tutors, setTutors] = useState("0")
    const [admins, setAdmins] = useState("0")
    const [facilitators, setFacilitators] = useState("0")
    
    useEffect(() => {
        GetUsers().then(data => {
            setUsersList(data)
        })
    }, [])

    useEffect(() => {
        let studentList = usersList?.filter(user => user.role === "student")
        setStudents(studentList?.length)
    }, [usersList])
    useEffect(() => {
        let tutorList = usersList?.filter(user => user.role === "tutor")
        setTutors(tutorList?.length)
    }, [usersList])
    useEffect(() => {
        let adminList = usersList?.filter(user => user.role === "admin")
        setAdmins(adminList?.length)
    }, [usersList])
    useEffect(() => {
        let facilitatorList = usersList?.filter(user => user.role === "facilitator")
        setFacilitators(facilitatorList?.length)
    }, [usersList])

    return (
        <Cards>
            <div className="card">
                <span style={{ color: "#FF3366", background: "#FF336615"}}><IconGroup /></span>
                <p>All</p>
                <h2>{usersList?.length}</h2>
            </div>
            <div className="card">
                <span style={{ color: "#DF18FF", background: "#DF18FF15"}}><IconUsers /></span>
                <p>Students</p>
                <h2>{students}</h2>
            </div>
            <div className="card">
                <span style={{ color: "#5718FF", background: "#5718FF15"}}><IconUsers /></span>
                <p>Tutors</p>
                <h2>{tutors}</h2>
            </div>
            <div className="card">
                <span style={{ color: "#F55F44", background: "#F55F4415"}}><IconUserCheck /></span>
                <p>Admins</p>
                <h2>{admins}</h2>
            </div>

            <div className="card">
                <span style={{ color: "#000", background: "#ccc"}}><IconUserSettingsVariant /></span>
                <p>Facilitators</p>
                <h2>{facilitators}</h2>
            </div>
        </Cards>
    )
}

export default UsersCards

const Cards = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 40px 0px;

    .card {
        background: #FFFFFF;
        box-shadow: 3px 5px 20px #0000000A;
        border: 1px solid #213F7D0F;
        border-radius: 4px;
        padding: 20px 30px;
        height: 160px;
        width: 220px;
        max-width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 10px auto;

        @media(max-width: 370px) {
            padding: 10px 15px;
        }

        @media(max-width: 300px) {
            padding: 20px 30px;
            max-width: unset;
            min-width: 100%;
        }

        span {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;

            svg {
                width: 15px;
                height: 15px;
            }
        }

        p {
            color: #545F7D;
            font-size: 14px;
        }

        h2 {
            color: #213F7D;
            font-weight: 600;
            font-size: 24px;
        }
    }
    
`