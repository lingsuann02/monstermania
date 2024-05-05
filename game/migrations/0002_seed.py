from django.db import migrations


def forwards(apps, schema_editor):
    Monster = apps.get_model("game", "Monster")
    Monster.objects.create(
        name="Kamela",
        type="""
───▄██▄─██▄───▄
─▄██████████▄███▄
─▌████████████▌
▐▐█░█▌░▀████▀░░
░▐▄▐▄░░░▐▄▐▄░░░░
""",
        color="FF33FF",
    )
    Monster.objects.create(
        name="Kitty",
        type="""
───▄▄─▄████▄▐▄▄▄▌
──▐──████▀███▄█▄▌
▐─▌──█▀▌──▐▀▌▀█▀
─▀───▌─▌──▐─▌
─────█─█──▐▌█
""",
        color="33A8FF",
    )
    Monster.objects.create(
        name="Moby",
        type="""
─────▀▄▀─────▄─────▄
──▄███████▄──▀██▄██▀
▄█████▀█████▄──▄█
███████▀████████▀
─▄▄▄▄▄▄███████▀
""",
        color="00B82A",
    )
    Monster.objects.create(
        name="Slomo",
        type="""
─▄▀▀▀▄────▄▀█▀▀█▄
▄▀─▀─▀▄▄▀█▄▀─▄▀─▄▀▄
█▄▀█───█─█▄▄▀─▄▀─▄▀▄
──█▄▄▀▀█▄─▀▀▀▀▀▀▀─▄█
─────▄████▀▀▀▀████─▀▄
""",
        color="B80000",
    )
    Monster.objects.create(
        name="Purra",
        type="""
───▄▄─▄████▄▐▄▄▄▌
──▐──████▀███▄█▄▌
▐─▌──█▀▌──▐▀▌▀█▀
─▀───▌─▌──▐─▌
─────█─█──▐▌█
""",
        color="FF7000",
    )
    Monster.objects.create(
        name="Sebastian",
        type="""
░░▄█▀▀▀░░░░░░░░▀▀▀█▄
▄███▄▄░░▀▄██▄▀░░▄▄███▄
▀██▄▄▄▄████████▄▄▄▄██▀
░░▄▄▄▄██████████▄▄▄▄
░▐▐▀▐▀░▀██████▀░▀▌▀▌▌
""",
        color="FF0000",
    )
    Monster.objects.create(
        name="Slowmo",
        type="""
───▄▄▄
─▄▀░▄░▀▄
─█░█▄▀░█
─█░▀▄▄▀█▄█▄▀
▄▄█▄▄▄▄███▀
""",
        color="0023FF",
    )
    Monster.objects.create(
        name="Dumbo",
        type="""
──███▅▄▄▄▄▄▄▄▄▄
─██▐████████████
▐█▀████████████▌▌
▐─▀▀▀▐█▌▀▀███▀█─▌
▐▄───▄█───▄█▌▄█
""",
        color="00FFC5",
    )
    Monster.objects.create(
        name="Goldie",
        type="""
───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
───█▒▒░░░░░░░░░▒▒█───
────█░░█░░░░░█░░█────
─▄▄──█░░░▀█▀░░░█──▄▄─
█░░█─▀▄░░░░░░░▄▀─█░░█
""",
        color="8BFF00",
    )


class Migration(migrations.Migration):
    dependencies = [
        ("game", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(forwards),
    ]
