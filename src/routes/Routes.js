import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Assignments from '../pages/Assignments'
import CFA from '../pages/CFA'
import Cohorts from '../pages/Cohorts'
import Forums from '../pages/Forums'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import RequestMeeting from '../pages/RequestMeeting'
import Signup from '../pages/Signup'
import SingleForum from '../pages/SingleForum'
import TutorSignup from '../pages/TutorSignup'
import Users from '../pages/Users'
import FacilitatorSignup from '../pages/FacilitatorSignup'

const PagesRoutes = () => {
    const route = document.location.pathname
    return (
        <PageContainer route={route}>
            <Routes>
                <Route path='/' element={<Home />} /> 
                <Route path='/signup' element={<Signup />} /> 
                <Route path='/signup/faculty' element={<TutorSignup />} /> 
                <Route path= '/signup/facilitator' element={<FacilitatorSignup/>} />
                <Route path='/login' element={<Login />} /> 
                <Route path='/call_for_application' element={<CFA />} /> 
                <Route path='/users' element={<Users />} /> 
                <Route path='/information' element={<Cohorts />} /> 
                <Route path='/assignments' element={<Assignments />} /> 
                <Route path='/forums' element={<Forums />} /> 
                <Route path='/forums/:id' element={<SingleForum />} /> 
                <Route path='/request_meeting' exact element={<RequestMeeting />} /> 
                <Route path='/profile' exact element={<Profile />} />
                <Route path='*' element={<Profile />} />  
            </Routes>
        </PageContainer>
    )
}

export default PagesRoutes

const PageContainer = styled.div`
    margin: 0px;
    margin-left: ${props => ['/', '/login', '/signup', '/signup/tutor', '/call_for_application'].includes(props.route)? "0px": "283px"};
    padding: 0px;

    @media (max-width: 768px) {
        margin-left: 0px;
    }
`