export const templateStyles = {
  free: [
    {
      id: 'modern-basic',
      name: 'Modern Basic',
      previewImage: '/templates/modern-basic.png',
      styles: {
        container: 'bg-white p-8 shadow-lg',
        header: 'text-center border-b pb-6',
        name: 'text-3xl font-bold text-gray-900',
        contact: 'text-gray-600 mt-2 space-x-4',
        section: 'space-y-4 mt-6',
        sectionTitle: 'text-2xl font-bold text-gray-900 border-b pb-2'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      previewImage: '/templates/minimal.png',
      styles: {
        container: 'bg-gray-50 p-8',
        header: 'mb-6',
        name: 'text-4xl font-light text-gray-800',
        contact: 'text-gray-600 mt-3',
        section: 'space-y-4 mt-8',
        sectionTitle: 'text-xl font-semibold text-gray-800'
      }
    },
    {
      id: 'classic',
      name: 'Classic',
      previewImage: '/templates/classic.png',
      styles: {
        container: 'bg-white p-8',
        header: 'border-b-2 border-gray-300 pb-4',
        name: 'text-3xl font-serif text-gray-900',
        contact: 'text-gray-600 mt-2',
        section: 'mt-6',
        sectionTitle: 'text-xl font-serif text-gray-800 uppercase'
      }
    }
  ],
  premium: [
    {
      id: 'executive',
      name: 'Executive',
      styles: {
        container: 'bg-slate-50 p-10 shadow-xl',
        header: 'flex justify-between items-center border-b-2 border-slate-800 pb-6',
        name: 'text-4xl font-bold text-slate-900',
        contact: 'text-slate-600 text-right',
        section: 'space-y-6 mt-8',
        sectionTitle: 'text-2xl font-bold text-slate-800 border-l-4 border-slate-800 pl-4'
      }
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      styles: {
        container: 'bg-gradient-to-br from-blue-50 to-white p-8',
        header: 'text-center',
        name: 'text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600',
        contact: 'text-gray-700 mt-4 flex justify-center space-x-6',
        section: 'space-y-6 mt-10',
        sectionTitle: 'text-2xl font-bold text-blue-600'
      }
    },
    {
      id: 'tech',
      name: 'Tech Professional',
      styles: {
        container: 'bg-gray-900 text-white p-8',
        header: 'border-b border-green-500 pb-6',
        name: 'text-4xl font-mono text-green-500',
        contact: 'text-gray-300 font-mono',
        section: 'mt-8',
        sectionTitle: 'text-2xl text-green-500 font-mono'
      }
    },
    {
      id: 'modern-plus',
      name: 'Modern Plus',
      styles: {
        container: 'bg-white p-8 shadow-2xl',
        header: 'grid grid-cols-3',
        name: 'text-4xl font-bold col-span-2',
        contact: 'text-right text-gray-600',
        section: 'mt-8 grid grid-cols-3 gap-6',
        sectionTitle: 'text-2xl font-bold text-indigo-600'
      }
    },
    {
      id: 'elegant',
      name: 'Elegant',
      styles: {
        container: 'bg-cream p-10 border-double border-4 border-gray-800',
        header: 'text-center mb-8',
        name: 'text-5xl font-serif text-gray-900',
        contact: 'text-gray-700 italic',
        section: 'mt-10',
        sectionTitle: 'text-3xl font-serif text-gray-800 text-center'
      }
    },
    {
      id: 'corporate',
      name: 'Corporate',
      styles: {
        container: 'bg-blue-900 text-white p-8',
        header: 'bg-white text-blue-900 p-6 rounded',
        name: 'text-4xl font-bold',
        contact: 'text-blue-800',
        section: 'mt-8 bg-white/10 p-6 rounded',
        sectionTitle: 'text-2xl font-bold border-b border-white/30 pb-2'
      }
    },
    {
      id: 'minimalist-pro',
      name: 'Minimalist Pro',
      styles: {
        container: 'bg-white p-12',
        header: 'border-l-4 border-black pl-6',
        name: 'text-5xl font-light',
        contact: 'text-gray-600 mt-4',
        section: 'mt-12',
        sectionTitle: 'text-2xl font-light uppercase tracking-wider'
      }
    },
    {
      id: 'creative-blocks',
      name: 'Creative Blocks',
      styles: {
        container: 'grid grid-cols-12 gap-4 bg-white p-8',
        header: 'col-span-12 bg-purple-100 p-6 rounded-lg',
        name: 'text-4xl font-bold text-purple-800',
        contact: 'text-purple-600',
        section: 'col-span-6 bg-gray-50 p-6 rounded-lg',
        sectionTitle: 'text-2xl font-bold text-purple-800'
      }
    }
  ]
};