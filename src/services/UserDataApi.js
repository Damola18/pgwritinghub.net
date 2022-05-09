export const isAuthenticated = () => {
    if(localStorage.getItem('authenticated') === 'true'){
        return true
    }
    else {
        return false
    }
}

export const setAuthenticated = () => {
    localStorage.setItem('authenticated', 'true')
    return true
}

export const deAuthenticate = () => {
    localStorage.clear()
}

export const getUserProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem('user_profile'))
    return userProfile
}