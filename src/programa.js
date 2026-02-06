import './scss/estilos.scss';
import { SITIO, TABLA_PROYECTOS, DATOS_SITIO, AVANZADO } from './config.js';
import { obtenerCamposTabla, obtenerRegistrosTabla } from './baserow.js';
import { crearSeccionCMS, crearTarjetaProyecto } from './componentes.js';

let cargandoProyectos = false;
let camposTablaMemo = null;
let contenedorProyectos = null;
let sitioInicializado = false;
let todosLosProyectos = [];
let temporizadorBusqueda = null;

// =====================================================
// INICIALIZACIÓN DEL SITIO
// =====================================================

console.log('🚀 Iniciando sitio:', SITIO.titulo);
inicializarSitio();

// =====================================================
// FUNCIONES DE METADATOS Y CARGA
// =====================================================

function actualizarMetadatosDelSitio(datosSitio) {
  const datos = datosSitio || SITIO;
  document.title = datos.titulo;

  let metaDescripcion = document.querySelector('meta[name="description"]');
  if (metaDescripcion) {
    metaDescripcion.setAttribute('content', datos.descripcion);
  }

  document.querySelectorAll('meta[property^="og:"]').forEach((meta) => {
    const propiedad = meta.getAttribute('property');
    if (propiedad === 'og:title') {
      meta.setAttribute('content', datos.titulo);
    } else if (propiedad === 'og:description') {
      meta.setAttribute('content', datos.descripcion);
    } else if (propiedad === 'og:url') {
      meta.setAttribute('content', datos.urlSitio || SITIO.urlSitio);
    }
  });

  const tituloNav = document.querySelector('.navbar-titulo');
  if (tituloNav) {
    tituloNav.textContent = datos.titulo;
  }
}

async function cargarYMostrarProyectos() {
  if (cargandoProyectos || !contenedorProyectos) return;
  cargandoProyectos = true;

  contenedorProyectos.innerHTML = '';
  const mensajeCarga = document.createElement('p');
  mensajeCarga.className = 'cargando';
  mensajeCarga.textContent = '⏳ Cargando proyectos...';
  contenedorProyectos.appendChild(mensajeCarga);

  try {
    const proyectos = AVANZADO.modoEstatico ? await obtenerProyectosEstaticos() : await obtenerProyectosConCache();
    if (!AVANZADO.modoEstatico && !camposTablaMemo) {
      camposTablaMemo = await obtenerCamposTabla(TABLA_PROYECTOS.id);
    }

    todosLosProyectos = proyectos;
    mensajeCarga.remove();

    if (proyectos.length === 0) {
      const mensajeVacio = document.createElement('p');
      mensajeVacio.className = 'mensaje-vacio';
      mensajeVacio.textContent = 'No hay proyectos para mostrar aún.';
      contenedorProyectos.appendChild(mensajeVacio);
      return;
    }

    const espacioBuscador = document.getElementById('espacio-buscador');
    if (espacioBuscador && !document.getElementById('buscador-proyectos')) {
      espacioBuscador.appendChild(crearBuscador());
    }

    mostrarProyectos(proyectos);
  } catch (error) {
    if (mensajeCarga) mensajeCarga.remove();
    console.error('❌ Error al cargar proyectos:', error);
  } finally {
    cargandoProyectos = false;
  }
}

// =====================================================
// FUNCIONES DE BÚSQUEDA Y RENDERIZADO
// =====================================================

