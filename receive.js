var amqp = require("amqplib/callback_api");

amqp.connect('amqp://http://104.223.20.159',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = "hello";
        ch.assertQueue(q,{durable:false});

        console.log("[*]  Waiting for message in %s. To exit press CTRL + C",q);
        ch.consume(q,function(msg){
            console.log("[x] Received %s",msg.content.toString());
        },{noAck:true});
    });
});