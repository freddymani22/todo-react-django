from django.db import models
from accounts.models import CustomUser

# Create your models here.


class Task(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.CharField(max_length=200)
    timestamp = models.DateField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    duration = models.IntegerField()

    def __str__(self):
        return f'{self.user}-{self.task}'
