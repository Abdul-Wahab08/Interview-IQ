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
        const response = await axiosInstance.post(`/interview/generate-resume-pdf/${interviewReportId}`, {}, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error("Error creating resume PDF:", error);
    }
}

export async function fetchLoggedInUserReports() {

    const response = await axiosInstance.get(`/interview/fetch-user-interview-reports`);
    return response.data;

}

export async function fetchInterviewReportById(interviewReportId) {

    const response = await axiosInstance.get(`/interview/fetch-interview-report/${interviewReportId}`);
    return response.data;
}

export async function deleteInterviewReportById(interviewReportId) {
    const response = await axiosInstance.delete(`/interview/delete-interview-report/${interviewReportId}`);
    return response.data;
}
