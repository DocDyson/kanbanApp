from rest_framework import generics, viewsets, status
from rest_framework.views import Response
from rest_framework.decorators import action

from django.contrib.auth import get_user_model

from .serializers import UserSerializer, BoardSerializer, TaskSerializer, ColumnSerializer, CommentSerializer, UpdateTaskOrderSerializer, UpdateColumnOrderSerializer
from .models import Board, Task, Column, Comment
from django.db.models import F

User = get_user_model()


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BoardView(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        column = serializer.validated_data['column']
        task_count = Task.objects.filter(column=column).count()

        serializer.validated_data['order'] = task_count + 1
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def update_order(self, request, pk=None):
        serializer = UpdateTaskOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task = Task.objects.get(pk=pk)
        old_id = serializer.validated_data['old_id']
        new_id = serializer.validated_data['new_id']
        column_id = serializer.validated_data['column']
        column = Column.objects.get(pk=column_id)

        # Change both columns
        if task.column != column:
            tasks_to_update_old_column = Task.objects.filter(column=task.column, order__gt=old_id)
            tasks_to_update_old_column.update(order=F('order') - 1)

            tasks_to_update_new_column = Task.objects.filter(column=column, order__gte=new_id)
            tasks_to_update_new_column.update(order=F('order') + 1)

            task.column = column

        # Change single column
        if old_id < new_id:
            tasks_to_update = Task.objects.filter(column=column, order__gt=old_id, order__lte=new_id)
            tasks_to_update.update(order=F('order') - 1)
        elif old_id > new_id:
            tasks_to_update = Task.objects.filter(column=column, order__gte=new_id, order__lt=old_id)
            tasks_to_update.update(order=F('order') + 1)

        task.order = new_id
        task.save()

        return Response(serializer.data)


class ColumnView(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

    def create(self, request):
        serializer = ColumnSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        board = serializer.validated_data['board']
        column_count = Column.objects.filter(board=board).count()

        serializer.validated_data['order'] = column_count + 1
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def update_order(self, request, pk=None):
        serializer = UpdateColumnOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        column = Column.objects.get(pk=pk)
        old_id = serializer.validated_data['old_id']
        new_id = serializer.validated_data['new_id']
        board_id = serializer.validated_data['board']
        board = Board.objects.get(pk=board_id)

        if old_id < new_id:
            columns_to_update = Column.objects.filter(board=board, order__gt=old_id, order__lte=new_id)
            columns_to_update.update(order=F('order') - 1)
        elif old_id > new_id:
            columns_to_update = Column.objects.filter(board=board, order__gte=new_id, order__lt=old_id)
            columns_to_update.update(order=F('order') + 1)

        column.order = new_id
        column.save()

        return Response(serializer.data)

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
