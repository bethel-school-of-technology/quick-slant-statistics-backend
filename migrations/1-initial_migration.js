'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "SequelizeMeta", deps: []
 * createTable "customer", deps: []
 * createTable "teams", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-01-27T08:09:32.115Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "SequelizeMeta",
            {
                "name": {
                    "type": Sequelize.STRING(255),
                    "field": "name",
                    "primaryKey": true,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "customer",
            {
                "guid": {
                    "type": Sequelize.STRING(40),
                    "field": "guid",
                    "allowNull": false
                },
                "uid": {
                    "type": Sequelize.INTEGER(11),
                    "field": "uid",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING(45),
                    "field": "first_name",
                    "allowNull": true
                },
                "last_name": {
                    "type": Sequelize.STRING(45),
                    "field": "last_name",
                    "allowNull": true
                },
                "email": {
                    "type": Sequelize.STRING(100),
                    "field": "email",
                    "unique": true,
                    "allowNull": true
                },
                "username": {
                    "type": Sequelize.STRING(45),
                    "field": "username",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING(45),
                    "field": "password",
                    "allowNull": true
                },
                "token": {
                    "type": Sequelize.STRING(45),
                    "field": "token",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "teams",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(100),
                    "field": "name",
                    "allowNull": true
                },
                "division": {
                    "type": Sequelize.STRING(100),
                    "field": "division",
                    "allowNull": true
                },
                "wins": {
                    "type": Sequelize.INTEGER(11),
                    "field": "wins",
                    "allowNull": true
                },
                "lossess": {
                    "type": Sequelize.INTEGER(11),
                    "field": "lossess",
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
