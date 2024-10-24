from rest_framework.serializers import ModelSerializer
from base import models
        
class SecretSerializer(ModelSerializer):
    class Meta:
        model = models.Secret
        fields = '__all__'
        