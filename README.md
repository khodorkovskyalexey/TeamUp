# TeamUp server

Default port: 8081

## How to start?

You need to clone repository:
[GitLab](https://gitlab.com/terminator5/teamup-backend)

Add filled .env file in root directory (see .env.example file for writing)

In this folder you need to run:
`npm install`
or
`yarn`

Then you need to execute the command for starting server:
`npm run start`
or
`yarn start`

## Endpoints

### Авторизация/регистрация

#### `POST /register`
Регистрация

В теле запроса обязательные поля: name, email и password. Почта должа быть указана в корректном формате, пароль должен состоять из 8 и более символов

На указанную почту приходит письмо с ссылкой на активацию аккаунта

В ответ приходит status: 200

Request
```json
{
    "name": "Master of coding",
    "email": "zver_coda@mail.ru",
    "password": "11111111"
}
```

Примеры ошибок:

status 400

```json
{
    "message": "Почта или пароль имеют неверный формат",
    "errors": []
}
```

```json
{
    "message": "Пользователь с почтой zver_coda@mail.ru уже существует",
    "errors": []
}
```

#### `GET /activate/:token`

Подтверждение почты, если токен валидный, то пользователь добавляется в базу данных и может авторизироваться

Resonse
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding"
    }
}
```

Примеры ошибок:

status 400

```json
{
    "message": "Пользователь уже существует",
    "errors": []
}
```

```json
{
    "message": "Ссылка недействительна!",
    "errors": []
}
```

#### `POST /login`
Авторизация

В теле запроса обязательные поля: email и password

Request
```json
{
    "email": "zver_coda@mail.ru",
    "password": "11111111"
}
```

Resonse
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding"
    }
}
```

Примеры ошибок:

status 400

```json
{
    "message": "Пароль неверный",
    "errors": []
}
```

```json
{
    "message": "Пользователь с почтой zver_coda@mail.ru не найден",
    "errors": []
}
```

#### `POST /logout`
Выйти из системы

Запрос пустой. В ответ приходит status 200

#### `GET /refresh`
Обновить токены

Resonse
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding"
    }
}
```

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

### Профиль пользователя

#### `PUT /profile`
Обновляет данные в профиле

Заголовок запроса обязательно должен содержать Authorization с Bearer Token

Все поля необязательные, в теле запроса указывать только те данные, которые нужно изменить

Request
```json
{
    "name": "Ivan",
    "avatar": "http",
    "age": 10,
    "organization": "omgtu",
    "contacts": [
        {
            "contact_name": "vk",
            "url": "@zver_coda"
        }
    ],
    "resume": {
        "profession": "Дизайнер",
        "about_me": "О себе",
        "skills": ""
    }
}
```

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
