# Generated by Django 5.1.1 on 2025-07-17 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('department', models.CharField(choices=[('Administration', 'Administration'), ('Medical', 'Medical'), ('Nursing', 'Nursing'), ('Support', 'Support'), ('Technical', 'Technical')], max_length=30)),
                ('contact_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Staff Members',
                'ordering': ['first_name'],
            },
        ),
    ]
