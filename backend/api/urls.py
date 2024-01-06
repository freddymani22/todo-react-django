from django.urls import path
from .views import UserAccountCreateAPIView, TaskListAPIView, TaskCreateAPIView, TaskDeleteApiView, TaskUpdateAPIView, login_view, logout_view, home_view


urlpatterns = [
    path('', UserAccountCreateAPIView.as_view(), name='create-user'),
    path('<int:year>/<int:month>/<int:day>/',
         TaskListAPIView.as_view(), name='task-list'),
    path('task-update/<int:pk>/', TaskUpdateAPIView.as_view(), name='task-update'),
    path('task-delete/<int:pk>/', TaskDeleteApiView.as_view(), name='task-delete'),
    path('task-create/', TaskCreateAPIView.as_view(), name='task-create'),
    path('login/', login_view, name='api-login'),
    path('logout/', logout_view, name='api-logout'),
    path('home/', home_view, name='home-api')
]
