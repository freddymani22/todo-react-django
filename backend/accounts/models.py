from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.contrib.auth.password_validation import validate_password


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, email, is_superuser=False, **kwargs):
        if not username:
            raise ValueError('Users must have an username')
        if email:
            email = self.normalize_email(email)
        user = self.model(username=username, password=password, email=email,
                          is_active=True, is_superuser=is_superuser, **kwargs)
        if password and not is_superuser:
            try:
                validate_password(password)
            except:
                raise ValueError("error")

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        # extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, email, is_superuser=True, ** extra_fields)


class CustomUser(AbstractUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=30)
    email = models.EmailField(unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group, blank=True, related_name='customuser_set')
    user_permissions = models.ManyToManyField(
        Permission, blank=True, related_name='customuser_permissions')

    objects = CustomUserManager()
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
