var amqp = require("amqplib/callback_api");

amqp.connect('amqp:http://104.223.20.159',function(err,conn){

    conn.createChannel(function(err,ch){
        var q = "hello";

        ch.assertQueue(q,{durable:false});
        ch.sendToQueue(q,new Buffer('Hello word'));
        console.log("[x] Sent 'Hello world'")
    });

    setTimeout(function(){
        conn.close();
        process.exit(0);
    },500);
});


