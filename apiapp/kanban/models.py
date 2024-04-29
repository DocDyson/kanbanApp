from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    description = models.TextField(default='', blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True)


class Board(models.Model):
    title = models.CharField(max_length=50)


class Column(models.Model):
    title = models.CharField(max_length=50)
    board = models.ForeignKey(to=Board, blank=True, on_delete=models.CASCADE, related_name='columns')
    order = models.PositiveIntegerField(default=0)


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(to=User, blank=True, null=True, on_delete=models.SET_NULL)
    column = models.ForeignKey(to=Column, blank=True, on_delete=models.CASCADE, related_name='tasks')
    order = models.PositiveIntegerField(default=0)


class Comment(models.Model):
    text = models.CharField(max_length=150)
    task = models.ForeignKey(to=Task, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='authors')
