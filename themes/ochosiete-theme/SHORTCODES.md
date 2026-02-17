# Guía de Shortcodes - 87/OchoSiete

Los shortcodes son componentes reutilizables que puedes usar en tus artículos para crear contenido enriquecido.

## 📦 Caja de Información (infobox)

Crea cajas destacadas para información importante.

### Uso:

```markdown
{{< infobox tipo="info" titulo="Nota Importante" >}}
Este es el contenido de la caja de información.
Puedes usar **markdown** dentro.
{{< /infobox >}}
```

### Tipos disponibles:

- `info` (azul) - Información general
- `warning` (naranja) - Advertencias
- `danger` (rojo) - Peligros o crítico
- `success` (verde) - Éxitos o confirmaciones

### Ejemplos:

```markdown
{{< infobox tipo="warning" titulo="Advertencia" >}}
Este contenido puede ser sensible para algunos lectores.
{{< /infobox >}}

{{< infobox tipo="info" >}}
Puedes omitir el título si no lo necesitas.
{{< /infobox >}}
```

---

## 🖼️ Galería de Imágenes

Crea grids de imágenes con descripciones.

### Uso:

```markdown
{{< galeria >}}
  {{< imagen src="/images/foto1.jpg" caption="Descripción de la foto 1" >}}
  {{< imagen src="/images/foto2.jpg" caption="Descripción de la foto 2" >}}
  {{< imagen src="/images/foto3.jpg" caption="Descripción de la foto 3" >}}
{{< /galeria >}}
```

### Características:

- Grid responsive automático
- Imágenes optimizadas con mismo tamaño
- Filtro vintage/documental aplicado
- Captions con tipografía mono

---

## 💬 Cita Destacada (pullquote)

Destaca citas importantes dentro de tus artículos.

### Uso:

```markdown
{{< cita autor="Winston Churchill" >}}
El éxito no es definitivo, el fracaso no es fatal: 
lo que cuenta es el valor para continuar.
{{< /cita >}}
```

### Sin autor:

```markdown
{{< cita >}}
Una cita poderosa sin autor específico.
{{< /cita >}}
```

---

## 🎯 Ejemplo Completo en un Artículo

```markdown
---
title: "Mi Artículo Completo"
date: 2024-02-13
categorias: ["historia"]
---

## Introducción

Aquí va tu texto normal...

{{< infobox tipo="info" titulo="Contexto Histórico" >}}
Este evento ocurrió en un período de grandes cambios políticos.
{{< /infobox >}}

## Desarrollo

Más contenido...

{{< cita autor="General Patton" >}}
Una pinta de sudor ahorra un galón de sangre.
{{< /cita >}}

## Galería Fotográfica

{{< galeria >}}
  {{< imagen src="/images/batalla-1.jpg" caption="Tropas avanzando, 1944" >}}
  {{< imagen src="/images/batalla-2.jpg" caption="Tanques en posición" >}}
  {{< imagen src="/images/batalla-3.jpg" caption="Resultado final" >}}
{{< /galeria >}}

{{< infobox tipo="warning" titulo="Contenido Sensible" >}}
Las siguientes imágenes contienen escenas de guerra.
{{< /infobox >}}
```

---

## 💡 Tips de Uso

1. **No abuses de los shortcodes** - Úsalos solo cuando añadan valor real
2. **Mantén consistencia** - Si usas un estilo, mantenlo en todo el artículo
3. **Imágenes optimizadas** - Usa imágenes de buena calidad pero comprimidas
4. **Markdown dentro** - Puedes usar markdown dentro de la mayoría de shortcodes

---

## 🔧 Crear tus Propios Shortcodes

Los shortcodes están en `layouts/shortcodes/`. Para crear uno nuevo:

1. Crea un archivo `.html` en esa carpeta
2. Usa sintaxis de template de Hugo
3. Úsalo en tus artículos con `{{< nombre-shortcode >}}`

Ejemplo simple:

```html
{{/* layouts/shortcodes/destacado.html */}}
<div style="background: yellow; padding: 1rem;">
  {{ .Inner }}
</div>
```

Uso:

```markdown
{{< destacado >}}
Texto destacado
{{< /destacado >}}
```

---

**¿Necesitas más shortcodes?** Crea un issue o envía un pull request con tus ideas.
