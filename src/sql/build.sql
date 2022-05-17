-- create admin and web with rights
CREATE USER 'dbadmin'@'%' IDENTIFIED BY '123456';
GRANT ALL ON *.* TO 'dbadmin'@'%';
CREATE USER 'web'@'%' IDENTIFIED BY '123456';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'web'@'%';

-- remove old
drop database if exists TodoApp;

-- create database
create database if not exists TodoApp;
use TodoApp;

-- create tables
create table if not exists Users (
    userID int not null auto_increment,
    userName VARCHAR(30) not null unique,
    userEmail VARCHAR(255) not null unique,
    userPassword VARCHAR(255) not null,
    primary key (userID)
);
create table if not exists Lists (
    listID int not null auto_increment,
    listName VARCHAR(30) not null,
    listUserID int not null,
    lastSaved datetime default current_timestamp on update current_timestamp,
    primary key (listID),
    foreign key (listUserID) references Users(userID)
);
create table if not exists Tasks (
    taskID int not null auto_increment,
    taskName VARCHAR(30) not null,
    taskListID int not null,
    taskStatus int not null,
    lastSaved datetime default current_timestamp on update current_timestamp,
    primary key (taskID),
    foreign key (taskListID) references Lists(listID)
);

-- insert default values
insert into Users (userName, userEmail, userPassword) values 
('admin', 'admin@example.com', '$2y$10$MfSPy1RQ5vYQaGrrTSFKmekEwCaMo2ONloWhJvkmvmqw5DrmHLsVC'),
('user1', 'user1@example.com', '$2y$10$MfSPy1RQ5vYQaGrrTSFKmekEwCaMo2ONloWhJvkmvmqw5DrmHLsVC'),
('user2', 'user2@example.com', '$2y$10$MfSPy1RQ5vYQaGrrTSFKmekEwCaMo2ONloWhJvkmvmqw5DrmHLsVC');

insert into Lists (listName, listUserID) values
('List 1.1', 1),
('List 1.2', 1),
('List 1.3', 1),
('List 2.1', 2),
('List 2.2', 2),
('List 2.3', 2),
('List 3.1', 3),
('List 3.2', 3),
('List 3.3', 3);

insert into Tasks (taskName, taskListID, taskStatus) values
('Task 1.1.1', 1, 0),
('Task 1.1.2', 1, 0),
('Task 1.1.3', 1, 1),
('Task 1.2.1', 2, 0),
('Task 1.2.2', 2, 1),
('Task 1.2.3', 2, 1);
