import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
    }, [authStatus, authentication, navigate])

    return <>{children}</>
}

export default AuthLayout
