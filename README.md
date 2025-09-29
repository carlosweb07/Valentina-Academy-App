## Valentina Academy App – Guía rápida y amigable

Aplicación móvil (Expo/React Native + TypeScript) para gestionar cursos de la Academia Valentina. Incluye 3 módulos principales:
- Estudiante: ver cursos, ver lecciones/video, presentar encuestas/pruebas, descargar receta y certificado.
- Profesor: administrar cursos propios (multimedia, receta, etc.).
- Administrador: administrar usuarios, cursos, recetas, ingredientes y encuestas.


### 1) Iniciar la aplicación

Requisitos mínimos:
- Node.js LTS instalado.
- npm (incluido con Node) o yarn.
- App Expo Go en tu teléfono (opcional, para probar en dispositivo).

Instalación e inicio:
```bash
npm install
npm run start
```

Atajos útiles (desde `package.json`):
- `npm run android`: abre la app en un emulador/dispositivo Android.
- `npm run ios`: abre la app en iOS (macOS con Xcode).
- `npm run web`: abre la app en el navegador.

Variables de entorno (importantísimo):
- La app consume un backend configurable con `EXPO_PUBLIC_BACKEND_URL`.
- Crea un archivo `.env` en la raíz con:
```bash
EXPO_PUBLIC_BACKEND_URL=https://tu-backend.com/api
```
Nota: En Expo, las variables que comienzan con `EXPO_PUBLIC_` están disponibles en el cliente.


### 2) Estructura de carpetas (visión general)

Solo las rutas más importantes para que ubiques todo rápido:

```
.
├─ App.tsx                     # Entrada de la app
├─ app.json                    # Configuración de Expo
├─ src/
│  ├─ components/             # Componentes reutilizables (UI)
│  │  ├─ Carousel/            # Carrusel genérico
│  │  ├─ Course/              # Card de curso + skeleton
│  │  ├─ Courses/             # Listado y cabecera de cursos
│  │  ├─ Footer/              # Pie de página
│  │  ├─ Header/              # Cabecera con categorías
│  │  ├─ HeaderCard/          # Hero/presentación de curso
│  │  ├─ Loading/             # Indicador de carga
│  │  ├─ Modal/               # Modal genérico
│  │  └─ Navbar/              # Barra superior y menú usuario
│  │
│  ├─ constants/              # Colores, tipografías, rutas, métricas
│  │  ├─ colors.ts
│  │  ├─ typography.ts
│  │  ├─ metrics.ts
│  │  ├─ routes.ts            # Rutas del backend
│  │  └─ vars.ts              # BACKEND_URL, fondos, etc.
│  │
│  ├─ context/
│  │  └─ ContextApp.tsx       # Estado global: usuario y progreso
│  │
│  ├─ interfaces/             # Tipos/Modelos TypeScript
│  │  ├─ App.ts               # Roles
│  │  └─ Models.ts            # User, Course, Survey, etc.
│  │
│  ├─ layouts/                # “Middlewares” de pantalla
│  │  ├─ HasPermissions/      # Verifica rol (admin/teacher/student)
│  │  ├─ IsAuthorized/        # Verifica token/logueo
│  │  └─ IsCourseCompleted/   # Redirige si curso no completado
│  │
│  ├─ navigation/
│  │  ├─ AppNavigator.tsx     # Stack de pantallas + headers
│  │  └─ types.ts             # Tipos de navegación
│  │
│  ├─ screens/                # Páginas del app
│  │  ├─ Landing/             # Portada y CTA
│  │  ├─ Login/ Register/     # Autenticación
│  │  ├─ Home/                # Dashboard estudiante
│  │  ├─ Course/              # Detalle del curso + pago + video
│  │  ├─ Survey/              # Encuestas, certificado
│  │  ├─ Admin/               # Hub admin
│  │  └─ AdminScreens/        # CRUD de admin (Users, Courses, etc.)
│  │
│  ├─ services/
│  │  └─ Api.ts               # Cliente HTTP centralizado
│  │
│  └─ utils/
│     └─ errorTranslate.ts    # Mensajes de error al español
│
├─ assets/                    # Imágenes locales usadas en UI
└─ src/public/                # Imágenes públicas (algunas réplicas)
```


### 3) Cómo “piensa” la app (flujo simple)

- Navegación: `src/navigation/AppNavigator.tsx` define las pantallas y aplica envoltorios de seguridad.
- Autenticación: `IsAuthorized` revisa si hay `access_token` en almacenamiento y pide al backend los datos del usuario. Si no hay token válido, te envía a Login.
- Permisos: `HasPermissions` consulta el rol (`users/role/:id`). Si el rol no coincide con lo esperado, te envía a Landing.
- Estado global: `ContextApp` guarda `user` y si el curso fue completado para habilitar la encuesta/certificado.
- Consumo de API: `services/Api.ts` agrega la `baseUrl` y token a cada request y expone métodos `get/post/put/patch/delete`.


