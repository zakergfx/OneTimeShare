from django.urls import path
from base import views

urlpatterns = [

    path("secrets/", views.manageSecrets),
    path("secrets/<str:secretUri>", views.getSecretDetails),

    path("sendmail", views.sendMail),

    path("testing/", views.testing),

   
]