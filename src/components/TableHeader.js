import React from 'react'
import styled from 'styled-components'

const TableHeader = () => {
    return (
        <TableHeaderContainer>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Cohort</th>
                <th>Role</th>
                <th></th>
            </tr>
        </TableHeaderContainer>
    )
}

export default TableHeader

const TableHeaderContainer = styled.thead`   
    th {
        width: max-content;
        white-space: nowrap;
        position: relative;
    }

    .btn {
        background: none;
        border: none;
        outline: none;
        margin-right: 35px;
        text-transform: uppercase;
        text-align: left;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        color: #545F7D;
        padding: 20px 0px;
        cursor: pointer;

        svg {
            width: 16px;
            height: 16px;
            margin: 0px 10px;
        }
    }
`
