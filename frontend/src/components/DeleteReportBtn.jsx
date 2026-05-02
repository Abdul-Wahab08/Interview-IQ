import React from 'react'
import { toast } from 'react-toastify'
import { deleteInterviewReportById } from '../api/services/interview.service'
import { useNavigate } from 'react-router'

function DeleteReport({ interviewReportId }) {

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await deleteInterviewReportById(interviewReportId)
            toast.success(response.message || "Report deleted successfully")
            navigate("/")
        } catch (error) {
            toast.error("An error occurred while deleting the report")
        }
    }
    return (
        <button
            className="text-teal-100 bg-red-600 p-4 rounded-2xl hover:bg-red-500 transition-all duration-300 cursor-pointer"
            onClick={handleClick}>
            Delete Report
        </button>
    )
}

export default DeleteReport
