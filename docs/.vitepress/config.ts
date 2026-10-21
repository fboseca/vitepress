import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Documentación',
  description: 'Documentación para almacenar',
  themeConfig: {
    nav: [{ text: 'Inicio', link: '/' }],
    sidebar: [
      {
        text: 'Patrones de diseño',
        items: [
          { text: 'Introducción', link: '/patrones/index' },
          { text: 'Creacionales', link: '/patrones/creacionales' },
          { text: 'Estructurales', link: '/patrones/estructurales' },
          { text: 'Comportamiento', link: '/patrones/comportamiento' },
        ]
      },
      {
        text: 'Machine Learning',
        items: [{ text: 'Introducción', link: '/git/introduccion' }]
      },
      {
        text: 'Git',
        items: [{ text: 'Introducción', link: '/git/introduccion' }]
      },
      {
        text: 'Wordpress',
        items: [{ text: 'Introducción', link: '/git/introduccion' }]
      },
      {
        text: 'SEO',
        items: [{ text: 'Introducción', link: '/git/introduccion' }]
      }

    ]
  }
})
