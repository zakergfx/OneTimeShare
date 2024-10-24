from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Ticketing API",
        default_version='v1',
        description="Free to use",
        # terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="zakergfx@gmail.com"),
        # license=openapi.License(name="License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url="https://app.loicktest.be/api/"
)

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

