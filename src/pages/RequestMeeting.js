import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import MentorContainer from '../components/MentorContainer'
import SearchBar from '../components/SearchBar'
import { GetMentors } from '../services/firebase'

const RequestMeeting = () => {
    const [mentors, setMentors] = useState()
    const [pending, setPending] = useState(false)
    const [searchResult, setSearchResult] = useState()
    const tableData = searchResult || mentors

    useEffect(() => {
        setPending(true)
        GetMentors().then(data => {
            setMentors(data)
            setPending(false)
        })
    }, [])

    const handleSearch = (term) => {
        const termL = term?.toLowerCase()
        if(!term) {
            setSearchResult()
        } 
        if(mentors.length > 0) {
            let newDataList = mentors.filter(item => item.firstname?.toLowerCase().includes(termL) || item.lastname?.toLowerCase().includes(termL) || item.email?.toLowerCase().includes(termL) || item.username?.toLowerCase().includes(termL))
            setSearchResult(newDataList)
        }
    }


  return (
      <RequestContainer>
        <div className="header">
            <h1>Request Meeting</h1>
        </div>
        <SearchBar submitSearch={handleSearch} />
        <div className="cohort_resources">
            {!pending ?
                tableData?.length > 0 ?
                    tableData.map(mentor => mentor.calendly && (
                        <MentorContainer key={mentor.uid} mentor={mentor} />
                    ))
                :
                <h1 style={{ margin: "50px", color: "red" }}>No tutor found!</h1>
            :
                <Loader minH="40vh" iconH="80px" iconW="80px" />
            }
        </div>
      </RequestContainer>
  )
}

export default RequestMeeting

const RequestContainer = styled.div`
    padding: 70px 60px;
    color: #213F7D;

    @media(max-width: 1100px) {
        padding: 30px;
    }

    .header {
        h1 {
            font-size: 24px;
            font-weight: 500;
        }
    }

    .cohort_resources {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 10px 0px;
    }
`

