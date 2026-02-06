/**
 * MÓDULO DE COMPONENTES
 *
 * Este módulo contiene funciones para crear componentes HTML reutilizables.
 * Usa estas funciones para construir las diferentes partes de tu sitio.
 */

/**
 * MÓDULO DE COMPONENTES CORREGIDO
 */

import { marked } from 'marked';

// --- FUNCIÓN DE APOYO PARA IMÁGENES DE BASEROW ---
// Esta función extrae la URL sin importar si es un array o un string
function obtenerUrlImagen(datoImagen) {
  if (Array.isArray(datoImagen) && datoImagen.length > 0) {
    return datoImagen[0].url;
  }
  return typeof datoImagen === 'string' ? datoImagen : '';
}

function renderizarMarkdown(texto) {
  if (!texto) return '';
  return marked.parse(String(texto), { breaks: true });
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatearFecha(valor) {
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return escaparHtml(valor);
  return fecha.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
}

function normalizarEtiqueta(valor) {
  if (!valor) return '';
  if (typeof valor === 'string') return valor;
  if (typeof valor === 'object') {
    return valor.value || valor.name || valor.label || '';
  }
  return String(valor);
}

function renderizarArchivo(archivo) {
  if (!archivo) return '';
  const url = archivo.url || archivo.file || archivo.download_url || '';
  const nombre = archivo.name || archivo.original_name || 'Archivo';
  if (!url) return escaparHtml(nombre);
  const esImagen = archivo.is_image || archivo.image || false;
  if (esImagen) {
    return `<img src="${url}" alt="${escaparHtml(nombre)}" class="campo-imagen">`;
  }
  return `<a href="${url}" target="_blank" rel="noreferrer">${escaparHtml(nombre)}</a>`;
}

function renderizarValorCampo(valor, campo) {
  if (valor === null || valor === undefined || valor === '') return '';

  switch (campo.type) {
    case 'long_text':
      return renderizarMarkdown(valor);
    case 'text':
      return escaparHtml(valor);
    case 'url':
      return `<a href="${escaparHtml(valor)}" target="_blank" rel="noreferrer">${escaparHtml(valor)}</a>`;
    case 'email':
      return `<a href="mailto:${escaparHtml(valor)}">${escaparHtml(valor)}</a>`;
    case 'phone_number':
      return `<a href="tel:${escaparHtml(valor)}">${escaparHtml(valor)}</a>`;
    case 'boolean':
      return `<span class="campo-boolean ${valor ? 'activo' : 'inactivo'}">${valor ? 'Sí' : 'No'}</span>`;
    case 'date':
    case 'datetime':
    case 'created_on':
    case 'last_modified':
      return formatearFecha(valor);
    case 'single_select':
      return `<span class="campo-chip">${escaparHtml(normalizarEtiqueta(valor))}</span>`;
    case 'multiple_select':
      return `<div class="campo-chips">${(valor || [])
        .map((item) => `<span class="campo-chip">${escaparHtml(normalizarEtiqueta(item))}</span>`)
        .join('')}</div>`;
    case 'file':
    case 'image':
    case 'multiple_file':
    case 'multiple_image':
      return `<div class="campo-archivos">${(Array.isArray(valor) ? valor : [valor])
        .map((item) => renderizarArchivo(item))
        .join('')}</div>`;
    case 'link_row':
      return (valor || [])
        .map((item) => escaparHtml(normalizarEtiqueta(item)))
        .filter(Boolean)
        .join(', ');
    default:
      if (Array.isArray(valor)) {
        return valor.map((item) => escaparHtml(normalizarEtiqueta(item))).join(', ');
      }
      if (typeof valor === 'object') {
        return escaparHtml(normalizarEtiqueta(valor) || JSON.stringify(valor));
      }
      return escaparHtml(valor);
  }
}

function renderizarCamposAutomaticos(registro, campos, camposBase = []) {
  if (!registro || !Array.isArray(campos) || campos.length === 0) return '';

  const camposExcluidos = new Set(camposBase.filter(Boolean));
  const htmlCampos = campos
    .filter((campo) => campo?.name && !camposExcluidos.has(campo.name))
    .map((campo) => {
      const valor = registro[campo.name];
      const contenido = renderizarValorCampo(valor, campo);
      if (!contenido) return '';
      return `
        <div class="campo-item">
          <div class="campo-etiqueta">${escaparHtml(campo.name)}</div>
          <div class="campo-valor">${contenido}</div>
        </div>
      `;
    })
    .filter(Boolean)
    .join('');

  if (!htmlCampos) return '';
  return `<div class="campos-extra">${htmlCampos}</div>`;
}

export function crearTarjetaProyecto(datos) {
  const div = document.createElement('article');
  div.className = 'tarjeta-proyecto';

  const urlImagen = obtenerUrlImagen(datos.imagen);
  let html = '<div class="tarjeta-contenido">';

  if (urlImagen) {
    html += `<img src="${urlImagen}" alt="${escaparHtml(datos.titulo)}" class="tarjeta-imagen">`;
  }

  html += '<div class="tarjeta-texto">';
  html += `<h3 class="tarjeta-titulo">${escaparHtml(datos.titulo)}</h3>`;

  if (datos.descripcion) {
    html += `<div class="tarjeta-descripcion contenido-markdown">${renderizarMarkdown(datos.descripcion)}</div>`;
  }

  if (datos.enlace) {
    html += `<a href="${datos.enlace}" class="tarjeta-enlace">Ver fuente →</a>`;
  }

  if (datos.registro && datos.campos) {
    html += renderizarCamposAutomaticos(datos.registro, datos.campos, datos.camposBase);
  }

  html += '</div></div>';
  div.innerHTML = html;
  return div;
}

export function crearListaArticulos(articulos) {
  const div = document.createElement('section');
  div.className = 'lista-articulos';
  let html = '<div class="articulos-contenedor">';

  articulos.forEach((articulo) => {
    const urlImagen = obtenerUrlImagen(articulo.imagen);
    html += '<article class="articulo">';
    html += `<h2>${escaparHtml(articulo.titulo)}</h2>`;

    if (articulo.fecha) {
      html += `<time class="articulo-fecha">${formatearFecha(articulo.fecha)}</time>`;
    }

    if (urlImagen) {
      html += `<img src="${urlImagen}" alt="${escaparHtml(articulo.titulo)}" class="articulo-imagen">`;
    }

    html += `<div class="articulo-contenido contenido-markdown">${renderizarMarkdown(articulo.contenido)}</div>`;
    html += '</article>';
  });

  html += '</div>';
  div.innerHTML = html;
  return div;
}

export function crearGaleria(imagenes) {
  const div = document.createElement('section');
  div.className = 'galeria';
  let html = '<div class="galeria-grid">';

  imagenes.forEach((img) => {
    // Aquí el campo suele llamarse 'url' o venir de un campo de imagen
    const urlImagen = img.url ? obtenerUrlImagen(img.url) : obtenerUrlImagen(img.imagen);
    
    html += '<figure class="galeria-item">';
    html += `<img src="${urlImagen}" alt="${escaparHtml(img.titulo || '')}" loading="lazy">`;

    if (img.titulo || img.descripcion) {
      html += '<figcaption>';
      if (img.titulo) html += `<h3>${escaparHtml(img.titulo)}</h3>`;
      if (img.descripcion) html += `<p>${escaparHtml(img.descripcion)}</p>`;
      html += '</figcaption>';
    }
    html += '</figure>';
  });

  html += '</div>';
  div.innerHTML = html;
  return div;
}

export function crearHereo(datos) {
  const div = document.createElement('section');
  div.className = 'hereo';

  const urlImagen = obtenerUrlImagen(datos.imagen);
  let html = '';

  if (urlImagen) {
    html += `<img src="${urlImagen}" alt="${escaparHtml(datos.titulo)}" class="hereo-fondo">`;
  }

  html += '<div class="hereo-contenido">';
  html += `<h1>${escaparHtml(datos.titulo)}</h1>`;

  if (datos.subtitulo) {
    html += `<p class="hereo-subtitulo">${escaparHtml(datos.subtitulo)}</p>`;
  }

  if (datos.enlace) {
    html += `<a href="${datos.enlace}" class="hereo-boton">${escaparHtml(datos.textoEnlace || 'Explora')}</a>`;
  }

  html += '</div>';
  div.innerHTML = html;
  return div;
}

export function crearSeccion(titulo, contenido, clase = '') {
  const div = document.createElement('section');
  div.className = `seccion ${clase}`;
  div.innerHTML = `<h2>${escaparHtml(titulo)}</h2><div class="seccion-contenido">${contenido}</div>`;
  return div;
}

export function crearSeccionCMS(datos) {
  const div = document.createElement('section');
  div.className = `seccion ${datos.clase || ''}`.trim();
  if (datos.id) div.id = datos.id;

  let html = '';
  if (datos.titulo) html += `<h2>${escaparHtml(datos.titulo)}</h2>`;
  if (datos.contenido) html += `<div class="seccion-contenido contenido-markdown">${renderizarMarkdown(datos.contenido)}</div>`;

  div.innerHTML = html;
  return div;
}