from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Board, Column, Task, Comment
from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import TokenSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'first_name', 'last_name', 'email', 'description', 'avatar']


class TokenSerializer(TokenSerializer):
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = ['key', 'user']


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['pk', 'task', 'author', 'text',]


class TaskSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['pk', 'title', 'column', 'user', 'description', 'order', 'comments',]


class UpdateTaskOrderSerializer(serializers.Serializer):
    old_id = serializers.IntegerField()
    new_id = serializers.IntegerField()
    column = serializers.IntegerField()

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ['pk', 'title', 'tasks', 'order', 'board']

class UpdateColumnOrderSerializer(serializers.Serializer):
    old_id = serializers.IntegerField()
    new_id = serializers.IntegerField()
    board = serializers.IntegerField()

class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True)

    class Meta:
        model = Board
        fields = ['pk', 'title', 'columns',]

    def create(self, validated_data):
        columns_data = validated_data.pop('columns')
        board = Board.objects.create(**validated_data)
        for column_data in columns_data:
            Column.objects.create(board=board, **column_data)
        return board