function normalizarTexto(texto) {
  return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function extraerTextoCompleto(proyecto) {
  const textos = [];
  for (const valor of Object.values(proyecto)) {
    if (valor === null || valor === undefined) continue;
    if (Array.isArray(valor)) {
      valor.forEach(item => textos.push(typeof item === 'object' ? (item.value || item.name || '') : String(item)));
    } else if (typeof valor === 'object') {
      textos.push(valor.value || valor.name || '');
    } else {
      textos.push(String(valor));
    }
  }
  return normalizarTexto(textos.join(' '));
}

function filtrarProyectos(termino) {
  if (!termino.trim()) return todosLosProyectos;
  const terminoNorm = normalizarTexto(termino);
  return todosLosProyectos.filter(p => extraerTextoCompleto(p).includes(terminoNorm));
}

function mostrarProyectos(proyectos) {
  contenedorProyectos.innerHTML = '';
  if (proyectos.length === 0) {
    const p = document.createElement('p');
    p.className = 'mensaje-vacio';
    p.textContent = '🔍 No se encontraron proyectos.';
    contenedorProyectos.appendChild(p);
    return;
  }

  proyectos.forEach((proyecto) => {
    const tarjeta = crearTarjetaProyecto({
      titulo: proyecto[TABLA_PROYECTOS.campos.titulo],
      descripcion: proyecto[TABLA_PROYECTOS.campos.descripcion],
      imagen: proyecto[TABLA_PROYECTOS.campos.imagen],
      enlace: proyecto[TABLA_PROYECTOS.campos.enlace],
      registro: proyecto,
      campos: camposTablaMemo,
      camposBase: [TABLA_PROYECTOS.campos.titulo, TABLA_PROYECTOS.campos.descripcion, TABLA_PROYECTOS.campos.imagen, TABLA_PROYECTOS.campos.enlace],
    });
    contenedorProyectos.appendChild(tarjeta);
  });
  actualizarContadorResultados(proyectos.length);
}

function actualizarContadorResultados(cantidad) {
  const c = document.getElementById('contador-resultados');
  if (c) c.textContent = `${cantidad} ${cantidad === 1 ? 'resultado' : 'resultados'}`;
}

function manejarBusqueda(evento) {
  if (temporizadorBusqueda) clearTimeout(temporizadorBusqueda);
  temporizadorBusqueda = setTimeout(() => {
    mostrarProyectos(filtrarProyectos(evento.target.value));
  }, 300);
}

function crearBuscador() {
  const cont = document.createElement('div');
  cont.className = 'buscador-contenedor';
  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'buscador-proyectos';
  input.className = 'buscador-input';
  input.placeholder = '🔍 Buscar en proyectos...';
  input.addEventListener('input', manejarBusqueda);
  
  const contador = document.createElement('span');
  contador.id = 'contador-resultados';
  contador.className = 'contador-resultados';
  contador.textContent = `${todosLosProyectos.length} resultados`;

  cont.appendChild(input);
  cont.appendChild(contador);
  return cont;
}

// =====================================================
// LÓGICA DE SECCIONES (DINÁMICA)
// =====================================================

async function inicializarSitio() {
  if (sitioInicializado) return;
  const datosSitio = await cargarDatosSitio();
  construirSecciones(datosSitio);
  actualizarMetadatosDelSitio(datosSitio);
  sitioInicializado = true;
  cargarYMostrarProyectos();
}

async function cargarDatosSitio() {
  if (!DATOS_SITIO?.id) return { ...SITIO };
  const registros = await obtenerRegistrosTabla(DATOS_SITIO.id);
  const registro = registros[0];
  if (!registro) return { ...SITIO };

  const c = DATOS_SITIO.campos;
  return {
    titulo: registro[c.titulo] || SITIO.titulo,
    descripcion: registro[c.descripcion] || SITIO.descripcion,
    urlSitio: registro[c.urlSitio] || SITIO.urlSitio,
    introTitulo: registro[c.introTitulo] || 'La Urdimbre',
    introTexto: registro[c.introTexto] || '',
    coleccionTitulo: registro[c.coleccionTitulo] || 'Tramas creativas',
    coleccionTexto: registro[c.coleccionTexto] || '',
    // NUEVO: Campos para la sección de investigación
    investigacionTitulo: registro['investigacionTitulo'] || 'Investigación',
    investigacionTexto: registro['investigacionTexto'] || 'Espacio dedicado a la investigación académica.'
  };
}

function construirSecciones(datosSitio) {
  const contenedor = document.querySelector('main') || document.body;
  contenedor.innerHTML = '';

  // 1. SECCIÓN INICIO
  contenedor.appendChild(crearSeccionCMS({
    id: 'inicio',
    titulo: datosSitio.introTitulo,
    contenido: datosSitio.introTexto,
    clase: 'seccion-inicio',
  }));

  // 2. SECCIÓN PROYECTOS (COLECCIÓN)
  const seccionColeccion = crearSeccionCMS({
    id: 'proyectos',
    titulo: datosSitio.coleccionTitulo,
    contenido: datosSitio.coleccionTexto,
    clase: 'seccion-proyectos',
  });

  const wrapperProyectos = document.createElement('div');
  wrapperProyectos.className = 'proyectos-wrapper';
  const espacioBuscador = document.createElement('div');
  espacioBuscador.id = 'espacio-buscador';
  wrapperProyectos.appendChild(espacioBuscador);

  contenedorProyectos = document.createElement('div');
  contenedorProyectos.className = 'proyectos-grid';
  wrapperProyectos.appendChild(contenedorProyectos);
  seccionColeccion.appendChild(wrapperProyectos);
  contenedor.appendChild(seccionColeccion);

  // 3. NUEVA SECCIÓN: INVESTIGACIÓN
  // Esto hace que el link #investigacion del menú tenga a donde llegar
  contenedor.appendChild(crearSeccionCMS({
    id: 'investigacion',
    titulo: datosSitio.investigacionTitulo,
    contenido: datosSitio.investigacionTexto,
    clase: 'seccion-investigacion',
  }));

  if (AVANZADO.debug) console.log('✅ Secciones construidas: inicio, proyectos, investigacion');
}

// =====================================================
// CACHÉ Y CARGA
// =====================================================

async function obtenerProyectosConCache() {
  if (!AVANZADO.cacheHabilitado) return obtenerRegistrosTabla(TABLA_PROYECTOS.id);
  const cacheKey = `baserow_cache_${TABLA_PROYECTOS.id}`;
  const cacheRaw = localStorage.getItem(cacheKey);
  if (cacheRaw) {
    const cache = JSON.parse(cacheRaw);
    if (Date.now() - cache.timestamp < (AVANZADO.cacheTTL * 1000)) return cache.data;
  }
  const datos = await obtenerRegistrosTabla(TABLA_PROYECTOS.id);
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: datos }));
  return datos;
}

async function obtenerProyectosEstaticos() {
  const r = await fetch(AVANZADO.rutaEstatico, { cache: 'no-store' });
  const d = await r.json();
  return Array.isArray(d) ? d : (d.results || []);
}

if (AVANZADO.tiempoRecarga > 0) setInterval(cargarYMostrarProyectos, AVANZADO.tiempoRecarga * 1000);