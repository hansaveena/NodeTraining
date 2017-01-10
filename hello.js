console.log('starting password manager');
//including or importing node-persist module
var storage = require('node-persist');
//to sync with the file used like accounts here
storage.initSync();
//adding content to accounts file
storage.setItemSync('accounts',[{
  username:'Asreet',
  balance :100
},{
  username:'Mydata',
  balance:1000
}]);
//fetching content from accounts file
var accounts = storage.getItemSync('accounts');
console.log(accounts);

//pushing content to accounts file
accounts.push({
  username:'hansa',
  balance:75
},{
  username:'chaitra',
  balance:10000
});

storage.setItemSync('accounts',accounts);
console.log(accounts);
