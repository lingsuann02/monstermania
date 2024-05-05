"""
URL configuration for monstermania project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from game import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "",
        views.HomePageView.as_view(),
    ),
    path("api/game/<uuid:pk>", views.GameView.as_view()),
    path("api/games", views.GameListView.as_view()),
    path("api/monster/<uuid:pk>", views.MonsterView.as_view()),
    path("api/monsters", views.MonsterListView.as_view()),
    path("api/log/<uuid:pk>", views.LogsView.as_view()),
    path("api/logs/<uuid:game_id>", views.LogListView.as_view()),
    path("api/log", views.LogListView.as_view()),
]
