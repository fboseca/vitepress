# Documentación del proyecto

Sitio de documentación creado con [VitePress](https://vitepress.dev/) y Vite.
El contenido está escrito en Markdown y se encuentra en `docs/`.

## Requisitos

Versiones disponibles y utilizadas actualmente en el entorno del proyecto:

- **Node.js:** `v22.23.2`
- **pnpm:** `11.20.0`

Puedes comprobar las versiones instaladas con:

```sh
node --version
pnpm --version
```

## Instalar dependencias

Desde la raíz del proyecto, instala las dependencias con pnpm:

```sh
pnpm install
```

## Desarrollo

Inicia el servidor local para editar y ver la documentación en el navegador:

```sh
pnpm dev
```

VitePress mostrará la dirección local en la terminal, normalmente
`http://localhost:5173/`.

## Construir y previsualizar

Genera la versión de producción:

```sh
pnpm build
```

El resultado se genera en `docs/.vitepress/dist/`. Para previsualizarlo
localmente, después de construir:

```sh
pnpm preview
```

## Contenido

- `docs/`: páginas Markdown del sitio.
- `docs/.vitepress/config.ts`: título, navegación y configuración de VitePress.
- `docs/.vitepress/theme/`: personalización del tema.

La documentación admite fórmulas matemáticas con KaTeX usando `$...$` o
`$$...$$`, y diagramas Mermaid con bloques cercados con ` ```mermaid `.