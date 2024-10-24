from django.db import models
from django.contrib.auth.models import User

class Secret(models.Model):
    uri = models.CharField(max_length=64, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    expirationdate = models.PositiveIntegerField(null=False, blank=False)
    isonce = models.BooleanField(null=False, blank=False)