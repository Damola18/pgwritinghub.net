import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SignUpUser, ValidateEmail, ValidateUsername } from '../services/firebase'
import { isAuthenticated } from '../services/UserDataApi'

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [showRePass, setShowRePass] = useState(false)
    const [iemail, setIEmail] = useState(false)
    const [ipassword, setIPassword] = useState(false)
    const [iusername, setIUsername] = useState(false)
    const [err, setErr] = useState("")
    const [pending, setPending] = useState(false)
    const [form, setForm] = useState({username: "", email: "", password: "", rePassword: ""})
    const { username, email, password, rePassword} = form

    useEffect(() => {
        if(isAuthenticated()) {
            document.location.assign('/profile')
        }
    }, [])

    const RevealPassword = (e) => {
        e.preventDefault()
        setShowPass(!showPass)
    }
    const RevealRePassword = (e) => {
        e.preventDefault()
        setShowRePass(!showRePass)
    }
    const handleSignup = (e) => {
        e.preventDefault()
        setPending(true)
        if(!err) {
            SignUpUser(username, email, password, "student").then(data => {
                if(data){
                    if(data.includes("Error")){
                        setErr(data)
                        setPending(false)
                    } else {
                        setForm({username: "", email: "", password: "", rePassword: ""})
                        document.location.assign('/profile')
                        setPending(false)
                    }
                } else {
                    setErr('Network Error: Try again later')
                    setPending(false)
                }
            })
        }
    }
    
    const HandleCheckUsername = (e) => {
        const username = e.target.value
        ValidateUsername(username).then(data => {
            if (data) {
                setErr("Username taken!")
                setIUsername(true)
            }
            else {
                setErr("")
                setIUsername(false)
            }
        })
    }
    const HandleCheckEmail = (e) => {
        const email = e.target.value
        ValidateEmail(email).then(data => {
            if (data) {
                setErr("Email already registered!")
                setIEmail(true)
            }
            else {
                setErr("")
                setIEmail(false)
            }
        })
    }
    
    const HandleCheckPasswords = () => {
        if(password !== rePassword) {
            setErr("Password mismatch!")
            setIPassword(true)
        }
        else {
            setErr("")
            setIPassword(false)
        }
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
                    <p>Enter your details to sign up.</p>
                    <form onSubmit={handleSignup}>
                        <div className="form-field">
                            <input type="text" placeholder='Username' onChange={(e) => setForm({...form, username: e.target.value})} onKeyUp={HandleCheckUsername} value={username} style={{ border: `solid 2px ${iusername? "red": "transparent"}` }} />
                        </div>
                        <div className="form-field">
                            <input type="email" placeholder='Email' onChange={(e) => setForm({...form, email: e.target.value})} onKeyUp={HandleCheckEmail} value={email} style={{ border: `solid 2px ${iemail? "red": "transparent"}` }} />
                        </div>
                        <div className="form-field">
                            <input type={showPass ? "text" : "password"} placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})} value={password} />
                            <button className='show_btn' onClick={RevealPassword}>
                                {!showPass ? "show" : "hide"}
                            </button>
                        </div>
                        <div className="form-field">
                            <input type={showRePass ? "text" : "password"} onChange={(e) => setForm({...form, rePassword: e.target.value})} value={rePassword} onKeyUp={HandleCheckPasswords} style={{ border: `solid 2px ${ipassword? "red": "transparent"}` }} placeholder='Confirm Password' />
                            <button className='show_btn' onClick={RevealRePassword}>
                                {!showRePass ? "show" : "hide"}
                            </button>
                        </div>
                        {err && <p style={{ color: "red" }}>{err}</p>}
                        {!pending ?
                            <button className='login_btn'>Sign up</button>
                            :
                            <button className='login_btn' disabled={true}>Submitting . . .</button>
                        }
                        <h4>Already registered? <a href="/login">Log in</a></h4>
                    </form>
                </div>
            </div>
        </LoginPage>
      </>
  )
}

export default Signup

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
        padding: 150px 100px;
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
            margin: 60px 0px;
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