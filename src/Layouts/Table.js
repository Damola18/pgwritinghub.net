import { collection, onSnapshot } from 'firebase/firestore'
import React, { useState } from 'react'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import TableHeader from '../components/TableHeader'
import TableRows from '../components/TableRows'
import { db } from '../services/firebase'
import { IconSpinner } from '../utils/icons'

const Table = () => {
    const [countPerPage, setCountPerPage] = useState(50)
    const [totalRecord, setTotalRecord] = useState(0)
    const [page, setPage] = useState(0)
    const [dataList, setDataList] = useState([])
    const [searchResult, setSearchResult] = useState()
    const tableData = searchResult || dataList

    useState(() => {
        onSnapshot(collection(db, 'users'), (snapshot) => {
            let userList = []
            snapshot.forEach(doc => userList.push(doc.data()))
            setDataList(userList)
            setTotalRecord(userList.length)
        })
    }, [page, countPerPage])

    const handleSearch = (term) => {
        console.log("Searching . . .");
        const termL = term?.toLowerCase()
        if(!term) {
            setSearchResult()
        } 
        if(dataList.length > 0) {
            let newDataList = dataList.filter(item => item.firstname?.toLowerCase().includes(termL) || item.lastname?.toLowerCase().includes(termL) || item.email?.toLowerCase().includes(termL) || item.username?.toLowerCase().includes(termL) || item.role?.toLowerCase().includes(termL))
            setSearchResult(newDataList)
        }
    }

    return (
        <TableContainer>
            <SearchBar submitSearch={handleSearch} />
            {totalRecord > 0 ?
                <>
                    <div className="table_responsive">
                        <table>
                            <TableHeader />
                            <tbody>
                                {tableData.slice(page * countPerPage, page * countPerPage + countPerPage).map((user) => (
                                    <TableRows user={user} key={user.uid} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination countPerPage={countPerPage} setCountPerPage={setCountPerPage} totalRecord={tableData.length} page={page} setPage={setPage} />
                </>
            :
                <Loader>
                    <IconSpinner />
                </Loader>
            }
        </TableContainer>
    )
}

export default Table

const TableContainer = styled.div`
    .table_responsive {
        background: #FFFFFF;
        box-shadow: 3px 5px 20px #0000000A;
        border: 1px solid #213F7D0F;
        border-radius: 4px;
        padding: 30px;
        overflow-x: auto;
        height: max-content;

        &::-webkit-scrollbar {
            height: 6px;
            border-radius: 8px;
            background: #39CDCC10;
        }
        &::-webkit-scroll-thumb {
            border-radius: 8px;
            background: #213F7D;
            border: 1px solid black;
        }

        table {
            border-collapse: collapse;
            color: #545F7D;
            z-index: 1;
            width: 100%;
        }
    }
`

const Loader = styled.div`
    width: 100%;
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 80px;
        height: 80px;
        color: #545F7D;
        animation: rotate 2s linear infinite;

        @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
        }
    }
`