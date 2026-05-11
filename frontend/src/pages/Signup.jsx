import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router'
import { signup } from '../api/services/auth.service'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'

function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
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
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md h-136 bg-[#161b22] border border-[#1f2d3d] rounded-2xl shadow-[0_0_40px_#0d947212] p-8 flex flex-col">
          <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-[#0f172a] font-bold">IQ</div>
          <span className="text-teal-100 text-lg font-semibold tracking-wide">Interview IQ</span>
        </div>

          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold text-teal-50 text-center mb-6">Create your account</h1>

            <form className="space-y-4 flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-teal-200 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#1f2d3d] rounded-md text-teal-100 placeholder-teal-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-teal-200 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#1f2d3d] rounded-md text-teal-100 placeholder-teal-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your username"
                  {...register("username", { required: true, minLength: 3 })}
                />
                {errors.username?.type === 'required' && <p className="text-red-500 text-sm mt-1">Username is required</p>}
                {errors.username?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">Username must be at least 3 characters</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-teal-200 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#1f2d3d] rounded-md text-teal-100 placeholder-teal-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
              </div>

              <button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-6"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <span>Loading...</span>
                    <Loader />
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

           <p className="mt-6 text-center text-sm text-teal-300">
                       Already have an account?{' '}
                       <Link to="/login" className="text-teal-100 hover:text-white font-semibold">
                         Sign In
                       </Link>
                       </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
