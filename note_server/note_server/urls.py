from django.urls import path, include
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required

from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'login',
        auth_views.LoginView.as_view(
            template_name='login.html',
            redirect_authenticated_user=True),
        name='login'),
    path(
        'logout',
        auth_views.LogoutView.as_view(
            next_page='login'),
        name='logout'),

    # API
    path('docs/', include_docs_urls(title='CMS API', public=False)),
    path('note/', include('note.urls')),

    path('', login_required(render), kwargs={'template_name': 'index.html'}, name='top'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path(r'__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
