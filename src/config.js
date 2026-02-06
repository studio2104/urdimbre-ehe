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
// Configura aquí los datos de conexión a tu base de datos Baserow

export const BASEROW = {
  // El URL de tu instancia Baserow
  // Si usas Baserow Cloud (gratuito): https://api.baserow.io
  // Si tienes un servidor propio: https://tu-dominio.com
  urlBaserow: 'https://api.baserow.io/api/database/rows/table/826870/',

  // Tu token de autenticación de Baserow
  // Cómo conseguirlo:
  // 1. Ve a https://baserow.io (o tu instancia)
  // 2. Inicia sesión con tu cuenta
  // 3. Ve a "Settings" (Configuración)
  // 4. En "Account" busca "API tokens"
  // 5. Crea un nuevo token (dale un nombre descriptivo)
  // 6. IMPORTANTE: Marca solo permisos de LECTURA (read)
  // 7. Copia el token aquí
VITE_BASEROW_TOKEN: "8KVQuPA2mFs6i7WJJevpz6Ui3msfNWcB",
  //
  // NOTA PARA ESTUDIANTES:
  // Este token estará visible en GitHub. Para proyectos educativos
  // sin datos sensibles está bien, pero SIEMPRE configura el token
  // con permisos de solo LECTURA en Baserow.
import.meta.env.VITE_BASEROW_TOKEN: "8KVQuPA2mFs6i7WJJevpz6Ui3msfNWcB",

  // El ID de tu base de datos Baserow
  // Cómo conseguirlo:
  // 1. Ve a tu base de datos en Baserow
  // 2. Mira la URL en el navegador: /database/[ID]/
  // 3. El [ID] es lo que necesitas aquí
id Base Datos: 365391,
};

// =====================================================
// 3. CONFIGURACIÓN DE TABLAS Y CAMPOS
// =====================================================
// Define aquí qué datos quieres mostrar en tu sitio

// Ejemplo: tabla de "Películas"
export const Urdimbre_EHE = {
  // El ID de la tabla en Baserow
  // Cómo conseguirlo: Ve a tu tabla, el URL es /database/[DB_ID]/table/[TABLE_ID]/
  id: 826870,

  // Los nombres de los campos en tu tabla
  // (deben coincidir exactamente con los nombres en Baserow)
  campos: {
    titulo: 'Name', // Campo que contiene el título del proyecto
    creador: 'Creador', // Campo que contiene nombre del creador o equipo
    temas: 'Temas', // Campo que contiene los temas o categorías
    descripcion: 'Descripción', // Campo que contiene la descripción
    contribuidor: 'Contribuidor', // Campo que contiene el contribuidor
    año: 'Año', // Campo que contiene el año de creación
    fecha: 'Fecha', // Campo que contiene la fecha de publicación o creación
    tipo: 'Tipo', // Campo que contiene el tipo de proyecto (ej. investigación, narrativa, etc.)
    formato: 'Format', // Campo que contiene el formato del proyecto (ej. texto, video, audio, etc.)
    imagen: 'Imagen', // Campo que contiene la URL de la imagen
    enlace: 'Enlace', // Campo que contiene un enlace externo
    autor: 'Autor registro', // Campo que contiene el nombre del autor o equipo
  },
};

// =====================================================
// 3.1 TABLA DE CONTENIDO DEL SITIO (CMS)
// =====================================================
// Crea una tabla en Baserow con 1 sola fila para controlar el sitio
// Esta tabla se usa para títulos, introducción, colección y contacto
export const DATOS_SITIO = {
  // El ID de la tabla CMS en Baserow
  id: 829612,

  // Nombres exactos de los campos en esa tabla
  campos: {
    titulo: 'Urdimbre EHE',
    descripcion: 'Urdimbre EHE es el soporte invisible donde se entrelazan las ideas, la investigación y la creación.',
    urlSitio: 'studio2104.github.io/urdimbre-ehe/',
    introTitulo: 'La Urdimbre',
    introTexto: 'Introducción',
    coleccionTitulo: 'Tramas creativas',
    coleccionTexto: 'Si la Escuela es la base, las **Tramas Creativas** son el diseño que emerge del entrelazado de talentos. Esta sección es nuestra vitrina viva: el espacio donde la teoría se convierte en práctica, la investigación en narrativa y el conocimiento en acción con impacto social.',
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
  basePath: '/',

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
