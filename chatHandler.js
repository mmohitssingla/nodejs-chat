const moment = require('moment');
const helper = require('./helpers');

module.exports = (io, socket) => {
    const join = (user_id) => {
        user_id = parseInt(user_id);
        socket.leave(user_id);
        socket.join(user_id);
        let data = {
            message: 'socket join successful.'
        }
        socket.emit('join',data);
    }

    const leave = (user_id) => {
        user_id = parseInt(user_id);
        socket.leave(user_id);
        let data = {
            message: 'socket leave successful.'
        }
        socket.emit('leave',data);
    }

    const send_message = async (data) => {
        if((data.receiver_id == null) || (data.sender_id == null) || (data.message == null) || (data.message_type == null)){
            let data = {
                error: 'Please send valid data.'
            };
            socket.emit('errorMessage', data);
        }
        else{
            try {
                data.read = null;
                if (helper.checkUserExist(io, data.receiver_id)) {
                    data.read = new moment().format("YYYY-MM-DD HH:mm:ss");
                }
                let chat_id = await helper.saveChat(data);
                if(chat_id){
                    let chat_response = await helper.getChat(chat_id);
                    socket.to(data.receiver_id).emit('send_message', chat_response);
                    io.to(data.sender_id).emit('send_message', chat_response);
                }
                else{
                    let data = {
                        error: 'Something went wrong.'
                    };
                    socket.emit('errorMessage', data);
                }
            } catch (err) {
                let data = {
                    error: err
                };
                socket.emit('errorMessage', data);
            }
        }
    }

    const disconnect = () => {
        //
    }

    socket.on('join', join);
    socket.on('leave', leave);
    socket.on('send_message', send_message);
    socket.on('disconnect', disconnect);
}
