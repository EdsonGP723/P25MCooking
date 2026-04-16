from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet

# El router se encarga de crear las URLs de manera automática para el ViewSet
router = DefaultRouter()
router.register(r'', RecipeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
