'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  COMPETENCIES,
  LEADER_PROFILES,
  getDominanceLevel,
  DOMINANCE_RULES,
  type AssessmentResults,
} from '@/lib/assessment-data';

const RadarChart = dynamic(() => import('@/components/RadarChart'), { ssr: false });

function ScoreBar({ score, color = 'violet' }: { score: number; color?: string }) {
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
    teal: 'bg-teal-500',
    green: 'bg-green-500',
    red: 'bg-red-400',
    yellow: 'bg-yellow-400',
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${colorMap[color] || 'bg-violet-500'}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-700 w-12 text-right">{score}%</span>
    </div>
  );
}

function DominanceBadge({ score }: { score: number }) {
  const level = getDominanceLevel(score);
  const info = DOMINANCE_RULES[level];
  const colorMap = {
    alta: 'bg-green-100 text-green-700 border-green-200',
    media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    baixa: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorMap[level]}`}
    >
      {info.label}
    </span>
  );
}

const COMP_COLORS = ['violet', 'purple', 'orange', 'amber', 'cyan', 'teal'];
const COMP_BG = [
  'bg-violet-50 border-violet-200',
  'bg-purple-50 border-purple-200',
  'bg-orange-50 border-orange-200',
  'bg-amber-50 border-amber-200',
  'bg-cyan-50 border-cyan-200',
  'bg-teal-50 border-teal-200',
];
const COMP_TITLE = [
  'text-violet-700',
  'text-purple-700',
  'text-orange-700',
  'text-amber-700',
  'text-cyan-700',
  'text-teal-700',
];

function overallLabel(score: number) {
  if (score >= 80) return { label: 'Inovador Master', emoji: '🏆', desc: 'Você demonstra excelência em todas as dimensões da liderança inovadora.' };
  if (score >= 70) return { label: 'Inovador Avançado', emoji: '🌟', desc: 'Você possui sólidas competências de inovação com algumas áreas de alto potencial.' };
  if (score >= 60) return { label: 'Inovador em Desenvolvimento', emoji: '🚀', desc: 'Você apresenta boas bases para inovar e tem oportunidades claras de evolução.' };
  if (score >= 50) return { label: 'Inovador Iniciante', emoji: '🌱', desc: 'Você está começando sua jornada de inovação com potencial significativo a desenvolver.' };
  return { label: 'Em Construção', emoji: '🔨', desc: 'Há grandes oportunidades de desenvolvimento em suas competências de inovação.' };
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('assessment_results');
    if (!raw) { router.push('/'); return; }
    setResults(JSON.parse(raw));
  }, [router]);

  if (!results) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const radarData = COMPETENCIES.map((c) => ({
    subject: c.name,
    score: results.competencyScores[c.id] ?? 0,
    fullMark: 100,
  }));

  const { label: overLabel, emoji, desc } = overallLabel(results.overallScore);
  const overallLevel = getDominanceLevel(results.overallScore);

  const allBehaviors = COMPETENCIES.flatMap((c) =>
    c.behaviors.map((b) => ({
      ...b,
      competencyName: c.name,
      score: results.behaviorScores[b.id] ?? 0,
    }))
  );
  const strengths = [...allBehaviors].sort((a, b) => b.score - a.score).slice(0, 4);
  const improvements = [...allBehaviors].sort((a, b) => a.score - b.score).slice(0, 4);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-700 to-purple-700 text-white px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xs">I</span>
              </div>
              <span className="font-semibold text-sm">Innovation Readiness</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-white/70 text-xs hover:text-white transition-colors"
            >
              Nova avaliação
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
              {emoji}
            </div>
            <div>
              <p className="text-white/70 text-sm">Relatório de</p>
              <h1 className="text-2xl font-extrabold">{results.userName}</h1>
              <p className="text-white/70 text-xs mt-0.5">
                {results.userRole} · {formatDate(results.completedAt)}
              </p>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <div className="text-4xl font-extrabold">{results.overallScore}%</div>
              <div className="text-white/80 text-sm font-medium">{overLabel}</div>
              <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block font-semibold ${
                overallLevel === 'alta' ? 'bg-green-400/30 text-green-100' :
                overallLevel === 'media' ? 'bg-yellow-400/30 text-yellow-100' :
                'bg-red-400/30 text-red-100'
              }`}>
                {DOMINANCE_RULES[overallLevel].label}
              </div>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-3 max-w-2xl">{desc}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Radar + profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">Radar de Competências</h2>
            <RadarChart data={radarData} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">Perfis de Liderança</h2>
            <div className="space-y-4">
              {LEADER_PROFILES.map((p) => {
                const score = results.profileScores[p.id] ?? 0;
                const level = getDominanceLevel(score);
                const iconMap: Record<string, string> = { conectivo: '🤝', criativo: '💡', adaptativo: '🔄' };
                const colorBarMap: Record<string, string> = { conectivo: 'violet', criativo: 'orange', adaptativo: 'cyan' };
                return (
                  <div key={p.id} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{iconMap[p.id]}</span>
                        <span className="font-semibold text-slate-700 text-sm">{p.name}</span>
                      </div>
                      <DominanceBadge score={score} />
                    </div>
                    <ScoreBar score={score} color={colorBarMap[p.id]} />
                    <p className="text-slate-500 text-xs mt-2">
                      {level === 'alta'
                        ? 'Você demonstra excelência nas competências deste perfil.'
                        : level === 'media'
                        ? 'Você apresenta boas bases, com espaço para crescimento.'
                        : 'Este perfil representa uma oportunidade prioritária de desenvolvimento.'}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Dominance rules legend */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Alta ≥70%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" />Média 50–69%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />Baixa &lt;50%</span>
            </div>
          </div>
        </div>

        {/* Competency detail */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Competências Detalhadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPETENCIES.map((comp, ci) => (
              <div key={comp.id} className={`rounded-2xl border p-5 ${COMP_BG[ci]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-bold text-sm ${COMP_TITLE[ci]}`}>{comp.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{comp.description}</p>
                  </div>
                  <DominanceBadge score={results.competencyScores[comp.id] ?? 0} />
                </div>
                <ScoreBar score={results.competencyScores[comp.id] ?? 0} color={COMP_COLORS[ci]} />

                <div className="mt-3 space-y-2">
                  {comp.behaviors.map((beh) => {
                    const bs = results.behaviorScores[beh.id] ?? 0;
                    return (
                      <div key={beh.id} className="flex items-center gap-2">
                        <span className="text-slate-600 text-xs w-28 truncate">{beh.name}</span>
                        <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-violet-500"
                            style={{
                              width: `${bs}%`,
                              backgroundColor: ['#7c3aed','#9333ea','#ea580c','#d97706','#0891b2','#0d9488'][ci],
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 w-9 text-right">{bs}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-2">
            <span className="text-green-500">★</span> Pontos Fortes
          </h2>
          <p className="text-slate-500 text-sm mb-4">Seus comportamentos com maior dominância.</p>
          <div className="space-y-4">
            {strengths.map((b) => {
              const level = getDominanceLevel(b.score);
              const comp = COMPETENCIES.find((c) => c.behaviors.some((bh) => bh.id === b.id))!;
              const feedback = b.feedbacks[level];
              return (
                <div key={b.id} className="border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-slate-800">{b.name}</span>
                      <span className="text-slate-400 text-xs ml-2">· {comp.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">{b.score}%</span>
                      <DominanceBadge score={b.score} />
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{feedback}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Areas to improve */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-2">
            <span className="text-orange-500">▲</span> Pontos a Desenvolver
          </h2>
          <p className="text-slate-500 text-sm mb-4">Comportamentos com maior oportunidade de evolução.</p>
          <div className="space-y-4">
            {improvements.map((b) => {
              const level = getDominanceLevel(b.score);
              const comp = COMPETENCIES.find((c) => c.behaviors.some((bh) => bh.id === b.id))!;
              const feedback = b.feedbacks[level];
              return (
                <div key={b.id} className="border border-orange-100 rounded-xl p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-slate-800">{b.name}</span>
                      <span className="text-slate-400 text-xs ml-2">· {comp.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-600">{b.score}%</span>
                      <DominanceBadge score={b.score} />
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{feedback}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* All behaviors table */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">Todos os Comportamentos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 px-2 text-slate-500 font-medium text-xs">Comportamento</th>
                  <th className="text-left py-2 px-2 text-slate-500 font-medium text-xs">Competência</th>
                  <th className="text-center py-2 px-2 text-slate-500 font-medium text-xs">Pontuação</th>
                  <th className="text-left py-2 px-2 text-slate-500 font-medium text-xs w-32">Dominância</th>
                </tr>
              </thead>
              <tbody>
                {allBehaviors
                  .sort((a, b) => b.score - a.score)
                  .map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2 px-2 font-medium text-slate-700">{b.name}</td>
                      <td className="py-2 px-2 text-slate-500 text-xs">{b.competencyName}</td>
                      <td className="py-2 px-2 text-center font-bold text-slate-700">{b.score}%</td>
                      <td className="py-2 px-2">
                        <DominanceBadge score={b.score} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-8 text-center text-white">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="text-xl font-bold mb-2">Sua jornada de inovação começa aqui</h3>
          <p className="text-white/75 text-sm mb-6 max-w-md mx-auto">
            Use este relatório como ponto de partida para desenvolver suas competências de liderança
            inovadora. Cada ponto abaixo de 70% é uma oportunidade de crescimento.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-violet-50 transition-colors"
          >
            Refazer Avaliação
          </button>
        </div>

        <p className="text-center text-slate-400 text-xs pb-4">
          Baseado no framework Liderança 4.0 · Arbache Innovations · Innovation Readiness Assessment
        </p>
      </main>
    </div>
  );
}
