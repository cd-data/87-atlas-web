#!/bin/bash

# Asegúrate de estar en la raíz de tu proyecto de Hugo
echo "🚀 Iniciando creación de jerarquía para tu marca personal..."

# 1. Crear estructura de Bitácora y sus categorías
mkdir -p content/bitacora/tecnologia
mkdir -p content/bitacora/humanidades
mkdir -p content/bitacora/narrativa

# 2. Crear estructura de Eventos
mkdir -p content/eventos/agenda
mkdir -p content/eventos/cronicas

# 3. Crear estructura de Proyectos/Cursos
mkdir -p content/proyectos/cursos

# 4. Crear los archivos _index.md (necesarios para que Hugo liste los posts)
# Bitácora Raíz
echo -e "---\ntitle: \"Bitácora\"\n---" > content/bitacora/_index.md
echo -e "---\ntitle: \"Tecnología\"\n---" > content/bitacora/tecnologia/_index.md
echo -e "---\ntitle: \"Humanidades\"\n---" > content/bitacora/humanidades/_index.md
echo -e "---\ntitle: \"Narrativa\"\n---" > content/bitacora/narrativa/_index.md

# Eventos Raíz
echo -e "---\ntitle: \"Eventos\"\n---" > content/eventos/_index.md
echo -e "---\ntitle: \"Agenda\"\n---" > content/eventos/agenda/_index.md
echo -e "---\ntitle: \"Crónicas\"\n---" > content/eventos/cronicas/_index.md

# Proyectos Raíz
echo -e "---\ntitle: \"Proyectos\"\n---" > content/proyectos/_index.md

echo "✅ Estructura creada con éxito."
echo "📂 Revisa tu carpeta 'content' para ver los cambios."