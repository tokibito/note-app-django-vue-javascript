from django.urls import path

from .views import PageListCreateAPI, PageRetrieveUpdateDestroyAPI

urlpatterns = [
    path(
        'page/',
        PageListCreateAPI.as_view(),
        name='page-list'),
    path(
        'page/<int:pk>',
        PageRetrieveUpdateDestroyAPI.as_view(),
        name='page-detail'),
]
