import React from 'react'
import styled from 'styled-components'
import { IconSpinner } from '../utils/icons'

const Loader = ({minH, iconH, iconW}) => {
  return (
    <LoaderContainer minH={minH} iconH={iconH} iconW={iconW}>
        <IconSpinner />
    </LoaderContainer>
  )
}

export default Loader


const LoaderContainer = styled.div`
    width: 100%;
    min-height: ${props => props.minH || 'max-content'};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: ${props => props.iconW || '30px'};
        height: ${props => props.iconH || '30px'};
        color: #545F7D;
        animation: rotate 2s linear infinite;

        @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
        }
    }
`