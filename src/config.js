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

export const SITIO = {
  titulo: 'Urdimbre EHE',
  descripcion: '**Urdimbre EHE** es el soporte invisible donde se entrelazan las ideas, la investigación y la creación. ',
  autor: 'Natalia Rocha | Escuela de Humanidades y Educación, Tec de Monterrey, Campus Guadalajara',
  urlSitio: typeof __URL_SITIO__ !== 'undefined' ? __URL_SITIO__ : '',
  idioma: 'es',
  pais: 'MX', // Cambié CO por MX ya que mencionas el Tec de Monterrey
};

export const BASEROW = {
  urlBaserow: 'https://api.baserow.io',
  token: "8KVQuPA2mFs6i7WJJevpz6Ui3msfNWcB",
  idBaseDatos: 365391,
};

// TABLA PRINCIPAL DE PROYECTOS
export const TABLA_PROYECTOS = { 
  id: 826870,
  campos: {
    titulo: 'Name', 
    creador: 'Creador', 
    temas: 'Temas', 
    descripcion: 'Descripción', 
    contribuidor: 'Contribuidor', 
    año: 'Año', 
    // Asegúrate de que estos existan en la tabla 826870:
    tipo: 'Tipo',
    imagen: 'Imagen',
    enlace: 'Enlace'
  },
};

// TABLA DE CONFIGURACIÓN DEL SITIO (CMS)
export const DATOS_SITIO = {
  id: 829612,
  // REVISA: Estos nombres deben ser las COLUMNAS de la tabla 829612
  campos: {
    titulo: 'Name', 
    introduccion: 'Descripción',
    pieDePagina: 'Footer'
  },
};

export const AVANZADO = {
  basePath: '/urdimbre-ehe/', // Correcto para GitHub Pages
  tiempoRecarga: 300,
  debug: true,
  tamanoPagina: 100,
  cacheHabilitado: true,
  cacheTTL: 0,
  modoEstatico: false,
  rutaEstatico: '/estaticos/datos.json',
};