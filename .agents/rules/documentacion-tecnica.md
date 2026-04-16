---
trigger: always_on
---

# Documentación Técnica: Proyecto Recetario Web

Este documento describe la arquitectura, el stack tecnológico y las especificaciones funcionales del sistema de Recetario Web.

## 1. Stack Tecnológico

### Backend

- **Lenguaje:** Python 3.10+
- **Framework:** Django 5.x
- **API:** Django REST Framework (DRF)
- **Autenticación:** JSON Web Token (SimpleJWT)
- **Gestión de Imágenes:** Cloudinary
- **Base de Datos:** PostgreSQL (Gestionada en Render)

### Frontend

- **Herramienta de Construcción:** Vite
- **Librería Principal:** React.js (JavaScript)
- **Estilos:** Tailwind CSS
- **Consumo de API:** Axios

---

## 2. Arquitectura de Datos (Backend)

### Modelo de Receta (`Recipe`)

El modelo principal almacenará la información culinaria con los siguientes campos:

| Campo                | Tipo            | Descripción                                       |
| :------------------- | :-------------- | :------------------------------------------------ |
| `nombre`             | CharField       | Nombre del platillo.                              |
| `categoria`          | CharField       | Opciones: Desayuno, Comida, Cena, Postre, Bebida. |
| `imagen`             | CloudinaryField | URL de la imagen gestionada en Cloudinary.        |
| `instrucciones`      | TextField       | Paso a paso de la preparación.                    |
| `ingredientes`       | TextField/JSON  | Lista de ingredientes necesarios.                 |
| `porciones`          | IntegerField    | Cantidad de personas/porciones.                   |
| `tiempo_preparacion` | CharField       | Tiempo estimado (ej: "30 min").                   |

### Control de Acceso y Seguridad

- **Autenticación:** Se utiliza JWT. El frontend enviará el token en el encabezado `Authorization: Bearer <token>`.
- **Restricción de Usuarios:** El sistema está configurado para permitir el acceso únicamente al administrador y a un usuario adicional autorizado. Esto se valida mediante permisos personalizados en DRF (`BasePermission`).

---

## 3. Estructura del Frontend

### Componentes Principales

- **AuthProvider:** Contexto de React para manejar el estado del token JWT y la sesión.
- **RecipeCard:** Visualización resumida de la receta con su categoría e imagen.
- **RecipeForm:** Formulario para creación y edición, integrado con el SDK de Cloudinary para la subida de archivos.
- **Layout:** Navegación persistente usando Tailwind para un diseño responsivo.

---

## 4. Despliegue en Render

1.  **Backend (Web Service):**
    - **Build Command:** `pip install -r requirements.txt && python manage.py migrate`
    - **Start Command:** `gunicorn proyecto.wsgi`
    - **Variables de Entorno:** `CLOUDINARY_URL`, `DATABASE_URL`, `SECRET_KEY`, `JWT_SECRET`.
2.  **Frontend (Static Site):**
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
