from django.contrib import admin
from .models import Board, Column, Task, User, Comment
from django.contrib.auth.admin import UserAdmin

class BoardAdmin(admin.ModelAdmin):
    list_display = ["pk", "title"]

class ColumnAdmin(admin.ModelAdmin):
    list_display = ["pk", "title"]

class TaskAdmin(admin.ModelAdmin):
    list_display = ["pk", "title", "order"]

class CommentAdmin(admin.ModelAdmin):
    list_display = ["pk", "text"]

class CustomUserAdmin(UserAdmin):
    list_display = ["pk", "avatar"]


admin.site.register(Board, BoardAdmin)
admin.site.register(Column, ColumnAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Comment, CommentAdmin)
