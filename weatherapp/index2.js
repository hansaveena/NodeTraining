var location = require('./locationinfo.js');
var weather = require('./weatherdemo.js');

weather(function(currentweather){
  console.log(currentweather);
});


location(function(location){
  if(!location){
    console.log('Unable to guess location');
    return;
  }

  console.log('log/lat: '+location.loc);
})