### 4) Módulos principales

- Estudiante (Student)
  - Home: listado de cursos, filtros por categoría, cards con foto y descripción.
  - Course: detalle del curso, video (al terminar se habilita la encuesta), descarga de receta (PDF) y luego certificado.
  - Survey: encuesta del curso. Al aprobar, se habilita exportar certificado.

- Profesor (Teacher)
  - Similar al administrador pero enfocado en cursos propios. Gestión de multimedia (portada/video) y material.

- Administrador (Admin)
  - `AdminScreens/*`: CRUD de Usuarios, Cursos (con multimedia), Recetas (ingredientes y pasos), Ingredientes, Encuestas (preguntas y respuestas correctas).
  - Cada sección incluye crear/editar/eliminar y vistas con skeletons y mensajes de operación.


### 5) Servicios y API (recordatorio breve)

- ¿Qué es una API? Es una “puerta” del backend para consultar o enviar datos. Se accede por URLs llamadas “endpoints” (por ejemplo: `GET /courses`).
- En este proyecto:
  - `EXPO_PUBLIC_BACKEND_URL` define la URL base.
  - `src/constants/routes.ts` lista los endpoints (`courses`, `users`, `surveys`, etc.).
  - `src/services/Api.ts` centraliza las peticiones y adjunta el token cuando existe.

Ejemplo simple (conceptual):
```ts
// Obtener cursos
const courses = await ApiService.get(BACKEND_ROUTES.courses)
```


### 6) Estilos, UI y accesibilidad

- Colores/tipografías/espaciados en `src/constants/*` para mantener consistencia visual.
- Componentes UI reutilizables (`src/components/*`): `Navbar`, `Header`, `Courses`, `CourseCard`, `Modal`, `Loading`, `Carousel`, etc.
- Skeletons: estados de carga amigables para no mostrar pantallas “vacías”.


### 7) TypeScript y tipos (recordatorio breve)

- ¿Qué es TypeScript? Es “JavaScript con tipos”. Ayuda a evitar errores indicando qué estructura deben tener los datos.
- En `src/interfaces/` tienes modelos como `User`, `Course`, `Survey`. Así el editor te guía y el código es más claro.


### 8) Scripts útiles

- `npm run start`: lanza Expo y te da un QR para probar en Expo Go.
- `npm run android` / `npm run ios` / `npm run web`: ejecuta la app en cada plataforma.


### 9) Errores comunes y soluciones rápidas

- “No carga el backend”: revisa tu `.env` y que `EXPO_PUBLIC_BACKEND_URL` sea accesible.
- “Me saca a Login”: probablemente el token expiró o no existe; inicia sesión otra vez.
- “No tengo permisos”: revisa tu rol en el backend y que coincida con lo esperado por la pantalla.


### 10) Glosario ultra breve

- API: interfaz del backend para comunicar datos.
- Endpoint: URL de la API (ej. `/courses`).
- Token: llave de acceso temporal que prueba que estás logueado.
- Hook: función especial de React (ej. `useState`, `useEffect`).
- Context: forma de compartir estado global sin “pasar props” por todos lados.
- TypeScript: añade tipos a JS para escribir con menos errores.


### 11) Estructura de carpetas en detalle (paso a paso)

A continuación verás cada carpeta con su propósito, cuándo la usarías y pequeñas notas aclaratorias en el momento.

