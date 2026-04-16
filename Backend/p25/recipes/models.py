from django.db import models
from cloudinary.models import CloudinaryField

class Recipe(models.Model):
    # Opciones de categoría
    CATEGORY_CHOICES = [
        ('Desayuno', 'Desayuno'),
        ('Comida', 'Comida'),
        ('Cena', 'Cena'),
        ('Postre', 'Postre'),
        ('Bebida', 'Bebida'),
    ]

    nombre = models.CharField(max_length=200, help_text="Nombre del platillo.")
    categoria = models.CharField(max_length=50, choices=CATEGORY_CHOICES, help_text="Categoría de la receta.")
    imagen = CloudinaryField('imagen', help_text="URL de la imagen gestionada en Cloudinary.")
    instrucciones = models.TextField(help_text="Paso a paso de la preparación.")
    # Usamos JSONField para guardar la lista de ingredientes (strings) como requirió el usuario.
    ingredientes = models.JSONField(help_text="Lista de ingredientes necesarios guardados como estructura JSON.")
    porciones = models.IntegerField(help_text="Cantidad de personas/porciones.")
    tiempo_preparacion = models.CharField(max_length=50, help_text='Tiempo estimado (ej: "30 min").')

    # Metadata y representación
    class Meta:
        verbose_name = "Receta"
        verbose_name_plural = "Recetas"
        ordering = ['-id']

    def __str__(self):
        return f"{self.nombre} ({self.categoria})"
