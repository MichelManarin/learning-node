require('dotenv').config()

var amqp = require('amqplib/callback_api');

const rabbitUser = process.env.RABBITMQ_USER;
const rabbitPass = process.env.RABBITMQ_PASS;
const rabbitIP = process.env.RABBITMQ_IP;

amqp.connect(`amqp://${rabbitUser}:${rabbitPass}@${rabbitIP}:5672`, function(error0, connection) {
    
    if (error0) {
        throw error0;
    }
    
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      let queue = 'NewUser';

      channel.assertQueue(queue, {
        durable: false
      });

      channel.consume(queue, (msg) => {
        console.log(msg.content.toString());
      }, {
        noAck: true
      });
    });
});