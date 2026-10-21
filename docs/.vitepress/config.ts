import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'
import { withMermaid } from 'vitepress-plugin-mermaid'

const config = withMermaid(defineConfig({
  title: 'Documentación',
  description: 'Documentación para almacenar',
  vite: {
    optimizeDeps: {
      include: ['mermaid']
    }
  },
  markdown: {
    config: (md) => {
      md.use(katex as never)
    }
  },
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
        items: [
          { text: 'Introducción', link: '/machine/index' },
          { text: 'Aprendizaje supervisado', link: '/machine/supervisado' },
          { text: 'Aprendizaje no supervisado', link: '/machine/nosupervisado' },
          { text: 'Redes Neuronales', link: '/machine/redes_neuronales' }
        ],
      },
      {
        text: 'Git',
        items: [{ text: 'Introducción', link: '/git/index' }]
      },
      {
        text: 'Wordpress',
        items: [{ text: 'Introducción', link: '/wordpress/index' }]
      },
      {
        text: 'SEO',
        items: [{ text: 'Introducción', link: '/seo/index' }]
      }

    ]
  }
}))

const optimizeDeps = config.vite?.optimizeDeps
if (optimizeDeps?.include) {
  optimizeDeps.include = optimizeDeps.include.filter(
    (dependency) =>
      ![
        '@braintree/sanitize-url',
        'debug',
        'cytoscape-cose-bilkent',
        'cytoscape'
      ].includes(dependency)
  )
}

export default config
