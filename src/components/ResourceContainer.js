import React, { useState } from 'react'
import styled from 'styled-components'
import { IconGoogleDocs, IconYoutubeIcon } from '../utils/icons'
import { PopupModal } from "react-calendly";

const ResourceContainer = ({resource}) => {
    const {title, link} = resource
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Card onClick={() => setIsOpen(true)} title={title}>
                <div className="image">
                    {link?.includes('docs') ?
                        <IconGoogleDocs className="docs" />
                        :
                        <IconYoutubeIcon />
                    }
                </div>
                <div className="body">
                    <p>{title || ""}</p>
                </div>
            </Card>
            <PopupModal
                url={link?.replace("https://youtu.be/", "https://www.youtube.com/embed/")}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")}
            />
        </>
    )
}

export default ResourceContainer

const Card = styled.div`
    width: 246px;
    min-width: 246px;
    height: 189px;
    border: 1px solid #DADCE0;
    border-radius: 10px;
    margin: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .image {
        width: 100%;
        height: auto;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #cccccc5a;
        border-radius: 10px 10px 0px 0px;

        svg {
            width: 40px;
            height: 40px;
            
            &.docs {
                width: 50px;
                height: 80px;
                color: dodgerblue;
            }
        }
    }
    .body {
        height: 60px;
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`