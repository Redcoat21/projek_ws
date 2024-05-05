# Important Notes

-   Branch master di github di lock, jadi tidak bisa dipush kesitu
-   Cara ngepushnya bikin branch baru pake `git checkout -b <nama_branch>`
-   Untuk lengkapnya soal git bisa baca di bagian `Appendix`
-   Di project ini harusnya gaada file `.env` silahkan dibikin sendiri dan taruh filenya di folder paling luar, strukturnya

    ```.env
    DEV_DB_NAME=                  # default: projek_ws
    DEV_DB_USER=                  # default: root
    DEV_DB_HOST=                  # default: localhost
    DEV_DB_PASSWORD=              # default:
    DEV_DB_PORT=                  # default: 3306
    DEV_DB_DIALECT=               # default: mysql

    TEST_DB_NAME=                 # default: projek_ws
    TEST_DB_DIALECT=              # default: sqlite

    MONGO_DB_NAME=                # default: projek_ws
    MONGO_DB_HOST=                # default: localhost
    MONGO_DB_PORT=                # default: 27017

    NODE_ENV=                     # default: development

    APP_HOST=                     # default: localhost
    APP_PORT=                     # default: 3000

    ```

-   Di repo githubnya untuk branch `master` (jadi setiap pull request) bakalan dilakukan job sesuai workflow di Github Actionnya
    -   Intinya sih setiap pull request ke branch `master` bakal dilakuin sebuah unit test, yang dimana kalau testnya gagal gak bakal di merge
    -   Jadi bisa tolong diperhatiin kalau mau aman, setiap ngelakuin perubahan major bisa lakuin `npm run test`
-   Disarankan untuk business logic (CRUD) ditaruh di folder `/src/services`, biar lebih gampang di test nantinya

# Quality Of Life Tools

