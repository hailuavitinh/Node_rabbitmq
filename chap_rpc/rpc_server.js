var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var q = "rpc_queue";
        ch.assertQueue(q,{durable:false});
        ch.prefetch(1);
        console.log("[x] Awaiting RPC request");
        ch.consume(q,function(msg){
            var n = parseInt(msg.content.toString());
            console.log("[.] fib(%d)",n);
            var r =  fibonacci(n);
            ch.sendToQueue(msg.properties.replyTo,new Buffer(r.toString()),{correlationId:msg.properties.correlationId});
            ch.ack(msg);
        });
    });
});

function fibonacci(n){
    console.log("Fib (%d)",n);
    if(n == 0 || n == 1){
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci( n - 2);
    }
}