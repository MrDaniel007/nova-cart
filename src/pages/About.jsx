import React, { useState } from 'react';
import { ShieldCheck, Zap, Users, Code, ArrowUpRight } from 'lucide-react';

// Данные для блока ценностей
const values = [
  {
    id: '01',
    title: 'Скорость без компромиссов',
    description: 'Оптимизируем каждую строчку кода, чтобы интерфейсы загружались мгновенно на любых устройствах.',
    icon: Zap,
  },
  {
    id: '02',
    title: 'Прозрачные процессы',
    description: 'Прямой контакт с разработчиками, понятные спринты и никаких скрытых сложностей.',
    icon: ShieldCheck,
  },
  {
    id: '03',
    title: 'Человекоцентричность',
    description: 'Создаём продукты, которыми удобно и приятно пользоваться настоящим людям каждый день.',
    icon: Users,
  },
];

// Данные для блока команды
const teamMembers = [
  {
    name: 'Алексей Смирнов',
    role: 'Lead Frontend Architect',
    bio: 'Отвечает за архитектуру и производительность. Обожает чистый код и сухой эспрессо.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    tags: ['React', 'Next.js', 'Tailwind'],
  },
  {
    name: 'Елена Морозова',
    role: 'UX/UI Product Designer',
    bio: 'Превращает сложные бизнес-задачи в простые и элегантные интерфейсы.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    tags: ['Figma', 'UX Research', 'Design Systems'],
  },
  {
    name: 'Даниил Ковалёв',
    role: 'Fullstack Engineer',
    bio: 'Связывает клиентскую логику с бэкендом. Эксперт в GraphQL и оптимизации API.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL'],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('values');

  return (
    <section className="bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Шапка раздела с переключателем */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
              // О нашей работе
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
              Принципы и люди, стоящие за продуктом
            </h2>
          </div>

          {/* Табы */}
          <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('values')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'values'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Наши Ценности
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'team'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Команда
            </button>
          </div>
        </div>

        {/* Контент: Блок Ценностей */}
        {activeTab === 'values' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">{item.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Контент: Блок Команды */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Аватар с лёгким оверлеем */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>

                {/* Инфо о сотруднике */}
                <div className="p-6 relative">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-indigo-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Теги стекa */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                    {member.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}