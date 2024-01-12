from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation

from tasks.models import Task
from accounts.models import CustomUser

from datetime import date


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['username',
                  'email', 'password1', 'password2']

    def validate(self, data):
        password1 = data.get('password1')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Passwords do not match!")

        password_validation.validate_password(password1)
        return data

    def create(self, validated_data):
        password1 = validated_data.pop(
            'password1')
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        user = CustomUser.objects.create_user(
            password=password1, username=username, email=email)
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task', 'timestamp', 'duration', 'completed']

    def create(self, validated_data):
        user = self.context['request'].user
        date_array = validated_data.pop('timestamp', None)
        print(date_array)
        if date_array:
            validated_data['timestamp'] = date_array

        validated_data['user'] = user
        task = Task.objects.create(**validated_data)
        return task
