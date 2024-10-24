# Generated by Django 4.2.16 on 2024-10-20 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_secret_content_secret_expirationdate_secret_isonce'),
    ]

    operations = [
        migrations.RenameField(
            model_name='secret',
            old_name='isOnce',
            new_name='isonce',
        ),
        migrations.RemoveField(
            model_name='secret',
            name='expirationDate',
        ),
        migrations.AddField(
            model_name='secret',
            name='expirationdate',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]
