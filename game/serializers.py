from rest_framework import serializers
from .models import Game, Monster, Log


class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = "__all__"


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"

    monsters = MonsterSerializer(read_only=True, many=True)
    monster_ids = serializers.ListField(required=False, child=serializers.UUIDField())

    def create(self, validated_data):
        game = Game.objects.create(
            name=validated_data.get("name"), settings=validated_data.get("settings")
        )
        if validated_data.get("monster_ids"):
            for monster_ids in validated_data["monster_ids"]:
                game.monsters.add(monster_ids)
        return game

    def update(self, instance, validated_data):
        if validated_data.get("name"):
            instance.name = validated_data.get("name")
        if validated_data.get("settings"):
            instance.settings = validated_data.get("settings")
        if validated_data.get("monster_ids"):
            for monster_ids in validated_data["monster_ids"]:
                instance.monsters.add(monster_ids)
        instance.save()
        return instance


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = "__all__"

    game = GameSerializer(required=False)
    game_id = serializers.UUIDField()
