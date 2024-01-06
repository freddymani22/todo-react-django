
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import json
from rest_framework import generics, permissions
from .serializers import UserSerializer, TaskSerializer
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date
from django.db.models import Q


from tasks.models import Task
from accounts.models import CustomUser


# Create your views here.


class UserAccountCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


@api_view(["POST"])
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(password)
        if username is None and password is None:
            return Response({'detail': 'Please provide username and password'}, status=400)
        user = authenticate(username=username, password=password)
        print(username)
        if user is None:
            return Response({'detail': 'Incorrect username or password'}, status=400)

        login(request, user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({'access_token': access_token, 'detail': 'Successfully logged in'})
    elif request.method == 'GET':
        return Response({'message': 'This is a GET request'})


@api_view(["POST", "GET"])
def logout_view(request):
    token = request.META
    logout(request)

    return Response({'detail': 'logout successful'})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def home_view(request):
    if request.method == 'GET':
        return Response({"greet": f"Hello!! {request.user.username.title()}, welcome to homepage!"})


class TaskListAPIView(generics.ListAPIView):
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'timestamp'

    def get_queryset(self):
        year = self.kwargs['year']
        month = self.kwargs['month']
        day = self.kwargs['day']

        target_date = date(year=int(year), month=int(month), day=int(day))
        qs = Task.objects.filter(user=self.request.user).filter(
            timestamp=target_date)

        return qs


class TaskCreateAPIView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskUpdateAPIView(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class TaskDeleteApiView(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
