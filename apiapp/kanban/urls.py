from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from .views import UserView, BoardView, TaskView, ColumnView, CommentView
from rest_framework import routers

router = routers.SimpleRouter()
router.register('tasks', TaskView)
router.register('columns', ColumnView)
router.register('boards', BoardView)
router.register('comments', CommentView)

urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('users/', UserView.as_view(), name='user-list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += router.urls
