import axiosinstance from '../axiosinstance';

export async function signup({ username, email, password }) {
    try {
        const response = await axiosinstance.post('/auth/signup', {
            username,
            email,
            password
        })

        return response.data
    } catch (error) {
        console.log("Error in signup service:", error)
        const message = error?.response?.data?.message || "Signup failed: An unexpected error occurred"
        throw new Error(message)
    }
}

export async function login({ identifier, password }) {
    try {
        const response = await axiosinstance.post('/auth/login', {
            identifier,
            password
        })
        console.log("Login response:", response.data)
        return response.data

    } catch (error) {
        console.log("Error in login service:", error)
        const message = error?.response?.data?.message || "Login failed: An unexpected error occurred"
        throw new Error(message)
    }
}

export async function logout() {
    try {
        const response = await axiosinstance.post('/auth/logout')

        return response.data
    } catch (error) {
        console.log("Error in logout service:", error)
        const message = error?.response?.data?.message || "Logout failed: An unexpected error occurred"
        throw new Error(message)
    }
}

export async function getUser() {
    try {
        const response = await axiosinstance.get('/auth/get-user')

        return response.data
    } catch (error) {
        console.log("Error in getUser service:", error)
        const message = error?.response?.data?.message || "Failed to get user data: An unexpected error occurred"
        throw new Error(message)
    }
}