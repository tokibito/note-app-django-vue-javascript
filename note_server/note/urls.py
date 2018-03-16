from rest_framework.routers import DefaultRouter

from .views import PageViewSet

router = DefaultRouter()
router.register(r'page', PageViewSet, base_name='page')
urlpatterns = router.urls
