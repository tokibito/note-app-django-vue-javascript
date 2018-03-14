from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Page
from .serializers import PageSerializer


class PageListCreateAPI(generics.ListCreateAPIView):
    serializer_class = PageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Page.objects.filter(
            user=self.request.user,
        ).order_by('-updated_at', '-id')

    def perform_create(self, serializer):
        """追加時のフック
        """
        serializer.save(user=self.request.user)


class PageRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Page.objects.filter(
            user=self.request.user,
        )