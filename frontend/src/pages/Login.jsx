import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { login } from '../api/services/auth.service'
import { useDispatch } from 'react-redux'
import { login as reduxLogin } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import Loader from '../components/Loader'

function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
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
      toast.error(error.message || "Login failed: An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#161b22] border border-[#1f2d3d] text-white shadow-[0_0_40px_#0d947212] rounded-lg p-8 w-3/4 sm:w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
        <div className='flex justify-center items-center flex-col text-teal-500'>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 ">Login in to your account</h2>
          <p className="text-center mb-4 text-sm text-gray-600">Don't have any account? <Link to="/signup" className=" hover:text-teal-800 ">Sign Up</Link></p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="identifier" className="block text-sm font-medium">Identifier</label>
          <input type="text" id="identifier" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your Email or Username" {...register("identifier", { required: true })} />
          {errors.identifier && <p className="text-red-500 text-sm">Identifier is required</p>}
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your password" {...register("password", { required: true })} />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          <button
            className="bg-teal-500 hover:bg-teal-600 text-teal-950 font-bold py-2 px-4 rounded focus:outline-none text-center focus:shadow-outline transition duration-200 w-full cursor-pointer "
            type="submit"
            disabled={isLoading}
          >
            {isLoading ?
            <div className='flex items-center justify-center gap-2'>
              <span>Loading...</span>
              <Loader />
              </div>
              :
              "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
