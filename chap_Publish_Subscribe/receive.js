var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var ex = "logs";
        var key_binding = process.argv.slice(2).join(' ');
        ch.assertExchange(ex,"fanout",{durable:false});
        ch.assertQueue("",{exclusive:true},function(err,q){
            console.log("[*] Waiting for message in %s. To exit press CTRL + C",q.queue);
            ch.bindQueue(q.queue,ex,key_binding);
            ch.consume(q.queue,function(msg){
                console.log("[x] %s",msg.content.toString())

            },{noAck:true});
        });
    });
});