import axiosinstance from '../axiosInstance';

export async function signup({ username, email, password }) {
    try {
        const response = await axiosinstance.post('/auth/signup', {
            username,
            email,
            password
        })

        return response.data
    } catch (error) {
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
        return response.data

    } catch (error) {
        const message = error?.response?.data?.message || "Login failed: An unexpected error occurred"
        throw new Error(message)
    }
}

export async function logout() {
    try {
        const response = await axiosinstance.post('/auth/logout')

        return response.data
    } catch (error) {
        const message = error?.response?.data?.message || "Logout failed: An unexpected error occurred"
        throw new Error(message)
    }
}

export async function getUser() {

    const response = await axiosinstance.get('/auth/get-user')
    return response.data
}