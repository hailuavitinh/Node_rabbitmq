var amqp = require("amqplib/callback_api");

amqp.connect("amqp://thanhdc:abc@123@104.223.20.159",function(err,conn){
    conn.createChannel(function(err,ch){
        var ex = "direct_logs";
        var args = process.argv.splice(2);
        var msg = args.slice(1).join(' ') || "Hello World!";
        var serverity = (args.length > 0) ? args[0] : "info";
        ch.assertExchange(ex,"direct",{durable:false});
        ch.publish(ex,serverity,new Buffer(msg));
        console.log("[x] Sent %s: '%s'",serverity,msg);
    });
    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 5000);
});