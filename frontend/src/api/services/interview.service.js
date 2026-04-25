import axiosInstance from "../axiosinstance";

export async function createInterviewReport({jobDescription, selfDescription, resumeFile}) {
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

export async function createResumePdf({jobDescription, selfDescription, resumeFile}) {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resumeFile', resumeFile);
        const response = await axiosInstance.post('/interview/generate-resume-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating resume PDF:", error);
        throw new Error("Failed to create resume PDF");
    }
}
