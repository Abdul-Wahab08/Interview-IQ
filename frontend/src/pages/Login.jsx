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
    <div className="relative min-h-screen bg-[#0d1117] overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.08) 1px, transparent 1px), radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10">
         <div className="w-full max-w-md bg-[#161b22] border border-[#1f2d3d] rounded-2xl shadow-[0_0_40px_#0d947212] p-8 flex flex-col">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-[#0f172a] font-bold">IQ</div>
          <span className="text-teal-100 text-lg font-semibold tracking-wide">Interview IQ</span>
        </div>

       
          <h1 className="text-2xl font-bold text-teal-50 text-center mb-6">Sign in to your account</h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-200 mb-1">
                Identifier <span className="text-red-500">*</span>
              </label>
              <input
                type="identifier"
                id="identifier"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#1f2d3d] rounded-md text-teal-100 placeholder-teal-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                {...register("identifier", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email or Password is required</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-200 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#1f2d3d] rounded-md text-teal-100 placeholder-teal-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-teal-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-[#1f2d3d] bg-[#0d1117] text-teal-500 focus:ring-teal-500"
                  {...register("remember", {})}
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Loading...</span>
                  <Loader />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-teal-300">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-teal-100 hover:text-white font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
