var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var q = "task_queue";
        var mwg = process.argv.slice(2).join(' ') || "Hello World!";
        
        ch.assertQueue(q,{durable:true});
        ch.sendToQueue(q,new Buffer(msg),{persistent:true});
        console.log("[x] Sen %s",msg);
    });
});