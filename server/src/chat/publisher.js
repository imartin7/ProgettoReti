const amqp = require('amqplib/callback_api');
const amqpUrl = process.env.AMQP_URL || 'amqp://rabbitmq';

const publisher = async () => {
    console.log('test');
    return await amqp.connect(amqpUrl, (error, connection) => {
      console.log('test2', error, connection);
    if (error) {
      console.log('error');
      console.error(error.message);
      return -1;
    }

    return connection.createChannel((err, channel) => {
      try {
        console.log('Publishing');
        const exchange = 'user.username';
        const queue = 'user.messages';
        const routingKey = 'email';
        
        channel.assertExchange(exchange, 'direct', {durable: true});
        channel.assertQueue(queue, {durable: true});
        channel.bindQueue(queue, exchange, routingKey);
        
        const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
        console.log('Message published');
        return 0;
      } catch(e) {
        console.error('Error in publishing message', e);
        return -1;
      } finally {
        console.info('Closing channel and connection if available');
        channel.close();
        connection.close();
        console.info('Channel and connection closed');
        return 0;
      }
    });
  });
};

module.exports ={
  publisher: publisher
}