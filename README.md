# MonsterMania

Monster Mania is the game where you bet on which monster eats the most!
Check it out yourself at https://monstermania.vercel.app/

## Requirements

### Rules

- Each player is allocated a monster
  - each monster has 25 HP
- Each round, each monster loses 1 HP
- Each round, each monster is fed a snack
  - each snack has provides 1 or 2 HP or do nothing at all
  - but some snacks are poisoned and have a 20% of removing HP instead
- A monster is KO-ed when it runs out of HP
- The game ends when only one monster is alive, the remaining monster's player is the winner

### Game features

- Game runs can be re-played
- Multi language support
- Light/Dark mode

## Local development

### Instructions

In the root folder of this repository, run the following to setup the Monster Mania api locally.

```bash
brew install pyenv postgresql
pyenv install 3.11.6
pyenv local 3.11.6
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

To run the web server, run the following:

```bash
cd web
npm i
npm run dev
```

There are a few FE unit tests covering critical paths, to run those:

```bash
cd web
npm run test
```

### Screenshots

<img width="1624" alt="mm_splash" src="https://github.com/lingsuann02/monstermania/assets/31858814/5789cda0-a1b1-4781-83c5-4fd7f45b5ca7">
<img width="1624" alt="mm_new" src="https://github.com/lingsuann02/monstermania/assets/31858814/08b88eb2-0226-47de-89ff-55d67467f43e">
<img width="1624" alt="mm_settings" src="https://github.com/lingsuann02/monstermania/assets/31858814/9de7d417-bb38-4766-ad7f-bc50f2ec8b57">
<img width="1624" alt="mm_winner" src="https://github.com/lingsuann02/monstermania/assets/31858814/b1cdf640-44e2-437f-9579-5c9ea33e0b50">



