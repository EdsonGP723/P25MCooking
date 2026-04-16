---
trigger: always_on
---

## 2. Backend: Django & Django REST Framework (DRF)

- **Modelos:** Define siempre el método `__str__` y usa `help_text` en campos clave (ej. ingredientes, pasos de preparación). Prioriza PostgreSQL como motor de base de datos.
- **Serializadores:** Usa `ModelSerializer` para operaciones CRUD estándar. Implementa validaciones personalizadas en el método `validate_<field_name>`.
- **Vistas:** Prefiere `GenericAPIViews` o `ViewSets` para mantener el código DRY.
- **URLs:** Usa nombres de ruta claros y consistentes (ej. `api/recipes/`, `api/ingredients/`).
- **Seguridad:** No guardes secretos en `settings.py`. Usa variables de entorno (.env). Implementa autenticación JWT para el recetario.
- **Gestión de Imágenes:** Se utilizará **Cloudinary** para el almacenamiento de archivos multimedia.
  - Integrar `django-cloudinary-storage` y `cloudinary`.
  - Asegurar que el modelo de Receta use `CloudinaryField` para las fotos de los platillos.
