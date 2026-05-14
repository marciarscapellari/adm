'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  COMPETENCIES,
  calculateResults,
  type Competency,
  type Behavior,
} from '@/lib/assessment-data';

const SCALE_LABELS = [
  { value: 1, label: 'Nunca', color: 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200' },
  { value: 2, label: 'Raramente', color: 'bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200' },
  { value: 3, label: 'Às vezes', color: 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200' },
  { value: 4, label: 'Frequentemente', color: 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' },
  { value: 5, label: 'Sempre', color: 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' },
];

interface Step {
  competency: Competency;
  behavior: Behavior;
  compIndex: number;
  behIndex: number;
}

function buildSteps(): Step[] {
  const steps: Step[] = [];
  COMPETENCIES.forEach((comp, ci) => {
    comp.behaviors.forEach((beh, bi) => {
      steps.push({ competency: comp, behavior: beh, compIndex: ci, behIndex: bi });
    });
  });
  return steps;
}

const STEPS = buildSteps();

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [stepAnswers, setStepAnswers] = useState<Record<string, number>>({});
  const [unanswered, setUnanswered] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('assessment_user');
    if (!saved) { router.push('/'); return; }
    const { name, email, role } = JSON.parse(saved);
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
  }, [router]);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const progress = Math.round((currentStep / totalSteps) * 100);

  const totalQuestions = COMPETENCIES.flatMap((c) => c.behaviors.flatMap((b) => b.questions)).length;
  const answeredCount = Object.keys(answers).length + Object.keys(stepAnswers).length;

  function handleAnswer(questionId: string, value: number) {
    setStepAnswers((prev) => ({ ...prev, [questionId]: value }));
    setUnanswered(false);
  }

  function allCurrentAnswered() {
    return step.behavior.questions.every((q) => stepAnswers[q.id] !== undefined);
  }

  function handleNext() {
    if (!allCurrentAnswered()) {
      setUnanswered(true);
      return;
    }
    const merged = { ...answers, ...stepAnswers };
    setAnswers(merged);
    setStepAnswers({});
    setUnanswered(false);

    if (currentStep + 1 >= totalSteps) {
      const results = calculateResults(userName, userEmail, userRole, merged);
      sessionStorage.setItem('assessment_results', JSON.stringify(results));
      router.push('/results');
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handlePrev() {
    if (currentStep === 0) return;
    setStepAnswers({});
    setUnanswered(false);
    setCurrentStep((s) => s - 1);
  }

  const competencyColor = ['violet', 'purple', 'orange', 'amber', 'cyan', 'teal'][step.compIndex] || 'violet';
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-600',
    teal: 'bg-teal-600',
  };
  const badgeColorMap: Record<string, string> = {
    violet: 'bg-violet-100 text-violet-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    amber: 'bg-amber-100 text-amber-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    teal: 'bg-teal-100 text-teal-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">I</span>
          </div>
          <span className="text-slate-700 font-semibold text-sm hidden sm:block">Innovation Readiness</span>
        </div>
        <div className="flex items-center gap-3 flex-1 mx-4">
          <div className="flex-1 bg-slate-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${colorMap[competencyColor]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {answeredCount}/{totalQuestions} respondidas
          </span>
        </div>
        <div className="text-slate-500 text-xs whitespace-nowrap">
          {currentStep + 1}/{totalSteps}
        </div>
      </header>

      {/* Competency breadcrumb */}
      <div className="bg-white border-b border-slate-100 px-4 py-2">
        <div className="max-w-2xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${badgeColorMap[competencyColor]}`}
          >
            {step.competency.name}
          </span>
          <span>›</span>
          <span className="font-medium text-slate-700">{step.behavior.name}</span>
          <span className="ml-auto text-slate-400">
            Comportamento {step.behIndex + 1}/{step.competency.behaviors.length}
          </span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Behavior header */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${colorMap[competencyColor]}`}
              >
                {step.behavior.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{step.behavior.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{step.competency.description}</p>
              </div>
            </div>
          </div>

          {/* Scale legend */}
          <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
            {SCALE_LABELS.map((s) => (
              <div
                key={s.value}
                className="flex-1 min-w-0 text-center px-1 py-1.5 rounded-lg border text-xs font-medium bg-slate-50 border-slate-200 text-slate-500"
              >
                <div className="hidden sm:block">{s.label}</div>
                <div className="sm:hidden">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {step.behavior.questions.map((q, qi) => (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <p className="text-slate-700 text-sm font-medium mb-4 leading-relaxed">
                  <span className="text-slate-400 mr-2">{qi + 1}.</span>
                  {q.text}
                </p>
                <div className="flex gap-2">
                  {SCALE_LABELS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleAnswer(q.id, s.value)}
                      className={`flex-1 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                        stepAnswers[q.id] === s.value || answers[q.id] === s.value
                          ? `${s.color} border-2 scale-105 shadow-sm`
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <div className="hidden sm:block">{s.label}</div>
                      <div className="sm:hidden">{s.value}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {unanswered && (
            <p className="text-red-500 text-sm mt-3 text-center font-medium">
              Por favor, responda todas as questões antes de continuar.
            </p>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={handleNext}
              className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-colors ${colorMap[competencyColor]} hover:opacity-90`}
            >
              {currentStep + 1 >= totalSteps ? '✓ Ver Resultados' : 'Próximo →'}
            </button>
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1 mt-4 flex-wrap">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < currentStep
                    ? 'bg-violet-500'
                    : i === currentStep
                    ? 'bg-violet-700 w-4'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
