import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import redis from "../config/redis.js";

/**
 * @name signup
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!(username || email || password)) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and contain at least one letter and one number" })
        }

        const userAlreadyExists = await userModel.findOne({ $or: [{ username }, { email }] })

        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists with this email or password" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        if (!newUser) {
            return res.status(400).json({ message: "User creation failed" })
        }

        const token = jwt.sign(
            {
                _id: newUser._id,
                username: newUser.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.cookie("token", token)

        return res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @name login
 * @description login a user, expects email or username and password in the request body
 * @access Public
 */
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({ message: "Identifier and password are required" })
        }

        const existingUser = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] })

        if (!existingUser) {
            return res.status(400).json({ message: "User not found with this username or email" })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

         const token = jwt.sign(
                {
                    _id: existingUser._id,
                    username: existingUser.username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            )

              res.cookie("token", token)

            return res.status(200).json({
                message: "User Logged in Successfully",
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email
                }
            })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

/**
 * @name logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
const logout = async (req, res) => {
    try {
        const token = req.cookies.token
        const decodedToken = jwt.decode(token)

        const timeToLive = decodedToken.exp - Math.floor(Date.now()/1000)

        if(timeToLive > 0){
            await redis.setex(token, timeToLive, "blacklisted")
        }

        res.clearCookie("token")

        return res.status(200).json({
            message: "User Logged out Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * @name getUser
 * @description get the current logged in user details.
 * @access private
 */
const getUser = async (req, res) => {
    try {
        const userId = req.user?._id

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                _id: user._id,
                username: user.username,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export {
    signup,
    login,
    logout,
    getUser
}