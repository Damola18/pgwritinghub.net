import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SendResetPasswordLink, SignInUser } from '../services/firebase'
import { isAuthenticated } from '../services/UserDataApi'
import { IconCloseCircled } from '../utils/icons'

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [form, setForm] = useState({email: "", password: ""})
    const { email, password } = form
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [perr, setPerr] = useState("")
    const [pemail, setPemail] = useState("")
    

    const RevealPassword = (e) => {
        e.preventDefault()
        setShowPass(!showPass)
    }
    
    useEffect(() => {
        if(isAuthenticated()) {
            document.location.assign('/profile')
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        setPending(true)
        if(!err) {
            SignInUser(email, password).then(data => {
                if(data){
                    if(data.includes("Error")){
                        setErr(data)
                        setPending(false)
                    } else {
                        setForm({email: "", password: ""})
                        setPending(false)
                        document.location.assign('/profile')
                    }
                } else {
                    setErr('Network Error: Try again later')
                    setPending(false)
                }
            })
        }
    }

    const handleOpenModal = (e) => {
        e.preventDefault()
        setModalOpen(true)
    }

    const HandleForgottenPassword = (e) => {
        e.preventDefault()
        setLoading(true)
        SendResetPasswordLink(pemail).then(data => {
            if(data.includes('Error')){
                setPerr(data)
            } else {
                setPerr("")
                setLoading(false)
                setPemail("")
                setModalOpen(false)
            }
        })
    }

  return (
      <>
        <Brand>
            <a href="/"><h1>PG Writing Hub</h1></a>
        </Brand>
        <LoginPage>
            <div className="illustration">
                <a href="/"><h1>PG Writing Hub</h1></a>
                <img src="https://i.postimg.cc/prnmC49d/image.png" alt="Illustration" className='board' />
            </div>
            <div className="form">
                <div>
                    <h1>Welcome!</h1>
                    <p>Enter your details to log in</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-field">
                            <input type="email" placeholder='Email' onChange={(e) => setForm({...form, email: e.target.value})} value={email} />
                        </div>
                        <div className="form-field">
                            <input type={showPass ? "text" : "password"} placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})} value={password} />
                            <button className='show_btn' onClick={RevealPassword}>
                                {!showPass ? "show" : "hide"}
                            </button>
                        </div>
                        <a href="/" onClick={handleOpenModal}>Forgot PASSWORD?</a>
                        {err && <p style={{ color: "red" }}>{err}</p>}
                        {!pending ?
                            <button className='login_btn'>Log in</button>
                            :
                            <button className='login_btn' disabled={true}>Submitting . . .</button>
                        }
                        <h4>Not yet registered? <a href="/signup">Sign up</a></h4>
                    </form>
                </div>
            </div>
        </LoginPage>

        {modalOpen &&
            <NewForumModal>
                <form onSubmit={HandleForgottenPassword}>
                    <button onClick={() => setModalOpen(false)} className="close"><IconCloseCircled /></button>
                    <h2>Forgotten Password?</h2>
                    <p>Enter your email to get a password reset link.</p>
                    <input type="email" placeholder='Email' required value={pemail} onChange={(e) => setPemail(e.target.value)} />
                    {perr && <p style={{ color: "red" }}>{perr}</p>}
                    {!loading ?
                        <button>Send Link</button>
                        :
                        <button disabled={true}>Submitting . . .</button>
                    }
                </form>
            </NewForumModal>
        }
      </>
  )
}

export default Login

const Brand = styled.div`
    padding: 50px;
    display: none;

    a {
        text-decoration: none;
        color: #39CDCC;
    }

    @media (max-width: 768px) {
        display: block;
    }
`
const LoginPage = styled.div`
    display: flex;
    min-height: 100vh;

    @media (max-width: 768px) {
        margin-left: 0px;
        flex-direction: column-reverse;
    }

    .illustration {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 97px 107px;
        
        @media (max-width: 920px) {
            padding: 97px 50px;
        }

        @media (max-width: 768px) {
            padding: 50px;
            width: 100%;
            
            h1 {
                display: none;
            }
        }

        a {
            text-decoration: none;
            color: #39CDCC;
        }

        .board {
            flex: 1;
            margin-top: 139px;
            object-fit: contain;
            max-width: 600px;
            max-height: 337.57px;
            
            @media (max-width: 768px) {
                margin-top: 0px;
            }
        }
    }

    .form {
        width: 50%;
        padding: 100px 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #FFFFFF;
        box-shadow: 0px -3px 20px #0000000A;
        
        @media (max-width: 880px) {
            padding: 50px;
        }

        @media (max-width: 768px) {
            width: 100%;
        }

        h1 {
            font-weight: 700;
            font-size: 44px;
            color: #213F7D;
        }
        p {
            font-size: 24px;
            font-weight: 400px;
            color: #545F7D;
        }
        
        form {
            margin: 50px 0px;
            width: 100%;
        }

        .form-field {
            width: 100%;
            margin-bottom: 24px;
            position: relative;
            border: solid 2px #545F7D26;
            border-radius: 5px;
            
            input {
                width: 100%;
                max-width: 447px;
                height: 50px;
                padding: 0px 15px;
                color: #000000;
                border: none;
                outline: none;
                background: none;

                ::placeholder,
                ::-webkit-input-placeholder {
                    color: #545F7D;
                }
                :-ms-input-placeholder {
                    color: #545F7D;
                }
            }

            .show_btn {
                position: absolute;
                right: 10px;
                top: 30%;
                background: none;
                border: none;
                outline: none;
                color: #39CDCC;
                cursor: pointer;
            }
        }

        h4 {
            font-weight: 500;
            margin: 15px 0px;
            font-size: 19px;
            
            a {
                font-size: 19px;
            }
        }

        a {
            color: #39CDCC;
            text-decoration: none;
            font-weight: 600px;
            font-size: 16px;
        }

        .login_btn {
            background: #39CDCC;
            color: #FFFFFF;
            width: 100%;
            border: none;
            outline: none;
            border-radius: 8px;
            height: 48px;
            margin-top: 30px;
            font-size: 18px;
            font-weight: 600;
        }
    }
`



const NewForumModal = styled.div`
    position: fixed;
    z-index: 1000000;
    background: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;


    @media (max-width: 768px) {
        width: 100%;
    }

    form {
        width: 800px;
        max-width: 80%;
        background: #FFFFFF;
        padding: 100px 30px;
        border-radius: 10px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        display: flex;
        flex-direction: column;

        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            cursor: pointer;
            border: none;
    
            svg {
                width: 30px;
                height: 30px;
                color: #000000;
            }
        }

        @media (max-width: 440px) {
            max-width: 95%;
            padding: 100px 20px;

            .close {
                top: 13px;
                right: 10px;
            }
        }

        input {
            border-radius: 20px;
            border: 1px solid #213F7D;
            padding: 10px;
            flex: 1;
            margin: 10px 0px;
        }
        
        button {
            border: 1px solid #213F7D;
            padding: 10px 15px;
            background: #213F7D;
            color: #FFFFFF;
            border-radius: 20px;
            margin: 10px 0px;
        }
    }
`