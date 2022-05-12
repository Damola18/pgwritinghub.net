import { useRef } from "react";
import styled from 'styled-components'

const AccordionItem = ({ data, active, onToggle }) => {
  const { header, image, profile } = data;

  const contentEl = useRef();

  return (
    <Container>
        <ul className="accordion">
            <li className={`accordion_item ${active ? "active" : ""}`}>
                <button className="button" onClick={onToggle}>
                    {header}
                    <span className="control">{active ? "—" : "+"} </span>
                </button>

                <div
                    ref={contentEl}
                    className="profile_wrapper"
                    style={
                    active
                        ? { height: contentEl.current.scrollHeight }
                        : { height: "0px" }
                    }
                >
                    <div className="img">
                    <div className="image">{image}</div>
                    <div className="profile">{profile}</div>
                    </div>
                </div>
            </li>
        </ul>

    </Container>
  );
};

export default AccordionItem;

const Container = styled.div`
    button {
        font-size: 16px;
        background-color: #6A7EA7;
        color: #fff;
        text-align: left;
        font-weight: 700;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 18px 8px;
        cursor: pointer;
        border: none;
    }

    .accordion {
        
        list-style: none;
    }

    .control{
        position:relative;
        right:18px;
    }
    ul{
        display: block;
        margin-block-start: 0em;
        margin-block-end: none;
        margin-inline-start: -40px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
    }
    .accordion_item {
        border-top: 1px solid #9f9f9f;
    }

    .accordion_item.active .button {
        background-color: #6A7EA7;
    }

    .profile_wrapper {
        height: 0;
        overflow: hidden;
        transition: height ease 0.2s;
    }
    .profile{
        padding:10px;
    }

    .image {
        padding-top:5px;
        padding-bottom:10px
        height:271px;
        width:4500px;
        max-width: 100%;
        object-fit: contain;
    }

    .img {
        margin: 20px 0px;
        padding: 20px 0px;
        display: flex;
        align-items: center;

        img {
            width: 300px;
            margin: 10px;
            max-width: 90%;
            object-fit: contain;
        }

        @media (max-width: 995px) {
            flex-direction: column;
            align-items: center;
        }

        
    }
`