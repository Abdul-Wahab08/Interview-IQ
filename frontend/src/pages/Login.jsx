import React from 'react'
import { useForm } from "react-hook-form"
import { login } from '../api/services/auth.service'
import { useDispatch } from 'react-redux'
import { login as reduxLogin } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const result = await login({
        identifier: data.identifier,
        password: data.password
      })
      if (result) {
        dispatch(reduxLogin(result.user))
        toast.success(result.message)
        navigate("/")
      }
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(error.message || "Login failed: An unexpected error occurred")
      // if (error.response) {
      //   toast.error(`Login failed: ${error.response.data.message}`)
      // } else {
      //   toast.error("Login failed: An unexpected error occurred")
      // }
    }
  }

  return (
    // the theme is teal and dark, but the login form is white and simple for contrast
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="bg-teal-700 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0d1117]">Login</h2>
        <p className="text-center mb-4 text-lg text-gray-600">Don't have an account? <Link to="/signup" className="text-teal-500 hover:text-teal-800 font-medium">Sign Up</Link></p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Identifier</label>
          <input type="text" id="identifier" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your Email or Username" {...register("identifier", { required: true })} />
          {errors.identifier && <p className="text-red-500 text-sm">Identifier is required</p>}
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your password" {...register("password", { required: true })} />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          <button
            className="bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 w-full cursor-pointer "
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
