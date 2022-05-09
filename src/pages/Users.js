import React from 'react'
import styled from 'styled-components'
import UsersCards from '../components/UsersCards'
import Table from '../Layouts/Table'

const Users = () => {
    return (
        <UsersContainer>
            <h1 className='title'>Users</h1>
            <UsersCards />

            <Table />       
        </UsersContainer>
    )
}

export default Users


const UsersContainer = styled.div`
    padding: 60px;
    flex: 1;
    
    @media(max-width: 1000px) {
        padding: 30px;
    }

    .title {
        font-size: 24px;
        font-weight: 500;
        color: #213F7D;
    }


`