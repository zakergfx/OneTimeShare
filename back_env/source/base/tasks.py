# backend/tasks.py
from celery import shared_task
from . import models
import time

@shared_task
def removeExpiredSecrets():
    currentTimestamp = int(time.time())
    secretsToRemove = models.Secret.objects.filter(expirationdate__lt=currentTimestamp)
    secretsToRemove.delete()