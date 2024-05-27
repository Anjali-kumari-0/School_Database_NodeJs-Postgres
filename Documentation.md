this Doumentation  Denote My Learning of Postgress with node js
I am Going to built rest API (students App)
1. create students
2. Read data of students
3. Updates info of students
4. delete Students

install
1. postgress
2. postmen
3. node js

prerequest
1. javascript

Steps:-
step 1: npm init -y
step 2: npm install express
step 3: npm i pg
step 4: create folder structure src/students 
    : server.js -> node server.js

 open psql
>\conninfo
> \l
>CREATE DATABASE students;
>\l
> \c students
> \! cls
> \c school_db
> CREATE TABLE students (
    > id SERIAL PRIMARY KEY,
    > name VARCHAR(255),
    > email VARCHAR(255),
    > age INT,
    > dob DATE);
> \dt
 > INSERT INTO students (name, emial,age,dob)
 > VALUES ('anjali','anjali@gmail.com',22,'2002-02-04'), ('nipun','nipun@gmail.com',21,'2003-40-03');

 >select * from stuentss


