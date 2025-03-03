export const industryTemplates = {
  technology: [
    {
      id: 'software-engineer',
      name: 'Software Engineer',
      styles: {
        container: 'bg-slate-900 p-8',
        header: 'border-l-4 border-green-500',
        name: 'text-4xl font-mono text-green-400',
        contact: 'text-slate-300 font-mono',
        skills: 'grid grid-cols-3 gap-2',
        skillItem: 'bg-slate-800 text-green-400 px-3 py-1 rounded font-mono',
        codeSection: 'bg-slate-800 p-4 rounded font-mono text-green-400'
      }
    },
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      styles: {
        container: 'bg-indigo-50 p-8',
        header: 'grid grid-cols-2',
        name: 'text-4xl font-bold text-indigo-900',
        stats: 'flex justify-end space-x-4 text-indigo-600',
        visualization: 'bg-white rounded-lg shadow-lg p-4',
        dataMetrics: 'grid grid-cols-3 gap-4 text-center'
      }
    }
  ],
  finance: [
    {
      id: 'investment-banker',
      name: 'Investment Banking',
      styles: {
        container: 'bg-gray-100 p-10',
        header: 'border-b-2 border-gray-900',
        name: 'text-4xl font-serif text-gray-900',
        metrics: 'grid grid-cols-3 gap-4 mt-4',
        performance: 'bg-white shadow rounded p-4',
        charts: 'flex justify-between mt-6'
      }
    },
    {
      id: 'financial-analyst',
      name: 'Financial Analyst',
      styles: {
        container: 'bg-blue-900 text-white p-8',
        header: 'grid grid-cols-3',
        metrics: 'bg-blue-800 rounded p-4',
        charts: 'grid grid-cols-2 gap-4',
        kpis: 'flex justify-between text-green-400'
      }
    }
  ],
  healthcare: [
    {
      id: 'medical-professional',
      name: 'Medical Professional',
      styles: {
        container: 'bg-white p-8',
        header: 'border-b-4 border-red-600',
        name: 'text-4xl font-bold text-gray-900',
        credentials: 'text-red-600 font-semibold',
        certifications: 'grid grid-cols-2 gap-4',
        specialties: 'bg-red-50 p-4 rounded'
      }
    },
    {
      id: 'research-scientist',
      name: 'Research Scientist',
      styles: {
        container: 'bg-gray-50 p-8',
        header: 'border-l-4 border-purple-600 pl-4',
        publications: 'bg-white shadow rounded p-4',
        research: 'grid grid-cols-2 gap-6',
        citations: 'text-purple-600 font-semibold'
      }
    }
  ],
  creative: [
    {
      id: 'graphic-designer',
      name: 'Graphic Designer',
      styles: {
        container: 'bg-gradient-to-br from-pink-100 to-purple-100 p-8',
        header: 'text-center',
        name: 'text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600',
        portfolio: 'grid grid-cols-3 gap-4',
        skills: 'flex flex-wrap gap-2'
      }
    },
    {
      id: 'art-director',
      name: 'Art Director',
      styles: {
        container: 'bg-black text-white p-10',
        header: 'border-b border-gold',
        name: 'text-6xl font-light',
        portfolio: 'grid grid-cols-2 gap-8',
        awards: 'bg-gold/10 p-4'
      }
    }
  ],
  marketing: [
    {
      id: 'digital-marketer',
      name: 'Digital Marketing',
      styles: {
        container: 'bg-gradient-to-r from-blue-50 to-green-50 p-8',
        header: 'grid grid-cols-2',
        metrics: 'bg-white rounded-lg shadow p-4',
        campaigns: 'grid grid-cols-3 gap-4',
        analytics: 'flex justify-between text-green-600'
      }
    },
    {
      id: 'brand-manager',
      name: 'Brand Manager',
      styles: {
        container: 'bg-white p-8 border-l-8 border-purple-600',
        header: 'text-center',
        brandMetrics: 'grid grid-cols-4 gap-4',
        portfolio: 'bg-purple-50 rounded-lg p-6',
        achievements: 'flex flex-wrap gap-4'
      }
    }
  ]
};
