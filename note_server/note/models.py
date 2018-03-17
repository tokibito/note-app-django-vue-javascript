from django.db import models
from django.conf import settings


class Page(models.Model):
    """ページモデル
    """
    class Meta:
        verbose_name = verbose_name_plural = "ページ"
        ordering = ('id',)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name="ユーザー")
    title = models.CharField("タイトル", max_length=200)
    content = models.TextField("内容")
    created_at = models.DateTimeField("作成日時", auto_now_add=True)
    updated_at = models.DateTimeField("更新日時", auto_now=True)

    def __str__(self):
        return "{title}".format(title=self.title)
