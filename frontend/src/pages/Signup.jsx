import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router'
import { signup } from '../api/services/auth.service'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const result = await signup({
        username: data.username,
        email: data.email,
        password: data.password
      })
      if (result.user) {
        dispatch(login(result.user))
        toast.success(result.message)
        navigate("/")
      }
    } catch (error) {
      toast.error(error.message || "Signup failed: An unexpected error occurred")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#161b22] border border-[#1f2d3d] text-white shadow-[0_0_40px_#0d947212] rounded-lg p-8 w-3/4 sm:w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
        <div className='flex justify-center items-center flex-col text-teal-500'>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 ">Join us and start building your resume</h2>
          <p className="text-center mb-4 text-sm text-gray-600">Already have an account? <Link to="/login" className=" hover:text-teal-800 ">Login</Link></p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input type="text" id="username" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your username" {...register("username", { required: true })} />
          {errors.username && <p className="text-red-500 text-sm">Username is required</p>}

          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="text" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your email" {...register("email", { required: true })} />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your password" {...register("password", { required: true })} />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          <button
            className="bg-teal-500 hover:bg-teal-600 text-teal-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 w-full cursor-pointer "
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
