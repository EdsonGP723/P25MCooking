from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

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
        '''
        if not isinstance(value, list):
            raise serializers.ValidationError("Los ingredientes deben enviarse como una lista (array).")
        if len(value) == 0:
            raise serializers.ValidationError("La receta debe tener al menos un ingrediente.")
        return value
