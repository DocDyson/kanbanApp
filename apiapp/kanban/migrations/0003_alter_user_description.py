# Generated by Django 5.0.1 on 2024-02-06 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("kanban", "0002_task_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="description",
            field=models.TextField(default=""),
        ),
    ]