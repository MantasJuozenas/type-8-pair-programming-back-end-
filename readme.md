## Node steps

1. init git, github
2. npm init -y
3. npm i express morgan dotenv cors myslq2
4. .gitignore failas jame node_modules .env
5. npm i eslint --save-dev
6. npm init @eslint/config
7. .env
8. src/server.js - aprasyti express aplikacija
9. .env config
10. package.json - susirasom scripts: start, lintFix
11. src/routes/ - sukurti routes files
12. src/api/creatingDb.js - sukurem routes, kad sukurti skirtingus db.
13. src/api/petsRoutes.js - sukurem get pets route, post, delete routus.
14. src/api/medicationsRoutes.js - sukurem get medications route, post route.
15. src/api/logsRoutes.js - sukurem get logs route, post route.
16. src/api/prescriptionsRoutes.js - sukurem get prescriptions, post prescriptions.

## Server launch

1. npm install
2. .env.example rename to .env
3. write config to .env
4. npm start

## Create db routes

1. http://localhost:3306/v1/createDb/pets POST
2. http://localhost:3306/v1/createDb/logs POST
3. http://localhost:3306/v1/createDb/medications POST
4. http://localhost:3306/v1/createDb/prescriptions POST

## Pet routes

1. http://localhost:3306/v1/pets GET
2. http://localhost:3306/v1/pets POST
3. http://localhost:3306/v1/pets DELETE

## Medication routes

1. http://localhost:3306/v1/medications GET
2. http://localhost:3306/v1/medications POST

## Log routes

1. http://localhost:3306/v1/logs GET
2. http://localhost:3306/v1/logs POST

## Prescription routes

1. http://localhost:3306/v1/prescriptions GET
2. http://localhost:3306/v1/prescriptions POST
