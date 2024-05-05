from rest_framework import generics, status
from django.views.generic.base import TemplateView
from rest_framework.response import Response

from .serializers import GameSerializer, MonsterSerializer, LogSerializer
from .mixins import DestroyMixin
from .models import Game, Monster, Log


class HomePageView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["games"] = Game.objects.all()
        return context


class GameView(generics.RetrieveUpdateAPIView, DestroyMixin):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameListView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class MonsterView(generics.RetrieveUpdateAPIView, DestroyMixin):
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer


class MonsterListView(generics.ListCreateAPIView):
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer


class LogsView(generics.RetrieveUpdateAPIView, DestroyMixin):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class LogListView(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def get_queryset(request):
        game_id = request.kwargs.get("game_id")
        if game_id:
            return Log.objects.filter(game_id=game_id)
        return []

    def delete(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
