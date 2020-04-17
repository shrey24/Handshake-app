
  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

function handle_request(msg, callback){
  console.log("Inside book kafka backend");
  console.log(msg);
  let book = books.find(i => i["BookID"] === msg.BookID);
  
  if (!book) {
    console.log("kafka backend: inserting new book...");
    books.push(msg);
    callback(null, books);
    console.log("after callback");
  } else {
    console.log("kafka backend: book already exists, sending err...");
    let err = {err: 'err object'};
    callback(err, 'err message');
    console.log("after callback");
  }
  
};

exports.handle_request = handle_request;


