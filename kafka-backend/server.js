var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var jobs = require('./services/jobs.js');
var company_profile = require('./services/company_profile.js');
var signin = require('./services/signin.js');
var student_profile = require('./services/student_profile.js');
var applications = require('./services/applications.js');
var auth = require('./services/signin.js');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Books);
handleTopicRequest("jobs", jobs);
handleTopicRequest("company_profile", company_profile);
handleTopicRequest("signin", signin);
handleTopicRequest("student_profile", student_profile);
handleTopicRequest("applications", applications);
handleTopicRequest("auth", auth);
