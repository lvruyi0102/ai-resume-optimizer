"use client";

import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const optimize = async () => {
    if (!resume || !jobDesc) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const keywords = jobDesc.toLowerCase().split(/\W+/).filter((w) => w.length > 4);
    const resumeLower = resume.toLowerCase();
    const matched = keywords.filter((k) => resumeLower.includes(k)).length;
    const calculatedScore = Math.min(95, Math.round((matched / Math.max(keywords.length, 1)) * 100) + 40);
    setScore(calculatedScore);
    setResult(
      `Optimized Resume Suggestion:\n\n${resume}\n\n---\nKey improvements based on job description:\n- Emphasize relevant skills matching: ${keywords.slice(0, 5).join(", ")}\n- Quantify achievements where possible\n- Tailor summary to the role\nATS Score: ${calculatedScore}/100`
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            AI Resume Optimizer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tailor your resume to any job description in seconds. Boost your ATS score.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Your Resume
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your current resume here..."
              className="w-full h-64 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Job Description
            </label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description..."
              className="w-full h-64 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={optimize}
            disabled={loading || !resume || !jobDesc}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-xl text-lg transition-colors"
          >
            {loading ? "Optimizing..." : "Optimize Resume"}
          </button>
        </div>

        {result && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Results</h2>
              <div className="text-3xl font-bold text-green-600">{score}/100</div>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-black p-4 rounded-lg overflow-auto max-h-96">
              {result}
            </pre>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>Project 2B • Built for scalable AI tools • Free MVP</p>
        </footer>
      </div>
    </div>
  );
}
