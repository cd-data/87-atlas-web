# 🚀 Inicio Rápido - 87/OchoSiete

Guía de 5 minutos para tener tu sitio funcionando.

## 1️⃣ Instalar Hugo (si no lo tienes)

```bash
# macOS
brew install hugo

# Linux
sudo apt install hugo

# Windows
choco install hugo

# Verificar instalación
hugo version
```

## 2️⃣ Configurar tu Información

Edita `config.toml`:

```toml
baseURL = "https://tusitio.com/"
title = "87 • OchoSiete"

[params]
  description = "Tu descripción"
  
  [params.social]
    instagram = "tu_usuario"
    twitter = "tu_usuario"
    email = "tu@email.com"
```

## 3️⃣ Iniciar Servidor Local

```bash
cd 87-ochositete
hugo server -D
```

Abre: `http://localhost:1313`

## 4️⃣ Crear tu Primer Artículo

```bash
hugo new articulos/mi-primer-post.md
```

Edita el archivo creado en `content/articulos/mi-primer-post.md`:

```yaml
---
title: "Mi Primer Post"
date: 2024-02-13
draft: false  # Cambia a false para publicar
categorias: ["historia"]
---

¡Hola mundo! Este es mi primer artículo en 87.

## Mi primera sección

Contenido aquí...
```

## 5️⃣ Ver tus Cambios

Refresca el navegador - Hugo recarga automáticamente.

---

## 📝 Comandos Útiles

```bash
# Crear artículo
hugo new articulos/titulo.md

# Crear galería
hugo new galeria/mi-galeria.md

# Build para producción
hugo --minify

# Limpiar build
rm -rf public/
```

---

## 🎨 Personalización Rápida

### Cambiar colores principales

Edita `assets/css/main.css`:

```css
:root {
  --color-acento: #C41E3A;  /* Tu color principal */
}
```

### Cambiar logo

Edita `layouts/partials/header.html`:

```html
<a href="/" class="site-logo">
    TU LOGO AQUÍ
</a>
```

---

## 📦 Estructura de Archivos

```
87-ochositete/
├── config.toml           ← Configuración principal
├── content/              ← TUS ARTÍCULOS AQUÍ
│   └── articulos/
├── layouts/              ← Plantillas HTML
├── assets/css/           ← Estilos CSS
└── static/               ← Imágenes, archivos
    └── images/
```

---

## ✅ Checklist Antes de Publicar

- [ ] Cambiar `baseURL` en `config.toml`
- [ ] Actualizar redes sociales en `config.toml`
- [ ] Reemplazar URL de newsletter
- [ ] Cambiar `draft: false` en artículos
- [ ] Añadir imágenes a `/static/images/`
- [ ] Crear favicon personalizado (opcional)
- [ ] Configurar deployment (Netlify/Vercel)

---

## 🆘 Problemas Comunes

**Error: "command not found: hugo"**
→ Hugo no está instalado. Ver paso 1.

**Los cambios no se ven**
→ Verifica que `draft: false` en el front matter.

**Imágenes no cargan**
→ Asegúrate de que estén en `/static/images/` y la ruta sea correcta: `/images/nombre.jpg`

**CSS no se aplica**
→ Reinicia el servidor con `hugo server -D`

---

## 📚 Siguiente Paso

Lee el [README completo](README.md) para funcionalidades avanzadas.

Revisa [SHORTCODES.md](SHORTCODES.md) para componentes especiales.

---

**¡Listo para publicar tu primer artículo sin censura! 🎉**
