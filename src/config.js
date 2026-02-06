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
  // El nombre de tu sitio (aparecerá en el navegador y en Google)
  titulo: 'Urdimbre EHE',

  // Una descripción breve del sitio
  descripcion: '**Urdimbre EHE** es el soporte invisible donde se entrelazan las ideas, la investigación y la creación. ',

  // Tu nombre o nombre de la organización
  autor: 'Natalia Rocha | Escuela de Humanidades y Educación, Tec de Monterrey, Campus Guadalajara',

  // El URL se obtiene automáticamente desde vite.config.js
  // No necesitas cambiar esto aquí
  urlSitio: __URL_SITIO__ || '',

  // Idioma del sitio (ISO 639-1)
  idioma: 'es',

  // País/región (ISO 3166-1)
  pais: 'CO',
};

// =====================================================
// 2. CONEXIÓN CON BASEROW
// =====================================================

export const BASEROW = {
  // Solo la URL base de la API
  urlBaserow: 'https://api.baserow.io',

  // El token de autenticación
  token: "8KVQuPA2mFs6i7WJJevpz6Ui3msfNWcB",

  // El ID de tu base de datos (Workspace/Database ID)
  idBaseDatos: 365391,
};

// =====================================================
// 3. CONFIGURACIÓN DE TABLAS Y CAMPOS
// =====================================================

// Antes: export const Urdimbre_EHE = {
export const TABLA_PROYECTOS = { 
  id: 826870,
  campos: {
    titulo: 'Name', 
    creador: 'Creador', 
    temas: 'Temas', 
    descripcion: 'Descripción', 
    contribuidor: 'Contribuidor', 
    año: 'Año', 
    fecha: 'Fecha', 
    tipo: 'Type', 
    formato: 'Format', 
    imagen: 'Imagen', 
    enlace: 'Enlace', 
    autor: 'Autor registro', 
  },
};

// 3.1 TABLA DE CONTENIDO (CMS)
export const DATOS_SITIO = {
  id: 829612,
  // IMPORTANTE: Estos deben ser los NOMBRES DE LAS COLUMNAS en Baserow
  campos: {
    titulo: 'Titulo',        // Cambia 'Urdimbre EHE' por el nombre de la columna
    descripcion: 'Descripcion', 
    urlSitio: 'URL',
    introTitulo: 'Intro_Titulo',
    introTexto: 'Intro_Texto',
    coleccionTitulo: 'Coleccion_Titulo',
    coleccionTexto: 'Coleccion_Texto',
  },
};

// Ejemplo: tabla de "Articulos"
// Descomenta y modifica si quieres usar otra tabla
/*
export const TABLA_ARTICULOS = {
  id: 0,
  campos: {
    titulo: 'Título',
    contenido: 'Contenido',
    autor: 'Autor',
    fecha: 'Publicado el',
    imagen: 'Imagen portada',
  },
};
*/

// =====================================================
// 4. CONFIGURACIÓN AVANZADA (Opcional)
// =====================================================
// No necesitas cambiar esto si no lo entiendes

export const AVANZADO = {
  // Si tu sitio está en una subruta de GitHub Pages
  // Por ejemplo: https://tuusuario.github.io/mi-sitio
  // Cambia esto a: '/mi-sitio'
  basePath: '/urdimbre-ehe/',

  // Número de segundos antes de recargar los datos de Baserow
  // (para ver cambios en tiempo real, reduce este número)
  tiempoRecarga: 300, // 5 minutos

  // Mostrar logs en la consola del navegador (útil para debugging)
  debug: true,

  // -------------------------------
  // Paginación (Baserow)
  // -------------------------------
  // Cantidad de filas por página (máx. recomendado: 200)
  tamanoPagina: 100,

  // -------------------------------
  // Caché local (localStorage)
  // -------------------------------
  cacheHabilitado: true,
  // Tiempo de vida del caché en segundos
  // Usa 0 para desactivar el caché local
  cacheTTL: 0,

  // -------------------------------
  // Modo estático (sin API)
  // -------------------------------
  // Para proyectos educativos, déjalo en false y usa el token directo
  // El sitio se conectará a Baserow cada vez que alguien lo visite
  modoEstatico: false,
  // Ruta del archivo JSON (dentro de /estaticos)
  rutaEstatico: '/estaticos/datos.json',
};
