const Job = require('../models/Job');

async function handle_request(msg, callback){
  console.log("Inside jobs kafka backend");
  console.log(msg);

  try {
    const dbResp = await Job.find(
        { },
        { job_applications: 0 }
    );
    console.log('jobs fetched kafka backend: ', dbResp);
    callback(null, dbResp);
    console.log("after callback");
  } catch (err) {
    console.log("kafka backend: DB error sending err...");
    callback(null, {error: err, msg:'error'});
    console.log("after callback");
    console.log(err);
  }  
};

exports.handle_request = handle_request;


