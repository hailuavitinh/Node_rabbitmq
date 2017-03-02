var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if(args.length == 0){
    console.log("Usage: rpc_client.js is number");
    process.exit(1);
}


amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        ch.assertQueue("",{exclusive:true},function(err,q){
            var cor = q.queue;
            var num = parseInt(args[0]);
            
            console.log("[x] Requesting fib(%d)",num);
            ch.consume(q.queue,function(msg){
                if(msg.properties.correlationId === cor){
                    console.log("[.] Got %s",msg.content.toString());
                    setTimeout(function() {
                        conn.close();
                        process.exit(0);
                    }, 5000);
                }
            },{noAck:true});

            ch.sendToQueue("rpc_queue",new Buffer(num.toString()),{correlationId:cor,replyTo:q.queue});

        });
    });
});


function generalUid(){
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}