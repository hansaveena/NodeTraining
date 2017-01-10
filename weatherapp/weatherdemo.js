var request = require('request');
var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9a9316865256d2019280b2e9bce02c9f';
module.exports = function(callback){
request({
  url:url,
  json:true
}, function(error,response,body){
  if(error){
    callback('Unable to fetch weather.');
  } else {
    callback('It\'s'+body.main.temp+ ' in '+ body.name + '!');
  }
});
}
