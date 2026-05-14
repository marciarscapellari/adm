'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COMPETENCIES, LEADER_PROFILES } from '@/lib/assessment-data';

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalQuestions = COMPETENCIES.flatMap((c) =>
    c.behaviors.flatMap((b) => b.questions)
  ).length;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Informe seu nome.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Informe um e-mail válido.';
    if (!form.role.trim()) e.role = 'Informe seu cargo/função.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleStart() {
    if (!validate()) return;
    sessionStorage.setItem('assessment_user', JSON.stringify(form));
    router.push('/assessment');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <span className="text-white/90 font-semibold text-sm">Innovation Readiness</span>
        </div>
        <span className="text-white/60 text-xs">Baseado no Framework Liderança 4.0</span>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Avaliação gratuita · {totalQuestions} questões · ~15 minutos
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mb-5">
          Descubra seu Perfil de{' '}
          <span className="text-yellow-300">Prontidão para Inovação</span>
        </h1>

        <p className="text-white/75 text-lg max-w-xl mb-10 leading-relaxed">
          Avalie suas competências de liderança 4.0 e empreendedorismo. Receba um relatório
          detalhado com radar de competências, pontos fortes e plano de desenvolvimento.
        </p>

        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full mb-12">
          {LEADER_PROFILES.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white"
            >
              <div className="text-2xl mb-2">
                {p.id === 'conectivo' ? '🤝' : p.id === 'criativo' ? '💡' : '🔄'}
              </div>
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-white/60 text-xs mt-1">
                {p.id === 'conectivo'
                  ? 'Relacionamento e Empatia'
                  : p.id === 'criativo'
                  ? 'Criatividade e Mindset'
                  : 'Adaptabilidade e Resolução'}
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-left">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Começar avaliação</h2>
          <p className="text-slate-500 text-sm mb-6">
            Preencha seus dados para personalizar seu relatório.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Nome completo</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Maria Silva"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="seu@email.com"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Cargo / Função</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Ex: Gerente de Inovação"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg py-3 text-sm transition-colors mt-2"
            >
              Iniciar Avaliação →
            </button>
          </div>

          <p className="text-slate-400 text-xs text-center mt-4">
            Suas respostas são confidenciais e usadas apenas para gerar seu relatório.
          </p>
        </div>
      </section>

      {/* Competency overview */}
      <section className="bg-white/5 backdrop-blur-sm border-t border-white/10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/50 text-xs text-center uppercase tracking-wider mb-5">
            6 Competências avaliadas
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COMPETENCIES.map((c) => (
              <div key={c.id} className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-white font-semibold text-xs leading-tight">{c.name}</div>
                <div className="text-white/50 text-xs mt-1">{c.behaviors.length} comportamentos</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
