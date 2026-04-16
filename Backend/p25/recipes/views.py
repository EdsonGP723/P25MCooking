from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Recipe
from .serializers import RecipeSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    '''
    ModelViewSet provee automáticamente las acciones:
    list, create, retrieve, update, y destroy.
    '''
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    
    # Restricción: solo usuarios logueados (con JWT en el header)
    permission_classes = [IsAuthenticated]
