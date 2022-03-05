'user strict';

let connection = require('./config/db');
const moment = require('moment');

class Helper{
    constructor(app){
        this.db = connection;
    }

    checkUserExist = (io, receiver_id) => {
        return io.of("/").adapter.rooms.has(receiver_id);
    }

    saveChat = (data) => {
        try{
            return new Promise((resolve, reject)=>{
                data.created_at = new moment().format("YYYY-MM-DD HH:mm:ss");
                data.updated_at = new moment().format("YYYY-MM-DD HH:mm:ss");
                this.db.query('INSERT INTO chats SET ? ', data,  (error, elements)=>{
                    if(error)
                        return reject(error);
                    return resolve(elements.insertId);
                });
            });
        }
        catch(error){
            return null;
        }
    }

    getChat = (chat_id) => {
        try{
            return new Promise((resolve, reject)=>{
                this.db.query('SELECT * FROM chats WHERE id = ?', chat_id, function(error, results){
                    if(error)
                        throw reject(error);
                    return resolve(results);
                });
            });
        }
        catch(error){
            return null;
        }
    }
}

module.exports = new Helper();
