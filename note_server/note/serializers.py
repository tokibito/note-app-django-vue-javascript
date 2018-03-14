from rest_framework import serializers
from rest_framework import fields

from .models import Page


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'id', 'title', 'content', 'created_at', 'updated_at',
        ]

    id = fields.IntegerField(read_only=True)
    created_at = fields.DateTimeField(read_only=True)
    updated_at = fields.DateTimeField(read_only=True)
