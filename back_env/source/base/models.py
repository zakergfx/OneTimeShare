from django.db import models
from cryptography.fernet import Fernet
import os

class Secret(models.Model):
    uri = models.CharField(max_length=64, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    expirationdate = models.PositiveIntegerField(null=False, blank=False)
    isonce = models.BooleanField(null=False, blank=False)

    ENCRYPTIONKEY = os.getenv("ENCRYPTIONKEY")

    fernet = Fernet(ENCRYPTIONKEY.encode())

    def save(self, *args, **kwargs):
        self.content = self.fernet.encrypt(self.content.encode()).decode()
        super().save(*args, **kwargs)

    def getContent(self):
        return self.fernet.decrypt(self.content.encode()).decode()


