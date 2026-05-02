import React from 'react'
import { toast } from 'react-toastify';
import { createResumePdf } from '../api/services/interview.service';
import { useState } from 'react';
import Loader from './Loader';

function ResumePdf({ interviewReportId }) {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = async () => {
        setIsLoading(true)
        try {
            const blob = await createResumePdf(interviewReportId)

            const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume-${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Resume PDF downloaded!");
        } catch (error) {
            toast.error("Failed to create resume PDF");
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <button
            className={`text-teal-500 border border-teal-500 hover:bg-teal-900 cursor-pointer hover:text-teal-200 text-sm px-4 py-4 rounded-lg transition font-semibold duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ?
                <div className='flex flex-row gap-1'>
                    <span className="mr-2">Downloading...</span>
                    <Loader />
                </div>
                :
                <p>Download Resume PDF</p>}
        </button>
    )
}

export default ResumePdf
