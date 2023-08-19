# Nest JS Practice

## Local Development

``` bash
cd my-nest-backend
npm run start:dev
```

Backend will be running on <http://localhost:3000>

## Formatting

``` bash
npm run lint
npm run format
```

## Setting up email sending feature

``` bash
brew update && brew install mailhog
```

``` bash
mailhog
```

```bash
npm install --save @nestjs-modules/mailer nodemailer
```
