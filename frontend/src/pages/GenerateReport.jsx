import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createInterviewReport } from '../api/services/interview.service'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'

function GenerateReport() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await createInterviewReport({
        jobDescription: data.jobDescription,
        selfDescription: data.selfDescription,
        resume: data.resume[0]
      })
      console.log("Interview report created successfully:", response);
      toast.success(response.message || "Interview report generated successfully")
      navigate(`/interview-report/${response.interviewReport._id}`)
    } catch (error) {
      toast.error(error.message || "An error occurred while generating the report")
      console.error("Error generating interview report:", error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-teal-100 flex items-center justify-center">
      <div className="bg-[#0a1628] border border-teal-900/40 rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Generate Interview Report</h2>
        <p className="text-teal-600 text-sm mb-6">
          This is where the interview report generation form will go. Users can upload their resume and input job details to get a tailored interview prep report.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <label htmlFor="resume" className="block text-sm font-medium mb-2">Upload Your Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" className="mb-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-700 file:text-teal-100 hover:file:bg-teal-600 cursor-pointer" {...register("resume", { required: true })} />
          <label htmlFor="jobDescription" className="block text-sm font-medium mb-2">Job Description</label>
          <textarea type="text" placeholder="Job Title" className="mb-4 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" {...register("jobDescription", { required: true })} />
          <label htmlFor="selfDescription" className="block text-sm font-medium mb-2">Self Description</label>
          <textarea type="text" placeholder="Tell us about yourself" className="mb-4 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm" {...register("selfDescription", { required: true })} />
          <button type="submit" className="bg-teal-700 hover:bg-teal-600 text-teal-100 text-sm px-6 py-2.5 rounded-lg transition" disabled={isLoading}>
            {isLoading ?
              <div className='flex gap-2'>
                <span>Generating report, Please wait</span>
                <Loader />
              </div>
              :
              <span>
                Upload Resume & Generate Report
              </span>
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default GenerateReport
