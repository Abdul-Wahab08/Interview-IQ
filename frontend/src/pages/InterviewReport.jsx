import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchInterviewReportById } from '../api/services/interview.service'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { MatchScoreCircle } from '../components/interviewReportComponents/MatchScoreCircle'
import { SkillGapCard } from '../components/interviewReportComponents/SkillGapCard'
import { QuestionCard } from '../components/interviewReportComponents/QuestionCard'
import { PreparationDayCard } from '../components/interviewReportComponents/PreparationDayCard'
import { SectionCard } from '../components/interviewReportComponents/SectionCard'

function InterviewReport() {
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState({})
  const [activeTab, setActiveTab] = useState('overview')
  const params = useParams()
  const reportId = params.reportId

  useEffect(() => {
    setIsLoading(true)
    fetchInterviewReportById(reportId).then((data) => {
      if (data) {
        setReport(data.interviewReport)
      }
    }).catch((error) => {
      toast.error(error.message || "An error occurred while fetching the report")
    }).finally(() => {
      setIsLoading(false)
    })
  }, [reportId])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'technical', label: 'Technical Questions', icon: '💻' },
    { id: 'behavioral', label: 'Behavioral Questions', icon: '🎯' },
    { id: 'skillGaps', label: 'Skill Gaps', icon: '⚠️' },
    { id: 'preparation', label: 'Preparation Plan', icon: '📅' },
  ]

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (isLoading) {
    return <div className='flex justify-center items-center my-20'>
      <Loader />
    </div>
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">

      <div className="bg-linear-to-r from-[#0a1628] to-[#0d1117] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {report.title || 'Interview Report'}
              </h1>
              <p className="text-gray-400">Comprehensive interview preparation guide</p>
            </div>
            <div className="flex items-center gap-6">
              <MatchScoreCircle score={report.matchScore || 0} />
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Match Score</p>
                <p className="text-xs text-gray-500">Based on your profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a1628] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-2 py-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'technical' && report.technicalQuestions?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                    {report.technicalQuestions.length}
                  </span>
                )}
                {tab.id === 'behavioral' && report.behavioralQuestions?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                    {report.behavioralQuestions.length}
                  </span>
                )}
                {tab.id === 'skillGaps' && report.skillGaps?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                    {report.skillGaps.length}
                  </span>
                )}
                {tab.id === 'preparation' && report.preparationPlan?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                    {report.preparationPlan.length} days
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0a1628] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📈</span> Quick Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-teal-400">{report.technicalQuestions?.length || 0}</p>
                  <p className="text-sm text-gray-400">Technical Questions</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-400">{report.behavioralQuestions?.length || 0}</p>
                  <p className="text-sm text-gray-400">Behavioral Questions</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-400">{report.skillGaps?.length || 0}</p>
                  <p className="text-sm text-gray-400">Skill Gaps</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-400">{report.preparationPlan?.length || 0}</p>
                  <p className="text-sm text-gray-400">Preparation Days</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a1628] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>⚠️</span> Priority Skill Gaps
              </h3>
              <div className="space-y-3">
                {report.skillGaps?.map((skillGap, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-200">{skillGap.skill}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(skillGap.severity)}`}>
                      {skillGap.severity}
                    </span>
                  </div>
                ))}
                {(!report.skillGaps || report.skillGaps.length === 0) && (
                  <p className="text-gray-400 text-center py-4">No skill gaps identified</p>
                )}
              </div>
            </div>

            <div className="bg-[#0a1628] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>💻</span> Sample Technical Question
              </h3>
              {report.technicalQuestions?.[0] && (
                <div className="space-y-3">
                  <p className="text-lg font-medium text-teal-300">{report.technicalQuestions[0].question}</p>
                  <p className="text-gray-400 text-sm">{report.technicalQuestions[0].intention}</p>
                </div>
              )}
              {(!report.technicalQuestions || report.technicalQuestions.length === 0) && (
                <p className="text-gray-400 text-center py-4">No technical questions available</p>
              )}
            </div>

            <div className="bg-[#0a1628] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🎯</span> Sample Behavioral Question
              </h3>
              {report.behavioralQuestions?.[0] && (
                <div className="space-y-3">
                  <p className="text-lg font-medium text-purple-300">{report.behavioralQuestions[0].question}</p>
                  <p className="text-gray-400 text-sm">{report.behavioralQuestions[0].intention}</p>
                </div>
              )}
              {(!report.behavioralQuestions || report.behavioralQuestions.length === 0) && (
                <p className="text-gray-400 text-center py-4">No behavioral questions available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span>💻</span> Technical Questions
              <span className="text-sm font-normal text-gray-400">({report.technicalQuestions?.length || 0})</span>
            </h2>
            {report.technicalQuestions?.map((question, index) => (
              <QuestionCard key={index} question={question} index={index} />
            ))}
            {(!report.technicalQuestions || report.technicalQuestions.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No technical questions available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'behavioral' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span>🎯</span> Behavioral Questions
              <span className="text-sm font-normal text-gray-400">({report.behavioralQuestions?.length || 0})</span>
            </h2>
            {report.behavioralQuestions?.map((question, index) => (
              <QuestionCard key={index} question={question} index={index} />
            ))}
            {(!report.behavioralQuestions || report.behavioralQuestions.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No behavioral questions available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skillGaps' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span>⚠️</span> Skill Gaps
              <span className="text-sm font-normal text-gray-400">({report.skillGaps?.length || 0})</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {report.skillGaps?.map((skillGap, index) => (
                <SkillGapCard key={index} skillGap={skillGap} />
              ))}
            </div>
            {(!report.skillGaps || report.skillGaps.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No skill gaps identified</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span>📅</span> Preparation Plan
              <span className="text-sm font-normal text-gray-400">({report.preparationPlan?.length || 0} days)</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {report.preparationPlan?.map((day, index) => (
                <PreparationDayCard key={index} day={day} index={index} />
              ))}
            </div>
            {(!report.preparationPlan || report.preparationPlan.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No preparation plan available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewReport
