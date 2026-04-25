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
        throw error
    }
}

export async function login({ username, email, password }) {
    try {
        if (username && password) {
            const response = await axiosinstance.post('/auth/login', {
                username,
                password
            })
            return response.data
        } else if (email && password) {
            const response = await axiosinstance.post('/auth/login', {
                email,
                password
            })
            return response.data
        }


    } catch (error) {
        console.log("Error in login service:", error)
        throw error
    }
}

export async function logout() {
    try {
        const response = await axiosinstance.post('/auth/logout')

        return response.data
    } catch (error) {
        console.log("Error in logout service:", error)
        throw error
    }
}

export async function getUser() {
    try {
        const response = await axiosinstance.get('/auth/getUser')

        return response.data
    } catch (error) {
        console.log("Error in getUser service:", error)
        throw error
    }
}