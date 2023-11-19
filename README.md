# INSTALL

```
git clone git@gitlab.com:lethkhai/smart-home-be.git
cd .\smart-home-be\
```

Install all the package in the requitement.txt file

## Install dbs

```
npx sequelize-cli db:migrate
```

## Run

```
node .\core\mqtt\pub.js
node .\core\mqtt\sub.js
```
