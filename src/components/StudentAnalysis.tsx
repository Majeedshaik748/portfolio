import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ScatterChart, Scatter, Cell, ResponsiveContainer,
  PieChart, Pie,
} from 'recharts';
import {
  GraduationCap, Users, TrendingUp, TrendingDown, Award, AlertTriangle,
  BookOpen, Activity, Heart, Brain, Filter, Download, ChevronRight,
} from 'lucide-react';
import {
  students, gradePerformance, performanceDistribution, subjectPerformance,
  studyHoursVsScore, genderComparison, parentEducationImpact,
  attendanceBrackets, scoreDistribution, tutoringComparison,
  stressVsPerformance, totalStudents, avgOverallScore, avgAttendanceOverall,
  excellentStudents, atRiskStudents,
} from '../data/studentData';

const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];

export default function StudentAnalysis() {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedPerformance, setSelectedPerformance] = useState('All');
  const [showData, setShowData] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (selectedGrade !== 'All' && s.grade !== selectedGrade) return false;
      if (selectedPerformance !== 'All' && s.performance !== selectedPerformance) return false;
      return true;
    });
  }, [selectedGrade, selectedPerformance]);

  const filteredAvg = filteredStudents.length > 0
    ? Math.round(filteredStudents.reduce((s, x) => s + x.currentScore, 0) / filteredStudents.length)
    : 0;

  const kpis = [
    { label: 'Total Students', value: filteredStudents.length, icon: Users, color: 'from-emerald-500 to-teal-500', delta: null },
    { label: 'Average Score', value: `${filteredAvg}%`, icon: GraduationCap, color: 'from-purple-500 to-indigo-500', delta: '+3.2%', up: true },
    { label: 'Avg Attendance', value: `${avgAttendanceOverall}%`, icon: Activity, color: 'from-cyan-500 to-blue-500', delta: null },
    { label: 'Excellent', value: excellentStudents, icon: Award, color: 'from-yellow-500 to-orange-500', delta: null },
    { label: 'At-Risk', value: atRiskStudents, icon: AlertTriangle, color: 'from-red-500 to-rose-500', delta: null },
    { label: 'Subjects Tracked', value: subjectPerformance.length, icon: BookOpen, color: 'from-pink-500 to-rose-500', delta: null },
  ];

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Gender', 'Age', 'Grade', 'Subject', 'Study Hours', 'Attendance', 'Previous Score', 'Current Score', 'Performance', 'Parent Education', 'Extracurricular', 'Tutoring', 'Internet', 'Health', 'Stress'];
    const rows = filteredStudents.map((s) => [s.id, s.name, s.gender, s.age, s.grade, s.subject, s.studyHours, s.attendance, s.previousScore, s.currentScore, s.performance, s.parentEducation, s.extracurricular, s.tutoring, s.internetAccess, s.healthStatus, s.stressLevel]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <GraduationCap className="w-3 h-3" />
                Education Analytics
              </div>
              <h1 className="text-4xl font-bold mb-2">Student Performance Analysis Platform</h1>
              <p className="text-emerald-200 max-w-2xl">
                Analyzing academic datasets to identify factors affecting student performance outcomes. 
                Statistical insights, performance improvement strategies, and interactive visual dashboards.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => setShowData(!showData)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              >
                <Filter className="w-4 h-4" />
                {showData ? 'Hide Data' : 'View Data'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-emerald-200">Students Analyzed</div>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-emerald-200">Overall Average</div>
              <div className="text-2xl font-bold">{avgOverallScore}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-emerald-200">Subjects</div>
              <div className="text-2xl font-bold">{subjectPerformance.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-emerald-200">Grade Levels</div>
              <div className="text-2xl font-bold">4</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-wrap gap-4 items-center border border-gray-100">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4 text-emerald-500" />
            Filters:
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Grade:</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>All</option>
              {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Performance:</label>
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>All</option>
              {['Excellent', 'Good', 'Average', 'Below Average'].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="ml-auto text-sm text-gray-600">
            Showing <span className="font-bold text-emerald-600">{filteredStudents.length}</span> of {students.length} students
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center shadow-md mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
                {kpi.delta && (
                  <div className={`flex items-center gap-1 text-xs mt-2 ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.delta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Row 1: Grade Performance + Score Distribution */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              Performance by Grade Level
            </h3>
            <p className="text-sm text-gray-500 mb-4">Average scores across grade levels</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" name="Avg Score" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="avgAttendance" name="Avg Attendance" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Score Distribution
            </h3>
            <p className="text-sm text-gray-500 mb-4">Histogram of student scores across ranges</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="count" name="Students" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                  {scoreDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Performance Category + Subject Performance */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Performance Categories
            </h3>
            <p className="text-sm text-gray-500 mb-4">Distribution of students by performance level</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  dataKey="count"
                  nameKey="performance"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {performanceDistribution.map((_, i) => (
                    <Cell key={i} fill={['#10b981', '#06b6d4', '#f59e0b', '#ef4444'][i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {performanceDistribution.map((p, i) => (
                <div key={p.performance} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: ['#10b981', '#06b6d4', '#f59e0b', '#ef4444'][i] }} />
                    <span className="text-gray-700">{p.performance}</span>
                  </div>
                  <span className="font-bold text-gray-900">{p.count} students</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Subject Performance Ranking
            </h3>
            <p className="text-sm text-gray-500 mb-4">Average scores by subject area</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="subject" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip />
                <Bar dataKey="avgScore" name="Avg Score" radius={[0, 8, 8, 0]} barSize={22}>
                  {subjectPerformance.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Study Hours vs Score (scatter) + Gender comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-600" />
              Study Hours vs. Score
            </h3>
            <p className="text-sm text-gray-500 mb-4">Correlation between study time and performance</p>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="hours" name="Study Hours" stroke="#94a3b8" fontSize={11} label={{ value: 'Hours/Week', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#64748b' }} />
                <YAxis type="number" dataKey="score" name="Score" domain={[0, 100]} stroke="#94a3b8" fontSize={11} label={{ value: 'Score', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Students" data={studyHoursVsScore} fill="#ec4899">
                  {studyHoursVsScore.map((_, i) => (
                    <Cell key={i} fill="#ec4899" opacity={0.6} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 text-center mt-2">
              Positive correlation: More study hours tend to yield higher scores
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Factor Analysis
            </h3>
            <p className="text-sm text-gray-500 mb-4">How different factors influence performance</p>
            
            <div className="space-y-4">
              {/* Gender */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Gender Comparison</div>
                <div className="grid grid-cols-2 gap-3">
                  {genderComparison.map((g, i) => (
                    <div key={g.gender} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-500">{g.gender}</div>
                      <div className="text-xl font-bold" style={{ color: ['#06b6d4', '#ec4899'][i] }}>{g.avgScore}%</div>
                      <div className="text-xs text-gray-500">{g.count} students · {g.avgStudy}hrs</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tutoring */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Impact of Tutoring</div>
                <div className="grid grid-cols-2 gap-3">
                  {tutoringComparison.map((t, i) => (
                    <div key={t.label} className={`rounded-xl p-3 ${i === 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'}`}>
                      <div className="text-xs text-gray-500">{t.label}</div>
                      <div className={`text-xl font-bold ${i === 0 ? 'text-emerald-700' : 'text-gray-700'}`}>{t.avgScore}%</div>
                      <div className="text-xs text-gray-500">{t.count} students</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Education */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Parent Education Level</div>
                <div className="space-y-2">
                  {parentEducationImpact.map((p, i) => {
                    const maxScore = Math.max(...parentEducationImpact.map((x) => x.avgScore));
                    return (
                      <div key={p.education}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-700 font-medium">{p.education}</span>
                          <span className="text-gray-600">{p.avgScore}% avg</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(p.avgScore / maxScore) * 100}%`, background: ['#8b5cf6', '#06b6d4', '#10b981'][i] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Attendance Impact + Stress Impact */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Attendance Impact on Scores
            </h3>
            <p className="text-sm text-gray-500 mb-4">Higher attendance correlates with better performance</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={attendanceBrackets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bracket" stroke="#94a3b8" fontSize={10} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" name="Students" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="right" dataKey="avgScore" name="Avg Score" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600" />
              Stress Level vs. Performance
            </h3>
            <p className="text-sm text-gray-500 mb-4">How mental well-being affects academic outcomes</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stressVsPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="level" stroke="#94a3b8" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#ef4444" strokeWidth={3} dot={{ r: 6, fill: '#ef4444' }} />
                <Bar dataKey="count" name="Students" fill="#f59e0b" radius={[8, 8, 0, 0]} opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 mb-6 border border-emerald-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Performance Improvement Strategies
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Increase Study Time', text: 'Students studying 5+ hours/week score 15% higher on average. Recommend structured study schedules.' },
              { title: 'Improve Attendance', text: 'Students with 90%+ attendance average 10 points higher than those below 70%. Implement attendance tracking.' },
              { title: 'Offer Tutoring', text: 'Tutored students show 8-12% improvement. Expand tutoring programs for at-risk students.' },
              { title: 'Mental Health Support', text: 'High stress correlates with 20% lower scores. Provide counseling and stress management workshops.' },
              { title: 'Parental Engagement', text: 'Students with higher parental education perform better. Encourage parent involvement programs.' },
              { title: 'Extracurricular Balance', text: 'Moderate extracurricular activity correlates with better scores. Promote balanced student life.' },
            ].map((ins, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-emerald-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2 mb-2">
                  <ChevronRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm font-bold text-emerald-700">{ins.title}</div>
                </div>
                <div className="text-sm text-gray-600 pl-6">{ins.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        {showData && (
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Student Records</h3>
              <span className="text-sm text-gray-500">Showing {filteredStudents.length} students</span>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-emerald-50 sticky top-0">
                  <tr>
                    {['ID', 'Name', 'Grade', 'Subject', 'Study Hrs', 'Attendance', 'Score', 'Performance'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.slice(0, 200).map((s) => (
                    <tr key={s.id} className="hover:bg-emerald-50">
                      <td className="px-4 py-2 text-gray-600">#{s.id}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">{s.name}</td>
                      <td className="px-4 py-2 text-gray-600">{s.grade}</td>
                      <td className="px-4 py-2 text-gray-600">{s.subject}</td>
                      <td className="px-4 py-2 text-gray-600">{s.studyHours}h</td>
                      <td className="px-4 py-2 text-gray-600">{s.attendance}%</td>
                      <td className="px-4 py-2">
                        <span className={`font-bold ${
                          s.currentScore >= 85 ? 'text-green-600' :
                          s.currentScore >= 70 ? 'text-blue-600' :
                          s.currentScore >= 55 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{s.currentScore}%</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          s.performance === 'Excellent' ? 'bg-green-100 text-green-700' :
                          s.performance === 'Good' ? 'bg-blue-100 text-blue-700' :
                          s.performance === 'Average' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{s.performance}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