- src/
  - components/
    - Contiene piezas visuales reutilizables. Piensa en “bloques de LEGO” de la interfaz.
    - Ejemplos: `Navbar` (barra superior), `Modal` (ventana emergente), `Loading` (ruedita de carga), `CourseCard` (tarjeta para mostrar un curso), `Carousel` (carrusel de vistas).
    - Nota: Reutilizar componentes evita repetir el mismo código en muchas pantallas.
    - “Props”: son los datos que un componente necesita para funcionar (como parámetros de una función).
  - constants/
    - Guarda valores compartidos (colores, tamaños de letra, rutas del backend, etc.).
    - Archivos clave:
      - `colors.ts`: colores de la marca.
      - `typography.ts`: tamaños de fuente.
      - `metrics.ts`: medidas genéricas (alto de pantalla, paddings).
      - `routes.ts`: nombres de endpoints del backend.
      - `vars.ts`: variables globales, por ejemplo `BACKEND_URL`.
    - Nota: Tener “constantes” centralizadas hace fácil cambiar el estilo o una URL en un solo lugar.
  - context/
    - `ContextApp.tsx`: almacena el estado global de la app (usuario logueado, si completó un curso, etc.).
    - “Estado global”: información disponible para muchas pantallas sin pasarla manualmente entre componentes.
    - “Context”: herramienta de React para compartir estado global.
  - interfaces/
    - Define “tipos” de datos con TypeScript (por ejemplo, cómo luce un `User` o un `Course`).
    - Tipos = contratos. Si un curso debe tener `title`, `description`, etc., el editor te avisa si olvidas algo.
  - layouts/
    - “Capas” que envuelven pantallas para aplicar reglas comunes.
    - `IsAuthorized/`: verifica si hay token y usuario válido. Si no, te envía a Login.
      - Token: “llave” temporal para demostrar que estás logueado.
    - `HasPermissions/`: revisa el “rol” del usuario (admin/profesor/estudiante) y solo permite el acceso si corresponde.
      - Rol: qué permisos tiene un usuario.
    - `IsCourseCompleted/`: protege la encuesta para que solo aparezca si el video fue completado.
  - navigation/
    - `AppNavigator.tsx`: lista las pantallas y su orden. También aplica headers y botones de navegación.
    - `types.ts`: define los parámetros que recibe cada pantalla (por ejemplo, `Course` recibe un `id`).
    - Nota: “Navegación” es moverse entre pantallas.
  - screens/
    - Aquí viven las pantallas completas (cada una representa una vista de la app):
      - `Landing/`: portada con llamadas a la acción (entrar/registrarse).
      - `Login/` y `Register/`: formularios de acceso.
      - `Home/`: lista de cursos para el estudiante.
      - `Course/`: detalle del curso, video, descarga de receta (PDF) y paso a la encuesta.
        - “PDF (receta)”: se obtiene del backend y se comparte/descarga en el dispositivo.
        - “Video”: al terminar, marca el curso como completado para habilitar la encuesta.
      - `Survey/`: encuesta de validación previa al certificado.
      - `Admin/` y `AdminScreens/`: paneles para administrar Usuarios, Cursos (con multimedia), Recetas, Ingredientes y Encuestas.
        - CRUD: Crear, Leer, Actualizar y Borrar.
        - “Skeletons”: placeholders que se muestran mientras se cargan datos.
    - Nota: una pantalla suele combinar componentes + datos del backend.
  - services/
    - `Api.ts`: cliente HTTP central. Todas las llamadas al backend pasan por aquí.
    - Adjunta `baseUrl` y el `token` automáticamente. Expone funciones fáciles: `get`, `post`, `put`, `patch`, `delete`.
    - “Endpoint”: una dirección del backend (ej. `/courses`) que devuelve o recibe datos.
  - utils/
    - Utilidades pequeñas que no encajan en otro lugar. Ej: `errorTranslate.ts` para traducir mensajes del servidor.
  - interfaces/Models.ts (detalle)
    - Contiene los modelos base: `User`, `Course`, `Recipe`, `Survey`, etc.
    - Tener estos modelos claros ayuda a entender qué espera cada pantalla y componente.

- assets/
  - Imágenes locales usadas por la interfaz (logos, fondos, íconos). Al estar “locales”, están dentro del proyecto.

- src/public/
  - Imágenes “públicas”. Útil si decides servir ciertos recursos de forma distinta (por ejemplo, en web).

- Archivos raíz
  - `App.tsx`: punto de entrada de la app. Monta navegación y proveedores (providers) globales.
    - “Provider”: componente que entrega contexto/estado a toda la app (ej. `ContextAppProvider`).
  - `app.json`: configuración de Expo (nombre, icono, permisos, etc.).
  - `package.json`: dependencias y scripts (`npm run start`, `npm run android`, etc.).
  - `tsconfig.json`: configuración de TypeScript.


### 12) Resumen sencillo

- Arrancas con `npm install` y `npm run start`. Configura el backend en `.env` (variable `EXPO_PUBLIC_BACKEND_URL`).
- La app se divide en piezas: pantallas (`screens`), componentes visuales (`components`), reglas y datos compartidos (`layouts`, `context`), y llamadas al servidor (`services/Api.ts`).
- Los estilos y ajustes visuales están centralizados en `constants/` para mantener coherencia.
- Los tipos en `interfaces/` te ayudan a evitar errores y a leer el código con más confianza.
- Estudiante ve cursos, reproduce el video, descarga receta, contesta encuesta y accede a su certificado.
- Profesor/Admin gestionan contenido (usuarios, cursos, recetas, ingredientes, encuestas) desde `AdminScreens/`.


— Tómate tu tiempo: aprender a construir apps es un camino, no una carrera; cada paso que das hoy es una semilla de confianza para mañana. 🌱


