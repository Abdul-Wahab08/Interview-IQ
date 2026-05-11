import { useNavigate, Link } from "react-router"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchLoggedInUserReports } from "../api/services/interview.service"
import { toast } from "react-toastify"

function Home() {
  const [reports, setReports] = useState([])
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.isAuthenticated)
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (authStatus && userData !== null) {
      fetchLoggedInUserReports().then((data) => {
        setReports(data.interviewReports)
      })
    }
  }, [authStatus, userData])

  return (
    <div className="min-h-screen bg-[#0d1117] text-teal-100">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-teal-50 sm:text-5xl max-w-3xl">
          Build a stronger resume, prepare with confidence,
          and land your next interview faster.
        </h1>
        <p className="mt-6 text-teal-400 text-base leading-7 max-w-2xl">
          Upload your resume and job details once, then let AI generate a tailored resume update and a focused interview preparation plan that helps you make the best impression.
        </p>
        <div className="mt-10 ">
          <button
            onClick={() => navigate("/generate-report")}
            className="h-12 rounded-full bg-teal-700 px-6 text-sm font-medium text-white transition hover:bg-teal-600 cursor-pointer"
          >
            Start now
          </button>
          {/* <button
            onClick={() => navigate("/generate-report")}
            className="h-12 rounded-full border border-teal-600 bg-transparent px-6 text-sm font-medium text-teal-100 transition hover:border-teal-400 hover:text-teal-50"
          >
            Learn more
          </button> */}
        </div>
      </section>

      <div className="grid gap-4 max-w-5xl mx-auto px-6 mb-12 sm:grid-cols-3">
        {['Upload resume', 'Add job details', 'Get AI output'].map((step, i) => (
          <div key={i} className="rounded-3xl border border-teal-900/40 bg-[#0b121a] px-5 py-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition hover:border-teal-500/50 hover:bg-[#111a27]">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-950 text-sm font-semibold text-teal-200">
              {i + 1}
            </div>
            <p className="text-sm font-semibold text-teal-100">{step}</p>
          </div>
        ))}
      </div>

      {authStatus && reports.length > 0 
      ?
          <>
            <h2 className="text-2xl font-semibold mb-8 text-center">Your Interview Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-6">
              {reports.map((report) => (
                <Link
                  key={report._id}
                  className="bg-[#0a1628] border border-teal-900/40 hover:border-teal-700 rounded-2xl p-6 transition cursor-pointer"
                  to={`/interview-report/${report._id}`}
                >
                  <div className="w-9 h-9 bg-teal-950 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 stroke-teal-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h5M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <h3 className="text-teal-50 font-medium text-lg mb-2">{report.title}</h3>
                  <p className="text-teal-400 text-sm">Score: {report.matchScore}/100</p>
                  <p className="text-sm">Date: {report.createdAt.split("T")[0]}</p>
                </Link>
              ))}
            </div>
          </>
          :
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-6">
            <div className="bg-[#0a1628] border border-teal-900/40 hover:border-teal-700 rounded-2xl p-6 transition cursor-pointer"
              onClick={() => navigate("/generate-report")}>
              <div className="w-9 h-9 bg-teal-950 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 stroke-teal-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2M9 4a2 2 0 002 2h2a2 2 0 002-2M9 4a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-teal-100 font-medium text-sm mb-2">AI Resume Builder</h3>
              <p className="text-teal-600 text-xs leading-relaxed mb-4">
                Rewrites your resume to match the job description, highlighting skills and experience recruiters care about most.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Tailored content", "ATS friendly", "PDF export"].map(tag => (
                  <span key={tag} className="bg-teal-950 text-teal-400 text-xs px-2.5 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#0a1628] border border-teal-900/40 hover:border-teal-700 rounded-2xl p-6 transition cursor-pointer"
              onClick={() => navigate("/generate-report")}>
              <div className="w-9 h-9 bg-teal-950 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 stroke-teal-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h5M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-teal-100 font-medium text-sm mb-2">Interview Report</h3>
              <p className="text-teal-600 text-xs leading-relaxed mb-4">
                Get technical and behavioral questions, skill gap analysis, match score, and a day-by-day preparation plan.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Match score", "Skill gaps", "Prep plan"].map(tag => (
                  <span key={tag} className="bg-teal-950 text-teal-400 text-xs px-2.5 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default Home
