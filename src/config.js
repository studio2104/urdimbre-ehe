/**
 * CONFIGURACIÓN DEL PROYECTO
 *
 * Este archivo contiene todas las configuraciones que los estudiantes
 * necesitan personalizar para conectar su sitio con Baserow.
 *
 * No es necesario tocar otros archivos del proyecto si solo quieren cambiar
 * el contenido de sus datos.
 */

// =====================================================
// 1. INFORMACIÓN DEL SITIO
// =====================================================
// Reemplaza estos valores con la información de tu proyecto

/**
 * CONFIGURACIÓN DEL PROYECTO - Versión Corregida para Urdimbre EHE
 */

export const SITIO = {
  titulo: 'Urdimbre EHE',
  descripcion: '**Urdimbre EHE** es el soporte invisible donde se entrelazan las ideas, la investigación y la creación. ',
  autor: 'Natalia Rocha | Escuela de Humanidades y Educación, Tec de Monterrey, Campus Guadalajara',
  urlSitio: typeof __URL_SITIO__ !== 'undefined' ? __URL_SITIO__ : '',
  idioma: 'es',
  pais: 'MX', 
};

export const BASEROW = {
  urlBaserow: 'https://api.baserow.io',
  token: "8KVQuPA2mFs6i7WJJevpz6Ui3msfNWcB",
  idBaseDatos: 365391,
};

// --- CAMBIO CLAVE AQUÍ ---
// Cambiamos TABLA_PROYECTOS por Urdimbre_EHE para que el build no falle
export const Urdimbre_EHE = { 
  id: 826870,
  campos: {
    titulo: 'Name', 
    creador: 'Creador', 
    temas: 'Temas', 
    descripcion: 'Descripción', 
    contribuidor: 'Contribuidor', 
    año: 'Año', 
    tipo: 'Tipo',
    imagen: 'Imagen',
    enlace: 'Enlace'
  },
};

export const DATOS_SITIO = {
  id: 829612,
  campos: {
    titulo: 'Name', 
    introTitulo: 'Name', // Ajuste para que coincida con la lógica de secciones
    introTexto: 'Descripción',
    coleccionTitulo: 'Name',
    coleccionTexto: 'Descripción',
    investigacionTitulo: 'Name',
    investigacionTexto: 'Descripción'
  },
};

export const AVANZADO = {
  basePath: '/urdimbre-ehe/',
  tiempoRecarga: 300,
  debug: true,
  tamanoPagina: 100,
  cacheHabilitado: true,
  cacheTTL: 0,
  modoEstatico: false,
  rutaEstatico: '/estaticos/datos.json',
};