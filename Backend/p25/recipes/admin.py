from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'porciones', 'tiempo_preparacion')
    list_filter = ('categoria',)
    search_fields = ('nombre', 'ingredientes')
