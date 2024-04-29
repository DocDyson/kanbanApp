# kanbanApp

Wymagania:

- Node 18
- Python 3.11

Instalacja

git clone https://github.com/DocDyson/kanbanApp.git

Klient

1. Otwieramy folder z pobranym repozytorium
2. Otwieramy folder z projektem:

    cd client

3. Sprawdzamy wersję Node

    node -v

4. Instalujemy paczki

    npm i

5. Uruchamiamy klienta

    npm run dev

6. Aplikacja pracuje lokalnie pod adresem localhost:3000


Baza danych

1. Instalujemy bazę danych PostgreSQL i klienta (np. pgAdmin 4)
2. Tworzymy bazę danych o nazwie np. db_kanban


Serwer

1. Otwieramy folder z projektem:

    cd server

2. Sprawdzamy wersję Python

    py --version

3. Instalujemy paczki

    pip install -r requirements.txt

4. Tworzymy nowy plik o nazwie .env z poniższą zawartością (w zaznaczonych miejscah pod DATABASE_URL wprowadzamy użytkownika i hasło do bazy):

(Przykładowa i czytelna wersja znajduje się w pliku .env.example)

    SECRET_KEY="asdafasdfsdf"
    DATABASE_URL='postgres://postgres:root@localhost:5432/db_kanban'
		użytkownik DB ^^      ^^ hasło DB
    ALLOWED_HOSTS="localhost , 127.0.0.1"
    CSRF_TRUSTED_ORIGINS="http://localhost"
    DEBUG=True

5. Uruchamiamy migrację danych

    py manage.py migrate

6. Uruchamiamy projekt

    py manage.py runserver

7. Projekt pracuje lokalnie pod adresem: localhost:8000
