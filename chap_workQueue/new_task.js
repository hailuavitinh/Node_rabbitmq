var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var q = "task_queue";
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        
        ch.assertQueue(q,{durable:true});

        for(var i = 0; i < 15 ; i++){
            setTimeout(function(){
                var msgSend = i + msg ;
                ch.sendToQueue(q,new Buffer(msgSend),{persistent:true});
                console.log("[x] Send %s",msgSend);
                i = i + 1;
            },3000);
        }
        
    });
});