from rest_framework import serializers
import json
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

    def to_representation(self, instance):
        '''
        Modificamos la forma en que el objeto se convierte a JSON al enviarlo al Frontend.
        Interceptamos la respuesta y reemplazamos el valor crudo de 'imagen' 
        por la URL completa generada por Cloudinary.
        '''
        representation = super().to_representation(instance)
        # Si la receta tiene una imagen guardada
        if instance.imagen:
            # .url extrae la URL pública completa (https://res.cloudinary.com/...)
            representation['imagen'] = instance.imagen.url
        return representation

    def validate_nombre(self, value):
        '''
        Validación personalizada para el nombre de la receta.
        Asegura que no se puedan ingresar recetas sin nombre
        o con nombres demasiado cortos.
        '''
        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre debe tener al menos 3 caracteres.")
        return value

    def validate_ingredientes(self, value):
        '''
        Verifica que ingredientes sea una lista (JSON array).
        Si llega como string (ej. desde un FormData), intenta parsearlo.
        '''
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Los ingredientes deben ser un JSON array válido.")

        if not isinstance(value, list):
            raise serializers.ValidationError("Los ingredientes deben enviarse como una lista (array).")
        if len(value) == 0:
            raise serializers.ValidationError("La receta debe tener al menos un ingrediente.")
        return value
