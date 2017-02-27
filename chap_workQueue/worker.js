var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var q = "task_queue";
        ch.assertQueue(q,{durable:true});
        ch.prefetch(2);
        ch.consume(q,function(msg){
            var secs  = msg.content.toString().split('.').length - 1;
            console.log("Sec: ",secs);

            console.log("[x] Received %s",msg.content.toString());
            setTimeout(function(){
                console.log("[x] Done");
                ch.ack(msg);
            },secs*1000);
        },{noAck:false});
    });
});