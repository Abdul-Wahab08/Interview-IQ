import React from 'react'
import { logout } from '../api/services/auth.service'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logout as reduxLogout } from '../features/auth/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await logout()
            dispatch(reduxLogout())
            toast.success("Logout successful")
        } catch (error) {
            toast.error(error.message || "Logout failed: An unexpected error occurred")
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="text-teal-500 hover:text-teal-200 text-sm transition"
        >
            Logout
        </button>
    )
}

export default LogoutBtn
