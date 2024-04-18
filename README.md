[<p align="center"><a href="https://drive.usercontent.google.com/uc?id=1Pn49zC5ifmBXGpcT0J_85uCpLXQ-KiTq&export=download" target="_blank"><img src="https://drive.usercontent.google.com/uc?id=1Pn49zC5ifmBXGpcT0J_85uCpLXQ-KiTq&export=download" alt="Laravel Logo"></a></p>](https://drive.usercontent.google.com/uc?id=1Pn49zC5ifmBXGpcT0J_85uCpLXQ-KiTq&export=download)
# How to run this project
- clone this project on **laragon** www directory
```shell
git clone https://github.com/angganix/Technical-Test-RSUD-Kesesi.git sewa-mobil
```
- go to project directory
```shell
cd sewa-mobil
```
- copy **.env.example** to **.env** file
- do storage linking
```shell
php artisan storage:link
```
- install php dependencies and nodejs dependencies
```shell
composer install
```
```shell
npm install
```
- run migration
```shell
php artisan migrate
```
- run database seed
```shell
php artisan db:seed
```
- build node app (react js for this case) because im using react js
```shell
npm run build
```
- Im using **laragon**, so make sure to start all laragon services (apache2, mysql)
- Make sure **https** is enabled on laragon apache2 services
- Open https://sewa-mobil.test

## Admin Access
- email : **admin@example.com**
- password : **admin123**

## User Access
- email : **angganix@gmail.com**
- password : **user123**