-   Pemakaian git:

    1. [Git Kraken](https://www.gitkraken.com/)
    2. [Github Desktop](https://desktop.github.com/)
    3. Git nya VSCode
    4. (Kalau Punya) Jetbrains IDE [PhpStorm](https://www.jetbrains.com/phpstorm/)

-   Extension VScode:
    1. [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
    2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    3. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

# Beberapa package baru di project ini

1. [luxon.js](https://moment.github.io/luxon/#/?id=luxon)

    - Untuk formatting dan parsing tanggal dan waktu
        ```javascript
        const { DateTime } = require("luxon");
        ```

2. [chalk](https://www.npmjs.com/package/chalk)
    - Biar hasil di `console.log()` tambah bagus
        ```javascript
        const chalk = require("chalk");
        ```

# How to run

-   Development: `npm run dev`
-   Run test: `npm run test`

Command diatas diketikkan di terminal

# Import

## Import app express

```javascript
const app = require("./src/app");
```

## Import Database

Ada 3 jenis database disini (MySQL, SQLite, MongoDB)

Kemungkinan yang bakal sering kepake itu yang MySQL dan MongoDB

SQLite disini fungsinya cuma dipake buat unit testing doang

1. Import `devDatabase` alias `MySQL`

```javascript
// Disini artinya kita import dev dari /src/database, dan kita rename jadi sequelize
const { dev: sequelize } = require("/src/database");

// Usage
sequelize.query();
```

2. Import `testDatabase` alias `SQLite3`

```javascript
// Disini artinya kita import test dari /src/database, dan kita rename jadi sequelize
const { test: sequelize } = require("/src/database");

// Usage
sequelize.query();
```

3. Import `mongo` alias `MongoDB`

```javascript
// Disini artinya kita import mongo dari /src/database, dan kita rename jadi db
const { mongo: db } = require("/src/database");

db.collection().find();
```

## Starting Database

Note dengan mengimport saja tidak cukup, karena database tersebut belum di start, untuk start databasenya kita perlu import `startDatabase` dan `stopDatabase` dari `/src/database`

```javascript
// Mengimport devDatabase alias database MySQL dan startDatabase dan stopDatabase
const {
    dev: sequelize,
    startDatabase,
    stopDatabase,
} = require("/src/database");

await startDatabase(sequelize);

//Kalau udah selesai
await stopDatabase(sequelize);
```

Bisa juga untuk versi `MongoDB` nya

```javascript
const { mongo: db, startDatabase, stopDatabase } = require("/src/database");

await startDatabase(db);

//Kalau udah selesai
await stopDatabase(db);
```

Normally harusnay ini gak diperlukan karena databasenya bakal di start saat `/src/index.js` dijalankan

# Router

## Routes automatically loaded

Routes nya udah di automatically loaded, jadi kita tinggal bikin file routernya aja.

## Creating Router

Bikin rotues bar harus di folder `src/routes` tidak boleh di folder lain, dan untuk setiap level foldernya maka akan jadi bagian dari nama routes juga.

Contoh:

```javascript
// routes/api/group1/user.js
// Route: localhost:3000/api/group1/user

// routes/api/group1/group2/user.js
// Route: localhost:3000/api/group1/group2/user
```

Jadi kalau kita mau bikin sebuah routes `POST localhost:3000/api/user`, berarti buat file di `src/routes/api/user.js`

Router yang dibuat di dalam file juga ada syntax spesialnya, kita hanya perlu melakukan `module.exports`

Contoh kita mau membuat

-   `GET localhost:3000/api/user`
-   `POST localhost:3000/api/user`

Maka di `src/routes/api/user.js` kita buat

```javascript
module.exports = (expressApp) => ({
    get: (req, res) => res.status(200).json({ message: "GET User" }),
    post: (req, res) => res.status(201).json({ message: "POST User" }),
});
```

## Middleware

Untuk middleware kita bisa menambahkannya di opsi `module.exports` nya

Contoh

```javascript
module.exports = (expressApp) => ({
    middleware: (req, res, next) => next(), // Tambahkan middlewarenya disini
    get: (req, res) => res.status(200).json({ message: "GET User" }), // Middleware akan dijalankan kita mengakses route ini
});
```

Middlewarenya juga bisa berupa array

```javascript
module.exports = (expressApp) => ({
    middleware: [(req, res, next) => next(), (req, res, next) => next()],
});
```

# Model

## How to create model

Dibikin dengan file di `src/model`, Pastikan nama filenya sesuai dengan nama modelnya! Dan pastikan nama filenya awalnya kapital!

| File Name | Model Name | Status |
| --------- | ---------- | ------ |
| user.js   | user       | ❌     |
| user.js   | User       | ❌     |
| User.js   | user       | ❌     |
| User1.js  | User       | ❌     |
| User.js   | User       | ✅     |

## Registering Model

Model tidak usah di register (gausah di .associate() atau apa), soalnya udah di auto register, yeeey :)
Pokoknya bikin aja nanti tinggal import import

## Importing Model

Model bisa diimport dengan cara

```javascript
// WAJIB DI DESTRUCTURE, KALO GAK BAKAL ERROR
const { User } = require("./src/model");
```

# Config

## Get Config

Mendapatkan config soal database dan aplikasi express bisa mengimport dari `config/index.js`

```javascript
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_DIALECT,
    DB_PASSWORD,
    APP_HOST,
    APP_PORT,
} = require("./src/config");
```

## Add more config

Kalau perlu nambah config baru bisa ditambahin di `config/index.js`

# Folder Utility

`./utility` digunakan untuk menyimpan library bikinan sendiri yang sekiranya bakal dipake semua orang.

# Appendix

## Command Git penting

Ini untuk command command di terminal, PASTIKAN ADA git DI SISTEM / KOMPUTER

```
# Tips: kalau bingung bisa git add *
git add <file_yang_mau_diadd> (Menyiapkan file file untuk di commit dan di push)

# Tolong kasih commit message yang bener...
# PASTIKAN SEBELUM commit UDAH PERNAH git add
# bisa di cek pake git status
git commit -m "message ku" (Meng-save hasil pekerjaan sekarang di sebuah commit)

# Ini biar git tau kita ngepush ke repositori github yang mana
# URL HTTPS: https://github.com/Redcoat21/projek_ws.git
# URL SSH: git@github.com:Redcoat21/projek_ws.git
git remote add <nama_remote> <url>

// Push hasil pekerjaan sekarang ke repositori github
git push <nama_remote> <nama_branch>

// DAPATKAN hasil pekerjaan terakhir yang ada di repositori ke branchku
git pull <nama_remote> <nama_branch>

// Merge commit branch_target KE branch yang sekarang
git merge <nama_branch_target>

// Bikin branch baru
git branch <nama_branch>

// Pindah ke branch lain
git checkout <nama_branch>

// Bikin branch baru DAN checkout langsung ke branch itu
git checkout -b <nama_branch>

```
