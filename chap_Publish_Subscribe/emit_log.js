var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var ex = "logs";
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        console.log(process.argv);
        console.log(process.argv.slice(2));
        
        ch.assertExchange(ex,"fanout",{durable:false});
        ch.publish(ex,"pub",new Buffer(msg));
        console.log("[x] Sent %s",msg);
    });

    setTimeout(function(){
        conn.close();
        process.exit(0)
    },50000)
});