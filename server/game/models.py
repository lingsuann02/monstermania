import uuid
from django.db import models


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]
        abstract = True


class Monster(BaseModel):
    name = models.CharField(max_length=200, unique=True)
    type = models.TextField()
    color = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Game(BaseModel):
    name = models.CharField(max_length=200, blank=True)
    monsters = models.ManyToManyField(Monster, blank=True)
    settings = models.JSONField(default=dict, null=True)

    def __str__(self):
        return self.name

    def monster_ids(self):
        return self.monsters.values_list("id", flat=True)


class Log(BaseModel):
    state = models.JSONField(default=None, null=True)
    game = models.ForeignKey(Game, blank=True, on_delete=models.CASCADE)
