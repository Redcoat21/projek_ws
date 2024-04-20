# Important Notes

-   Branch master di github di lock, jadi tidak bisa dipush kesitu
-   Cara ngepushnya bikin branch baru pake `git checkout -b <nama_branch>`
-   Untuk lengkapnya soal git bisa baca di bagian `Appendix`
-   Di project ini harusnya gaada file `.env` silahkan dibikin sendiri dan taruh filenya di folder paling luar, strukturnya
-   Di repo githubnya untuk branch `master` (jadi setiap pull request) bakalan dilakukan job sesuai workflow di Github Actionnya
    -   Intinya sih setiap pull request ke branch `master` bakal dilakuin sebuah unit test, yang dimana kalau testnya gagal gak bakal di merge
    -   Jadi bisa tolong diperhatiin kalau mau aman, setiap ngelakuin perubahan major bisa lakuin `npm run test`

```.env
APP_HOST=       # default: localhost
APP_PORT=       # default: 3000

DB_HOST=        # default: localhost
DB_PORT=        # default: 3306
DB_NAME=        # default: projek_ws
DB_USER=        # default: root
DB_PASSWORD=    # default: <kosong>


```

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
-   Production: `npm run build`
-   Run test: `npm run test`

Command diatas diketikkan di terminal

**KALAU RAGU PILIH AJA YANG DEVELOPMENT** `npm run dev`

# Import

## Import database

Database bisa diimport pake

```javascript
const sequelize = require("./src/database");
// Ini import databasenya yang bisa dipake nanti
```

## Import app express

```javascript
const app = require("./src/app");
```

# Router

## How to create route

Pastikan create routes cuma 1 level deep

```
./src/file1.js ✅
./src/file2.js ✅
./src/folder1/file1.js ❌
```

## Creating Router

Bikin file baru di folder router, INGAT cuma boleh 1 level!

## Naming Router

File routernya seharusnya dinamain sesuai...

```javascript
// Nama file test.js => localhost:3000/api/test
// Nama file user.js => localhost:3000/api/user
// Nama file product.js => localhost:3000/api/product
```

Kalau mau misalnya bikin route `GET localhost:3000/api/user/create` maka perlu bikin

```javascript
//file routes/user.js

// Karena router.get("/"), berarti mengarah ke localhost:3000/api/user/
router.get("/create", (req, res) => {});
```

## Registering Router

Router yang ada di folder `routes` semua udah otomatis diregister ke app, jadi tidak usah di add manual

Tidak usah di

```javascript
const app = require("./src/app");
const { userRouter } = require("./src/routes"); ❌

// TIDAK DISARANKAN UNTUK BEGINI
app.use("/api/user", userRouter); ❌
```

# Model

## How to create model

Sama halnya kayak router, model yang dibuat hanya boleh 1 level! dan pastikan penamaan filenya sesuai dengan penamaan modelnya.

```javascript
//File User.js
//Model User ✅

//File User.js
//Model Users ❌ (PERHATIKAN S DIBELAKANGNYA)

//File Product.js
//Model Product ✅

//File Product.js
//Model Produk ❌
```

## Importing Model

Model bisa diimport dengan cara

```javascript
// Misalnya mau import model User
// WAJIB DI DESTRUCTURE!
const { User } = require("./src/models"); ✅
const User = require("./src/models"); ❌
```

## Registering Model

File model yang udah dibuat udah otomatis didaftarkan di `models/index.js`, nantinya tinggal pake aja

**TIDAK DISARANKAN UNTUK MENGEDIT `models/index.js`, KECUALI KALAU PENTING ATAU TAU APA YANG MAU DIUBAH!**

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