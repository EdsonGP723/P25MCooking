import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'p25.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = "Edson"
email = "edsonhulk20010@gmail.com"
password = "teseo1007@"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"User {username} created successfully.")
else:
    # Update password just in case
    u = User.objects.get(username=username)
    u.set_password(password)
    u.save()
    print(f"User {username} already exists. Password updated.")
