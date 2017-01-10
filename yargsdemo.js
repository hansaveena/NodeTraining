var argv =require('yargs').argv;
var command = argv._[0];
if(argv._[0]=='welcome'){
  console.log('correct argument');
} else {
  console.log('wrong argument');
}
