import axiosInstance from "../axiosinstance";

export async function createInterviewReport({ jobDescription, selfDescription, resumeFile }) {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resumeFile', resumeFile);
        const response = await axiosInstance.post('/interview/generate-interview-report', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating interview report:", error);
        throw new Error("Failed to create interview report");
    }
}

export async function createResumePdf(interviewReportId) {
    try {
        const response = await axiosInstance.post(`/interview/generate-resume-pdf/${interviewReportId}`, null, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error("Error creating resume PDF:", error);
        throw new Error("Failed to create resume PDF");
    }
}

export async function fetchLoggedInUserReports(userId) {
    try {
        const response = await axiosInstance.get(`/interview/user-reports/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user interview reports:", error);
        throw new Error("Failed to fetch user interview reports");
    }
}

export async function fetchInterviewReportById(interviewReportId) {
    try {
        const response = await axiosInstance.get(`/interview/fetch-interview-report/${interviewReportId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report by ID:", error);
        throw new Error("Failed to fetch interview report by ID");
    }
}
