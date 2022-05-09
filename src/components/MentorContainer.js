import React, { useState } from 'react'
import styled from 'styled-components'
import { PopupModal } from "react-calendly";

const MentorContainer = ({mentor}) => {
    const { firstname, lastname, email, username, calendly } = mentor

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Card onClick={() => setIsOpen(true)} title={firstname || "" + lastname || ""}>
                <div className="image">
                    <img src="https://i.postimg.cc/Kzv5mC22/image.png" alt={firstname || "" + lastname || ""} />
                </div>
                <div className="body">
                    <h4>{(firstname || "") + " " + (lastname || "")}</h4>
                    <a href={`mailto://${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
                    <p className="course">{username}</p>
                </div>
            </Card>
            <PopupModal
                url={calendly}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")}
            />
        </>
    )
}

export default MentorContainer

const Card = styled.div`
    width: 246px;
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

        img {
            width: 40px;
            height: 40px;
        }
    }
    .body {
        height: 80px;
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        p, a {
            font-size: 15px;
        }
        
        a {
            color: #213F7D;
            display: block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .course {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`