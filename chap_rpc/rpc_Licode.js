// var amqp = require("amqplib/callback_api");

// amqp.connect("amqp://thanhdc:123@192.168.1.23:5672",function(err,conn){
//     if(err){
//         console.log("Errr:",err)
//     } else {
//         console.log("Connect Sucess");
//         conn.createChannel(function(err,ch){
//             if(err){
//                 console.log("Chanel error:",err);
//             }

//             ch.assertExchange("rpcExchange","direct",{durable:false,autoDelete:true});
//             console.log("Scuess exchange");
//             ch.assertQueue("",{exclusive:true},function(err,q){
//                 if(err){
//                     console.log("Error Queue",err);
//                 }
//                 var cor = q.queue;

//                 console.log("Queue: ",cor);
//                 ch.consume(q.queue,function(msg){
//                     console.log("Mesage:",msg)
//                 },{noAck:true});
//                 var message = {
//                     method:"getUsersInRoom",
//                     args:["58dc8624d90c3c58538c8496"]
//                 };

//                 console.log("Message string: ",JSON.stringify(message));

//                 ch.publish("rpcExchange","erizoController_58e3241db473d95f8c9cad18",new Buffer(JSON.stringify(message)),{correlationId:cor,replyTo:q.queue})

//             });// end assertQueue
//         });
//     }
// });

var amqp = require("amqp");
var connection = amqp.createConnection({host:"192.168.1.24",login:"thanhdc",password:"123"});

connection.on("ready",function(){
    var rpExchange = connection.exchange('rpcExchange',{type:"direct"},function(exchange){
        var clientQueue = connection.queue('',function(q){
            console.log("Queue :",clientQueue.name);
            clientQueue.bind('rpcExchange',clientQueue.name);
            clientQueue.subscribe(function(message){
                console.log("Received: ",message)
            });// end subscribe
            rpExchange.publish("erizoController_58ecb31514076333961db1ac",{method:"getUsersInRoom",args:["58dc8624d90c3c58538c8496"],corrID:clientQueue.name,replyTo:clientQueue.name});
        }); // end queue
    }); // end exchnage
});