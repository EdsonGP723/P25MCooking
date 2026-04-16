from rest_framework.renderers import JSONRenderer

class StandardResponseRenderer(JSONRenderer):
    '''
    Renderer personalizado que intercepta todas las respuestas de DRF.
    Empaqueta la respuesta siempre bajo el formato:
    { "data": payload, "message": "..." }
    Omitiendo temporalmente la paginación a petición del usuario.
    '''
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code

        # Determinar el mensaje principal
        message = ""
        if status_code >= 400:
            # En caso de error, el payload data suele contener los errores
            message = "Ha ocurrido un error en la solicitud."
            # Simplificamos extrayendo el error principal si viene en format dict
            if isinstance(data, dict):
                first_key = list(data.keys())[0]
                if isinstance(data[first_key], list):
                    message = f"{first_key}: {data[first_key][0]}"
                else:
                    message = str(data[first_key])
            response_data = None
        else:
            message = "Operación exitosa."
            response_data = data

        response_dict = {
            'data': response_data,
            'message': message
        }

        # Llamar al render original con la nueva estructura
        return super().render(response_dict, accepted_media_type, renderer_context)
