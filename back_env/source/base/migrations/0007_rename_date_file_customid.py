# Generated by Django 4.1.11 on 2024-09-01 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_file_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='date',
            new_name='customid',
        ),
    ]