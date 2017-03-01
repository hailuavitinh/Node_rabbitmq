var amqp = require("amqplib/callback_api");
var args = process.argv.slice(2);
if(args.length == 0){
    console.log("Usage: receive_log_topic.js <facility>.<severity>");
    process.exit(1);
}


amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var ex = "topic_logs";
        ch.assertExchange(ex,"direct",{durable:false});

        ch.assertQueue("",{exclusive:true},function(err,q){
            console.log("[*] Waiting for logs: To exit press Ctrl + C");

            args.forEach(function(key){
                ch.bindQueue(q.queue,ex,key);
            });

            ch.consume(q.queue,function(msg){
                console.log("[x] %s: '%s'",msg.fields.routingKey,msg.content.toString());
            },{noAck:true});

        });
    });
});