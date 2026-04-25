import { useNavigate } from "react-router"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0d1117] text-teal-100">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-12">
        <span className="text-xs tracking-widest text-teal-400 border border-teal-900 bg-teal-950 px-4 py-1 rounded-full mb-6">
          AI POWERED
        </span>
        <h1 className="text-4xl font-semibold text-teal-50 max-w-xl leading-tight mb-4">
          Land your dream job with a smarter resume
        </h1>
        <p className="text-teal-600 text-sm max-w-md leading-relaxed mb-8">
          Upload your resume, describe the role — get an AI-tailored resume
          and a full interview prep report instantly.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/generate-resume")}
            className="bg-teal-700 hover:bg-teal-600 text-teal-100 text-sm px-6 py-2.5 rounded-lg transition"
          >
            Generate Resume
          </button>
          <button
            onClick={() => navigate("/interview-report")}
            className="border border-teal-800 hover:border-teal-600 text-teal-400 hover:text-teal-200 text-sm px-6 py-2.5 rounded-lg transition"
          >
            Interview Report
          </button>
        </div>
      </section>

      {/* Steps */}
      <div className="flex justify-center items-center gap-0 max-w-lg mx-auto px-6 mb-12">
        {["Upload resume", "Add job details", "Get AI output"].map((step, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1 text-center">
              <div className="w-7 h-7 rounded-full bg-teal-950 border border-teal-800 text-teal-400 text-xs flex items-center justify-center mb-2">
                {i + 1}
              </div>
              <p className="text-teal-600 text-xs">{step}</p>
            </div>
            {i < 2 && <div className="h-px bg-teal-900 flex-1 mb-4" />}
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-6">
        <div className="bg-[#0a1628] border border-teal-900/40 hover:border-teal-700 rounded-2xl p-6 transition cursor-pointer"
          onClick={() => navigate("/generate-resume")}>
          <div className="w-9 h-9 bg-teal-950 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5 stroke-teal-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2M9 4a2 2 0 002 2h2a2 2 0 002-2M9 4a2 2 0 012-2h2a2 2 0 012 2"/>
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
          onClick={() => navigate("/interview-report")}>
          <div className="w-9 h-9 bg-teal-950 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-5 h-5 stroke-teal-400" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h5M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
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
    </div>
  )
}

export default Home
