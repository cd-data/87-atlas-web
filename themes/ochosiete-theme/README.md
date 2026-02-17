# 87 • OCHOSITETE - Tema Hugo

Un tema Hugo diseñado específicamente para **87/OchoSiete**, con estilo editorial documental/archivo y soporte para múltiples tipos de contenido.

![87 Preview](https://via.placeholder.com/1200x600/1A1A1A/C41E3A?text=87+•+OCHOSITETE)

## 🎨 Características

- **Diseño de archivo documental** con estética ficha/dossier
- **Grid visual** tipo Instagram pero con tu identidad
- **Dark mode** nativo con toggle
- **Multi-tipo de contenido**: artículos, galerías, series, cartas, productos, cursos
- **Sistema de categorías y series** para organizar contenido
- **Responsive** y optimizado para móviles
- **Newsletter** integrado
- **Redes sociales** con iconos y enlaces
- **SEO optimizado** con meta tags completos
- **Tipografía característica** con fuentes Google Fonts

## 📦 Instalación

### 1. Instalar Hugo

```bash
# macOS
brew install hugo

# Linux
sudo apt install hugo

# Windows
choco install hugo
```

### 2. Clonar el tema

```bash
# Opción 1: Copiar todo el directorio
cp -r 87-ochositete tu-sitio/

# Opción 2: Si usas Git
git clone [tu-repo] tu-sitio
cd tu-sitio
```

### 3. Iniciar servidor de desarrollo

```bash
hugo server -D
```

Visita `http://localhost:1313`

## ⚙️ Configuración

Edita `config.toml` para personalizar tu sitio:

```toml
baseURL = "https://tusitio.com/"
title = "87 • OchoSiete"

[params]
  description = "Tu descripción personal"
  author = "87"
  
  [params.social]
    instagram = "tu_usuario"
    twitter = "tu_usuario"
    youtube = "tu_canal"
    email = "tu@email.com"
  
  [params.newsletter]
    enabled = true
    action_url = "https://tu-newsletter-url.com"
```

## 📝 Crear Contenido

### Nuevo artículo

```bash
hugo new articulos/mi-primer-articulo.md
```

### Front Matter completo

```yaml
---
title: "Título del Artículo"
date: 2024-02-13
draft: false
description: "Descripción breve del contenido"
image: "/images/mi-imagen.jpg"
image_caption: "Pie de foto"
numero: "1-1"  # Número de ficha (opcional)
autor: "87"

# Taxonomías
categorias: ["historia"]  # historia, analisis, cultura, tecnologia, politica
series: ["Segunda Guerra Mundial"]  # Agrupa artículos relacionados
tags: ["tag1", "tag2"]

# Tipo de contenido
tipo: "articulo"  # articulo, galeria, carta, producto, curso
---

Tu contenido aquí en Markdown...
```

### Tipos de contenido

**Artículo estándar:**
```bash
hugo new articulos/titulo.md
```

**Galería de imágenes:**
```bash
hugo new galeria/mi-galeria.md
```

**Serie de contenidos:**
Usa el campo `series: ["Nombre de Serie"]` en varios artículos

**Producto/Curso:**
```bash
hugo new productos/mi-producto.md
```

## 🎨 Personalización

### Colores

Edita `assets/css/main.css` y modifica las variables CSS:

```css
:root {
  --color-rojo: #C41E3A;
  --color-azul: #2E5266;
  --color-naranja: #D35400;
  --color-acento: var(--color-rojo);
  /* ... más colores */
}
```

### Tipografía

Las fuentes actuales son:
- **Principal**: Inter
- **Títulos**: Space Grotesk
- **Monospace**: JetBrains Mono
- **Handwriting**: Caveat

Para cambiar, edita el link de Google Fonts en `layouts/_default/baseof.html` y las variables CSS:

```css
:root {
  --fuente-principal: 'TuFuente', sans-serif;
  --fuente-titulo: 'TuFuenteTitulo', sans-serif;
}
```

### Logo

El logo "87 • OCHOSITETE" está en `layouts/partials/header.html`:

```html
<a href="/" class="site-logo">
    <span>87</span> • OCHOSITETE
</a>
```

Puedes reemplazarlo con una imagen:

```html
<a href="/" class="site-logo">
    <img src="/images/logo.svg" alt="87">
</a>
```

## 📐 Estructura de Directorios

```
87-ochositete/
├── archetypes/          # Plantillas para nuevo contenido
├── assets/
│   └── css/            # Estilos CSS
├── content/
│   ├── articulos/      # Tus artículos
│   ├── galeria/        # Galerías
│   ├── series/         # Series de contenido
│   ├── productos/      # Productos/cursos
│   └── contacto.md     # Página de contacto
├── layouts/
│   ├── _default/       # Layouts base
│   ├── partials/       # Componentes reutilizables
│   └── index.html      # Homepage
├── static/
│   ├── images/         # Imágenes estáticas
│   ├── files/          # Archivos descargables
│   └── favicon.svg     # Favicon del sitio
└── config.toml         # Configuración principal
```

## 🚀 Despliegue

### Build de producción

```bash
hugo --minify
```

Esto genera tu sitio en el directorio `public/`

### Netlify

1. Conecta tu repositorio Git
2. Build command: `hugo --minify`
3. Publish directory: `public`

### Vercel

1. Importa tu repositorio
2. Framework preset: Hugo
3. Build command: `hugo --minify`
4. Output directory: `public`

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy Hugo

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - name: Build
        run: hugo --minify
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 📚 Categorías Disponibles

El tema incluye estas categorías con colores específicos:

- **Historia** (Rojo) - `categorias: ["historia"]`
- **Análisis** (Azul) - `categorias: ["analisis"]`
- **Cultura** (Naranja) - `categorias: ["cultura"]`
- **Tecnología** (Azul claro) - `categorias: ["tecnologia"]`
- **Política** (Rojo oscuro) - `categorias: ["politica"]`

Puedes añadir más categorías editando el CSS en `main.css`:

```css
.ficha-categoria.tucategoria { 
  color: #TUCOLOR; 
}
```

## 🎯 Sistema de Numeración

Cada artículo puede tener un número de ficha único:

```yaml
numero: "1-1"  # Serie-Número
```

El formato sugerido es `SERIE-NUMERO` (ej: `historia-5`, `analisis-12`)

Si no especificas número, se genera automáticamente.

## ✨ Dark Mode

El dark mode es automático y respeta las preferencias del sistema. Los usuarios pueden cambiarlo con el botón en el header.

El tema se guarda en localStorage para persistir entre sesiones.

## 📱 Responsive

El tema es completamente responsive con breakpoints en:
- Desktop: >768px
- Mobile: <768px

## 🔍 SEO

El tema incluye:
- Meta tags completos
- Open Graph para redes sociales
- Twitter Cards
- RSS feed automático
- Sitemap generado por Hugo

## 🆘 Soporte

Para dudas o problemas:
- Email: contacto@ochositete.com
- Issues: [GitHub Issues]

## 📄 Licencia

[Tu licencia aquí - MIT recomendada para temas open source]

---

**Desarrollado con ❤️ para 87 • OchoSiete**

*Un sitio sin censura, con libertad editorial completa.*
