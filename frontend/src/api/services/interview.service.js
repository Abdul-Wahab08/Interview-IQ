import axiosInstance from "../axiosinstance";

export async function createInterviewReport({ jobDescription, selfDescription, resume }) {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resume', resume);
        const response = await axiosInstance.post('/interview/generate-interview-report', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating interview report:", error);
        const message = error.response.data.message || "Failed to create interview report";
        throw new Error(message);
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
        const message = error.response.data.message || "Failed to create resume PDF";
        throw new Error(message);
    }
}

export async function fetchLoggedInUserReports(userId) {
    try {
        const response = await axiosInstance.get(`/interview/user-reports/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user interview reports:", error);
        const message = error.response.data.message || "Failed to fetch user interview reports";
        throw new Error(message);
    }
}

export async function fetchInterviewReportById(interviewReportId) {
    try {
        const response = await axiosInstance.get(`/interview/fetch-interview-report/${interviewReportId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report by ID:", error);
        const message = error.response.data.message || "Failed to fetch interview report";
        throw new Error(message);
    }
}
