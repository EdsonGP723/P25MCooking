---
trigger: always_on
---

## 1. Arquitectura y Estándares de Código

- **Backend (Django/DRF):** Sigue estrictamente PEP 8. Usa `snake_case` para variables, funciones y nombres de archivos. Las clases deben usar `PascalCase`.
- **Frontend (React/Vite):** Usa `camelCase` para variables y funciones. Los componentes y archivos de componentes deben usar `PascalCase`.
- **Estructura del Proyecto:** Mantén una separación clara entre lógica de negocio (Backend) y lógica de presentación (Frontend).
- **Consistencia:** Todas las respuestas de la API deben seguir una estructura uniforme (ej. `{ "data": {}, "message": "" }`).
- **Acceso Restringido:** El sistema debe estar diseñado para ser utilizado exclusivamente por dos personas (el dueño y un invitado).
- **Autenticación:** Implementar un sistema de login robusto. No debe haber registro público (sign-up abierto). Los usuarios se gestionarán mediante el panel de administración de Django o una invitación manual en la base de datos.
- **Permisos:** Todas las vistas (API y Frontend) deben requerir autenticación (`IsAuthenticated` en DRF).
