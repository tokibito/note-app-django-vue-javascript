from django.urls import path, include
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required

from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # 管理画面
    path('admin/', admin.site.urls),
    # ログイン
    path(
        'login',
        auth_views.LoginView.as_view(
            template_name='login.html',
            redirect_authenticated_user=True),
        name='login'),
    # ログアウト
    path(
        'logout',
        auth_views.LogoutView.as_view(
            next_page='login'),
        name='logout'),

    # APIドキュメント
    path('docs/', include_docs_urls(title='API', public=False)),
    # ノートアプリケーションのAPI
    path('note/', include('note.urls')),

    # ノートアプリケーションの画面
    path('', ensure_csrf_cookie(login_required(render)),
         kwargs={'template_name': 'index.html'}, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # staticfilesのファイルを配信

# デバッグ時のみdjango-debug-toolbarのURLを追加
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path(r'__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
