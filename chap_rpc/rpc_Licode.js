var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:123@192.168.1.23:5672",function(err,conn){
    if(err){
        console.log("Errr:",err)
    } else {
        console.log("Connect Sucess");
        conn.createChannel(function(err,ch){
            if(err){
                console.log("Chanel error:",err);
            }

            ch.assertExchange("rpcExchange","direct",{durable:false});
            console.log("Scuess exchange");
            ch.assertQueue("",{exclusive:true},function(err,q){
                if(err){
                    console.log("Error Queue",err);
                }
                var cor = q.queue;

                ch.consume(q.queue,function(msg){
                    console.log("Mesage:",msg)
                });
                var message = {
                    method:"getUsersInRoom",
                    args:["586c7d164b7c38741c129bca"],
                    corrID: cor, 
                    replyTo: q.queue
                };
                ch.publish("rpcExchange","erizoController_58de02f4b425a0915c5b7c1a",message)

            });// end assertQueue
        });
    }
});