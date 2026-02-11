import { useState, useCallback } from 'react';
import {
  Play, CheckCircle2, XCircle, ChevronDown, ChevronUp,
  Lightbulb, Code2, ArrowRight, Building2, Star, RotateCcw,
  Eye, Terminal, Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Timer } from './Timer';
import type { Question } from '@/data/questions';

interface CodingEditorProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: (score: number, answer: string) => void;
  isLast: boolean;
}

interface TestResult {
  description: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  error?: string;
}

export function CodingEditor({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  isLast
}: CodingEditorProps) {
  const [code, setCode] = useState(question.starterCode || '');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selfScore, setSelfScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [_timeUp, setTimeUp] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'results'>('code');

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
  }, []);

  const normalizeOutput = (val: unknown): string => {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'string') return JSON.stringify(val);
    if (Array.isArray(val)) {
      // Sort inner arrays for comparison when dealing with group anagrams type problems
      return JSON.stringify(val);
    }
    return JSON.stringify(val);
  };

  const compareOutputs = (actual: string, expected: string): boolean => {
    // Direct comparison
    if (actual === expected) return true;

    // Try parsing both as JSON and comparing
    try {
      const actualParsed = JSON.parse(actual);
      const expectedParsed = JSON.parse(expected);

      // Handle array of arrays (like group anagrams) - compare sorted
      if (Array.isArray(actualParsed) && Array.isArray(expectedParsed)) {
        if (actualParsed.length !== expectedParsed.length) return false;

        // Check if it's array of arrays
        if (actualParsed.every(Array.isArray) && expectedParsed.every(Array.isArray)) {
          const sortArr = (arr: unknown[][]) =>
            arr.map(a => [...a].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
          return JSON.stringify(sortArr(actualParsed)) === JSON.stringify(sortArr(expectedParsed));
        }
      }

      return JSON.stringify(actualParsed) === JSON.stringify(expectedParsed);
    } catch {
      return actual.trim() === expected.trim();
    }
  };

  const runTests = useCallback(() => {
    if (!question.testCases) return;

    setIsRunning(true);
    setActiveTab('results');

    // Small delay for UX
    setTimeout(() => {
      const results: TestResult[] = [];

      for (const testCase of question.testCases!) {
        try {
          // Create a sandboxed function from user's code
          // eslint-disable-next-line no-new-func
          const userFunction = new Function(
            `${code}\nreturn ${testCase.input};`
          );

          const result = userFunction();
          const actualOutput = normalizeOutput(result);

          const passed = compareOutputs(actualOutput, testCase.expectedOutput);

          results.push({
            description: testCase.description,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: actualOutput,
            passed,
          });
        } catch (err) {
          results.push({
            description: testCase.description,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: 'Error',
            passed: false,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }

      const allTestsPassed = results.every(r => r.passed);
      setTestResults(results);
      setAllPassed(allTestsPassed);
      setHasRun(true);
      setIsRunning(false);
    }, 500);
  }, [code, question.testCases]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    const passedCount = testResults.filter(r => r.passed).length;
    const totalTests = testResults.length;
    const autoScore = totalTests > 0 ? Math.round((passedCount / totalTests) * 5) : selfScore;
    const finalScore = Math.max(autoScore, selfScore);
    onNext(finalScore, code);
  };

  const handleReset = () => {
    setCode(question.starterCode || '');
    setTestResults([]);
    setAllPassed(false);
    setHasRun(false);
    setActiveTab('code');
  };

  const difficultyColor = {
    Easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const passedCount = testResults.filter(r => r.passed).length;
  const totalTests = question.testCases?.length || 0;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-40 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Left: Question description */}
        <div className="xl:col-span-2 space-y-4">
          {/* Question card */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium border', difficultyColor[question.difficulty])}>
                {question.difficulty}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 h-3" />
                  {question.category === 'SQL' ? 'SQL' : question.category === 'Analytics' ? 'Analytics' : 'Coding'}
                </span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                <Building2 className="w-3 h-3" />
                {question.company}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-lg font-semibold text-white leading-relaxed mb-4">
              {question.question}
            </h2>

            {/* Test cases preview */}
            {question.testCases && (
              <div className="space-y-2 mb-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Examples</h3>
                {question.testCases.slice(0, 3).map((tc, i) => (
                  <div key={i} className="bg-slate-900/60 rounded-lg p-3 text-xs">
                    <div className="flex flex-col gap-1">
                      <div>
                        <span className="text-slate-500">Input: </span>
                        <code className="text-cyan-400 break-all">{tc.input}</code>
                      </div>
                      <div>
                        <span className="text-slate-500">Output: </span>
                        <code className="text-emerald-400">{tc.expectedOutput}</code>
                      </div>
                      <div className="text-slate-500 italic">{tc.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Timer */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              Time Limit: {Math.floor(question.timeLimit / 60)}:{(question.timeLimit % 60).toString().padStart(2, '0')} min
            </div>
          </div>

          {/* Expandable: Tips */}
          <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-700/30 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-amber-400">
                <Lightbulb className="w-4 h-4" />
                Hints & Tips
              </span>
              {showTips ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {showTips && (
              <div className="px-4 pb-3 space-y-1.5">
                {question.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-amber-400 mt-0.5">•</span>
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expandable: Solution - Only shown after submission */}
          {submitted && (
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-700/30 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <Eye className="w-4 h-4" />
                  View Solution Code
                </span>
                {showSolution ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {showSolution && (
                <div className="px-4 pb-3">
                  <pre className="bg-slate-900/80 rounded-lg p-3 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {question.solutionCode}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Expandable: Explanation */}
          <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-700/30 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-purple-400">
                <ArrowRight className="w-4 h-4" />
                Explanation & Follow-up
              </span>
              {showExplanation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {showExplanation && (
              <div className="px-4 pb-3 space-y-2">
                <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <p className="text-sm text-purple-300 italic">&quot;{question.followUp}&quot;</p>
                </div>
              </div>
            )}
          </div>

          {/* Timer widget */}
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Timer</h3>
            <Timer
              timeLimit={question.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={!submitted}
            />
          </div>
        </div>

        {/* Right: Code editor & results */}
        <div className="xl:col-span-3 space-y-4">
          {/* Tab bar */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700/50 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <Code2 className="w-4 h-4" />
              Code Editor
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === 'results'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <Terminal className="w-4 h-4" />
              Test Results
              {hasRun && (
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-xs font-bold',
                  allPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                )}>
                  {passedCount}/{totalTests}
                </span>
              )}
            </button>
          </div>

          {/* Code Editor */}
          {activeTab === 'code' && (
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
              {/* Editor header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-xs text-slate-500 ml-2">
                    {question.language === 'sql' ? 'query.sql' : 'solution.js'}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Editor area */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/40 flex flex-col items-center pt-4 text-xs text-slate-600 font-mono select-none">
                  {code.split('\n').map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full min-h-[400px] px-4 py-4 pl-14 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none leading-6 caret-indigo-400"
                  spellCheck={false}
                  disabled={submitted}
                  placeholder="Write your solution here..."
                />
              </div>

              {/* Editor footer */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/40 border-t border-slate-700/50">
                <span className="text-xs text-slate-500">
                {question.language === 'sql' ? 'SQL' : 'JavaScript'} • {code.split('\n').length} lines
              </span>
                <div className="flex gap-2">
                  <button
                    onClick={runTests}
                    disabled={isRunning || submitted}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Run Tests
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Test Results */}
          {activeTab === 'results' && (
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    Test Results
                  </span>
                  {hasRun && (
                    <span className={cn(
                      'text-xs font-bold px-2 py-1 rounded-lg',
                      allPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    )}>
                      {allPassed ? '✅ All Passed!' : `${passedCount}/${totalTests} Passed`}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                {!hasRun ? (
                  <div className="text-center py-12 text-slate-500">
                    <Terminal className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Run your code to see test results</p>
                    <button
                      onClick={() => { setActiveTab('code'); }}
                      className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      ← Go to Code Editor
                    </button>
                  </div>
                ) : (
                  testResults.map((result, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'rounded-xl border p-4 transition-all',
                        result.passed
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : 'bg-red-500/5 border-red-500/30'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {result.passed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              Test {idx + 1}
                            </span>
                            <span className={cn(
                              'text-xs px-1.5 py-0.5 rounded',
                              result.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            )}>
                              {result.passed ? 'PASS' : 'FAIL'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{result.description}</p>

                          <div className="space-y-1.5 text-xs font-mono">
                            <div>
                              <span className="text-slate-500">Input: </span>
                              <code className="text-cyan-400 break-all">{result.input}</code>
                            </div>
                            <div>
                              <span className="text-slate-500">Expected: </span>
                              <code className="text-emerald-400 break-all">{result.expected}</code>
                            </div>
                            <div>
                              <span className="text-slate-500">Got: </span>
                              <code className={cn(
                                'break-all',
                                result.passed ? 'text-emerald-400' : 'text-red-400'
                              )}>
                                {result.actual}
                              </code>
                            </div>
                            {result.error && (
                              <div className="mt-2 p-2 bg-red-500/10 rounded-lg">
                                <span className="text-red-400">Error: </span>
                                <span className="text-red-300">{result.error}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {hasRun && (
                <div className="px-4 py-3 bg-slate-900/40 border-t border-slate-700/50">
                  {/* Score summary bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          allPassed ? 'bg-emerald-500' : passedCount > 0 ? 'bg-amber-500' : 'bg-red-500'
                        )}
                        style={{ width: `${totalTests > 0 ? (passedCount / totalTests) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {passedCount}/{totalTests} passed
                    </span>
                  </div>
                  <button
                    onClick={() => { setActiveTab('code'); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    ← Edit Code & Re-run
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom actions */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 shadow-xl">
            {!submitted ? (
              <div className="space-y-4">
                {/* Confidence rating */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="text-sm text-slate-400">Rate your confidence:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => setSelfScore(score)}
                        className="p-1 transition-all hover:scale-110"
                      >
                        <Star
                          className={cn(
                            'w-6 h-6 transition-colors',
                            score <= selfScore
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Score preview if tests have been run */}
                {hasRun && (
                  <div className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                    allPassed
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : passedCount > 0
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  )}>
                    {allPassed ? (
                      <><CheckCircle2 className="w-4 h-4" /> All test cases passed! Great job!</>
                    ) : passedCount > 0 ? (
                      <><XCircle className="w-4 h-4" /> {passedCount}/{totalTests} test cases passed. Keep trying!</>
                    ) : (
                      <><XCircle className="w-4 h-4" /> No test cases passed yet. Check your solution.</>
                    )}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!hasRun}
                  className="w-full px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {hasRun ? 'Submit Solution' : 'Run Tests First to Submit'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                  allPassed
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                )}>
                  <CheckCircle2 className="w-4 h-4" />
                  Solution submitted! {passedCount}/{totalTests} tests passed.
                  {!allPassed && ' Check the solution code to learn the optimal approach.'}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {isLast ? 'View Results' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
