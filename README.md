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

#### `POST /api/auth/register`
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
    "message": "Отправленные данные имеют неверный формат",
    "errors": [
        {
            "message": "Почта должна быть указана в верном формате",
            "param": "email"
        },
        {
            "message": "Пароль должен содержать не менее 8 символов",
            "param": "password"
        },
        {
            "message": "Имя не должно быть пустым",
            "param": "name"
        }
    ]
}
```

```json
{
    "message": "Пользователь с почтой zver_coda@mail.ru уже существует",
    "errors": []
}
```

#### `GET /api/auth/activate/:token`

Подтверждение почты, если токен валидный, то пользователь добавляется в базу данных и может авторизироваться

Response
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding",
        "avatar": "/public/uploads/1.jpg"
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

#### `POST /api/auth/login`
Авторизация

В теле запроса обязательные поля: email и password

Request
```json
{
    "email": "zver_coda@mail.ru",
    "password": "11111111"
}
```

Response
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding",
        "avatar": "/public/uploads/1.jpg"
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

```json
{
    "message": "Отправленные данные имеют неверный формат",
    "errors": [
        {
            "message": "Почта должна быть указана в верном формате",
            "param": "email"
        },
        {
            "message": "Пароль должен содержать не менее 8 символов",
            "param": "password"
        },
        {
            "message": "Имя не должно быть пустым",
            "param": "name"
        }
    ]
}
```

#### `POST /api/auth/logout`
Выйти из системы

Запрос пустой. В ответ приходит status 200

#### `GET /api/auth/refresh`
Обновить токены

Response
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cr4",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMzAyMjk3MiwiaWF0IjoxNjMzMDIyOTcyfQ.Gbm-xreWGjbvjQQ1gdd4xXABFPsF3gXqDwfQzGfQ3yQ
",
    "user": {
        "email": "zver_coda@mail.ru",
        "id": 1,
        "name": "Master of coding",
        "avatar": "/public/uploads/1.jpg"
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

#### `PUT /api/profile`
Обновляет данные в профиле

Заголовок запроса обязательно должен содержать Authorization с Bearer Token

Все поля необязательные, в теле запроса указывать только те данные, которые нужно изменить

Поле contact_name (если указывается контакт) не должно быть пустые, чтобы удалить контакт, необходимо отправить url: ""

Request
```json
{
    "name": "Ivan",
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
        "skills": "#Скейтбордист"
    }
}
```

Response (status: 200)
```
OK
```

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

#### `GET /api/profile`

Получение информации о пользователе

Заголовок запроса обязательно должен содержать Authorization с Bearer Token

Приходит JSON с информацией о пользователе

Аватар лежит в статичной папке, его можно получить по url: Host + Response.avatar (например http://localhost:8081/public/uploads/3.jpg)

Response
```json
{
    "name": "God Of The System",
    "age": 100500,
    "organization": "omgtu",
    "avatar": "/public/uploads/3.jpg",
    "resume": {
        "profession": "Программист",
        "about_me": "О себе",
        "skills": "#Системныйлорд"
    },
    "contacts": [
        {
            "contact_name": "vk",
            "url": "@syslord814132"
        }
    ],
    "candidates": [
        {
            "id": 9,
            "isTeamOwnerAccept": true,
            "isUserAccept": false,
            "message": "Присоединяйся к нам!",
            "createdAt": "2021-12-03T08:37:42.000Z",
            "updatedAt": "2021-12-03T08:37:42.000Z",
            "userId": 2,
            "projectId": 39,
            "project": {
                "id": 39,
                "title": "Хорошее название для проекта",
                "description": "desc",
                "looking_for": "seygeys",
                "slogan": "devis",
                "contacts": "911",
                "createdAt": "2021-12-03T08:18:15.000Z",
                "updatedAt": "2021-12-03T08:18:15.000Z"
            }
        }
    ]
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

#### `POST /api/profile/avatar`

Загрузка аватарки

Заголовок запроса обязательно должен содержать Authorization с Bearer Token

Отправляется картинка, в заголовке запроса указать `Content-Type: multipart/form-data`. Ключ для файла `avatar`

Response (status: 200)
```
OK
```

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

status 404

```json
{
    "message": "Multer Error",
    "errors": []
}
```

status 404

```json
{
    "message": "Отправленный аватар не найден",
    "errors": []
}
```

### Проект

#### `POST /api/project`

Создание проекта

Request
```json
{
    "title": "proj_name",
    "description": "desc",
    "looking_for": "seygeys",
    "slogan": "devis",
    "contacts": "911"
}
```

Response
```json
{
    "id": 35,
    "title": "proj_name",
    "description": "desc",
    "looking_for": "seygeys",
    "slogan": "devis",
    "contacts": "911",
    "updatedAt": "2021-12-01T20:08:17.660Z",
    "createdAt": "2021-12-01T20:08:17.660Z"
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

#### `GET /api/project/:project_id`

Получение проекта по его id.

`User` - пользователь, который сделал запрос (он может быть как участником проекта, так и простым искателем приключений). `isOwner` - является ли он владельцем проекта (тимлидом), `isMember` - является ли он участником проекта (если он владелец, то оба поля `true`)

Response
```json
{
    "title": "proj_name",
    "description": "desc",
    "looking_for": "seygeys",
    "slogan": "devis",
    "contacts": "911",
    "members": [
        {
            "role": "Работяга",
            "isOwner": true,
            "user": {
                "name": "Andrey Vasilev",
                "avatar": null,
                "id": 1
            }
        }
    ],
    "user": {
        "isOwner": true,
        "isMember": true,
        "email": "vasilev_mail@gmail.com",
        "id": 1,
        "name": "Andrey Vasilev",
        "iat": 1638389272,
        "exp": 1638390172
    }
}
```

#### `PUT /api/project/:project_id`

Request
```json
{
    "title": "Хорошее название для проекта",
    "description": "Описание",
    "looking_for": "gayorgies",
    "slogan": "devis",
    "contacts": "911"
}
```

Response
```json
{
    "title": "Хорошее название для проекта",
    "description": "Описание",
    "looking_for": "gayorgies",
    "slogan": "devis",
    "contacts": "911"
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

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```

#### `DEL /api/project/:project_id`

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```

#### `GET /api/project/:project_id/candidate`

Получение списка всех кандидатов. Запрос может делать только создатель проекта.

Response
```json
[
    {
        "id": 9,
        "isTeamOwnerAccept": true,
        "isUserAccept": false,
        "message": "Присоединяйся к нам!",
        "createdAt": "2021-12-03T08:37:42.000Z",
        "updatedAt": "2021-12-03T08:37:42.000Z",
        "userId": 2,
        "projectId": 39,
        "user": {
            "id": 2,
            "avatar": null,
            "name": "Ivan",
            "resume": {
                "profession": "Готов к любой работе"
            }
        }
    }
]
```

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```

#### `GET /api/project/:project_id/candidate/:user_id`

Получение кандидата в проект по id. Запрос может делать только создатель проекта.

Response
```json
{
    "id": 9,
    "isTeamOwnerAccept": true,
    "isUserAccept": false,
    "message": "Присоединяйся к нам!",
    "createdAt": "2021-12-03T08:37:42.000Z",
    "updatedAt": "2021-12-03T08:37:42.000Z",
    "userId": 2,
    "projectId": 39,
    "user": {
        "id": 2,
        "avatar": null,
        "name": "Ivan",
        "resume": {
            "profession": "Готов к любой работе"
        }
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

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```

#### `POST /api/project/:project_id/candidate`

Запрос ОТ ПОЛЬЗОВАТЕЛЯ на вступление в команду. Или запрос, чтобы принять приглашение в проект.

Request
```json
{
    "message": "Уважаемые программисты, возьмите меня в вашу команду, пожалуйста"
}
```

Response
```json
{
    "accepted": false,
    "isTeamOwnerAccept": false,
    "isUserAccept": true
}
```

Response (в случае принятия заявки)
```json
{
    "accepted": true,
    "isTeamOwnerAccept": true,
    "isUserAccept": true
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

status 400

```json
{
    "message": "Пользователь уже является участником команды",
    "errors": []
}
```

#### `POST /api/project/:project_id/candidate/:user_id`

Приглашение пользователя в команду ОТ СОЗДАТЕЛЯ ПРОЕКТА. Или запрос, чтобы принять заявку пользователя. 

Request
```json
{
    "message": "Дорогой друг, приглашаю тебя в наш проект, будем вместе программировать и зарабатывать"
}
```

Response
```json
{
    "accepted": false,
    "isTeamOwnerAccept": true,
    "isUserAccept": false
}
```

Response (в случае принятия заявки)
```json
{
    "accepted": true,
    "isTeamOwnerAccept": true,
    "isUserAccept": true
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

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```

#### `DEL /api/project/:project_id/candidate/:user_id`

Отменить заявку в проект.

Примеры ошибок:

status 401

```json
{
    "message": "Пользователь не авторизован",
    "errors": []
}
```

status 403

```json
{
    "message": "Пользователь не является создателем проекта",
    "errors": []
}
```