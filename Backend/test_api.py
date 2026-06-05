import requests
import json
import os
import time

BASE_URL = "http://localhost:8000/api"

# Login
login_data = {
    "username": "Edson",
    "password": "teseo1007@"
}

print("Iniciando sesión...")
for i in range(5):
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
        response.raise_for_status()
        token = response.json().get('data', {}).get('access') or response.json().get('access')
        print("Login exitoso.")
        break
    except Exception as e:
        print(f"Error login: {e}, esperando 2 seg...")
        time.sleep(2)

headers = {
    "Authorization": f"Bearer {token}"
}

recipes = [
    {
        "nombre": "Huevos Rancheros",
        "categoria": "Desayuno",
        "tiempo_preparacion": "15 min",
        "porciones": "2",
        "ingredientes": json.dumps(["2 Tortillas de maíz", "2 Huevos", "Salsa ranchera", "Frijoles refritos", "Queso fresco"]),
        "instrucciones": "1. Fríe ligeramente las tortillas.\n2. Haz los huevos estrellados.\n3. Sirve sobre las tortillas con frijoles y salsa.",
        "image_url": "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=500"
    },
    {
        "nombre": "Spaghetti a la Boloñesa",
        "categoria": "Comida",
        "tiempo_preparacion": "45 min",
        "porciones": "4",
        "ingredientes": json.dumps(["400g Spaghetti", "500g Carne molida", "Salsa de tomate", "Cebolla", "Ajo", "Parmesano"]),
        "instrucciones": "1. Sofreír cebolla y ajo.\n2. Agregar carne molida hasta dorar.\n3. Añadir la salsa y cocinar lento.\n4. Servir sobre la pasta cocida.",
        "image_url": "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500"
    },
    {
        "nombre": "Ensalada César Clásica",
        "categoria": "Cena",
        "tiempo_preparacion": "20 min",
        "porciones": "2",
        "ingredientes": json.dumps(["Lechuga romana", "Aderezo César", "Crutones", "Queso Parmesano", "Pechuga de pollo a la plancha"]),
        "instrucciones": "1. Trocear la lechuga.\n2. Mezclar con el aderezo.\n3. Agregar los crutones, queso y pollo cortado.",
        "image_url": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500"
    },
    {
        "nombre": "Tarta de Manzana Clásica",
        "categoria": "Postre",
        "tiempo_preparacion": "60 min",
        "porciones": "8",
        "ingredientes": json.dumps(["Masa quebrada", "6 Manzanas peladas", "Azúcar", "Canela", "Mantequilla"]),
        "instrucciones": "1. Cortar las manzanas en rodajas.\n2. Mezclar con azúcar y canela.\n3. Rellenar la masa y hornear a 180°C por 45 mins.",
        "image_url": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500"
    },
    {
        "nombre": "Mojito de Fresa",
        "categoria": "Bebida",
        "tiempo_preparacion": "5 min",
        "porciones": "1",
        "ingredientes": json.dumps(["Fresas frescas", "Hojas de menta", "Ron blanco", "Agua mineral", "Azúcar", "Hielo"]),
        "instrucciones": "1. Macerar fresas, menta y azúcar.\n2. Añadir hielo y el ron.\n3. Completar con agua mineral.",
        "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500"
    }
]

created_ids = []

for r in recipes:
    print(f"Descargando imagen para {r['nombre']}...")
    img_resp = requests.get(r['image_url'])
    with open("temp_img.jpg", "wb") as f:
        f.write(img_resp.content)
    
    print(f"Creando receta {r['nombre']}...")
    files = {
        'imagen': ('temp_img.jpg', open('temp_img.jpg', 'rb'), 'image/jpeg')
    }
    data = {
        "nombre": r["nombre"],
        "categoria": r["categoria"],
        "tiempo_preparacion": r["tiempo_preparacion"],
        "porciones": r["porciones"],
        "ingredientes": r["ingredientes"],
        "instrucciones": r["instrucciones"]
    }
    
    resp = requests.post(f"{BASE_URL}/recipes/", headers=headers, data=data, files=files)
    if resp.status_code in [200, 201]:
        rec = resp.json()
        if 'data' in rec:
            rec = rec['data']
        created_ids.append(rec.get('id', 'N/A'))
        print(f"Éxito: {r['nombre']}")
    else:
        print(f"Error en {r['nombre']}:", resp.status_code, resp.text)

print(f"IDs de recetas creadas: {created_ids}")

# Verificar detalle de la última receta
if created_ids and created_ids[-1] != 'N/A':
    last_id = created_ids[-1]
    print(f"Verificando detalle de receta ID: {last_id}")
    resp = requests.get(f"{BASE_URL}/recipes/{last_id}/", headers=headers)
    print("GET Detail Status:", resp.status_code)
    data_ret = resp.json().get('data', resp.json())
    print("Ingredientes devueltos:", data_ret.get('ingredientes'))
