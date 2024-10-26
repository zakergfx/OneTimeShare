# backend/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# Définissez le module de configuration de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialiser Celery
app = Celery('backend')

# Charger les configurations de Django pour Celery
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'

# Rechercher automatiquement les tâches définies dans les applications Django
app.autodiscover_tasks()
