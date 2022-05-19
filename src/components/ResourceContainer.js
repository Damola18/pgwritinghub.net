import React from 'react'
import styled from 'styled-components'

const ResourceContainer = ({resource}) => {
    const {title, link} = resource
    return (
        <>

            <Card title={title}>
                <div className="image">
                    {link?.substring(link.lastIndexOf('.') + 1) === "doc" || "pdf" || "" ?
                        <img src="https://res.cloudinary.com/dutcp8qkx/image/upload/v1652362297/link_mswv1k.png" alt="link_icon"/>
                        : <></>
                    }
                </div>
                <div className="body">
                    
                    <h6>
                        <a href={link} alt="values" target="_blank" rel="noreferrer" className='link'>{title || ""}</a>
                    </h6>
                    {/* <div class="link">
                        <a href={link} alt="values" target="_blank" rel="noreferrer">See content</a>
                    </div> */}
                    
                </div>
                
            </Card>


        </>
    )
}

export default ResourceContainer

const Card = styled.div`
    width: 246px;
    min-width: 246px;
    height:200px;
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
            white-space: nowrap;
            position:relative;
            bottom:30px
            text-overflow: ellipsis;
        }

        .link{
            position:relative;
            margin-top:35px
            margin-right:45px
        }
        a{
            display: block;
            height: 100%;
            width: 100%;
            text-decoration: none;
        }
        .link{
            color: #213f7d;
        }
    }
`