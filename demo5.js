console.log('starting password manager.. !')

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('adduser', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your first name goes here',
                type: 'string'
            },
            city: {
                demand: true,
                alias: 'c',
                description: 'Your city goes here',
                type: 'string'
            },
            country: {
                demand: false,
                alias: 'cc',
                description: 'Your country goes here',
                type: 'string'
            }
        }).help('help');
    }).command('getuser','Fetching user account',function(yargs){
      yargs.options({
        name: {
            demand: true,
            alias: 'n',
            description: 'Your first name goes here',
            type: 'string'
        }
      }).help('help');
    })

    .help('help')
    .argv;
var command = argv._[0];

function createAccount(account){
  var accounts = storage.getItemSync(account);
  if (typeof accounts === 'undefined') {
      accounts = [];
  }

  accounts.push(account);
  storage.setItemSync('accounts', accounts);

  return account;
}


function getAccount(accountName){
  var accounts = storage.getItemSync('accounts');
  var matchedAccount;

  accounts.forEach(function (account) {
      if (account.name === accountName) {
          matchedAccount = account;
      }
  });

  return matchedAccount;
}

console.log(argv);

if (command === 'adduser') {
var createdAccount = createAccount({
  name :argv.name,
  city :argv.city,
  country :argv.country
});
console.log('Account created!');
console.log(createdAccount);
} else if (command === 'getuser' ) {
  var fetchedAccount = getAccount(argv.name);

  if (typeof fetchedAccount === 'undefined') {
      console.log('Account not found');
  } else {
      console.log('Account found!');
      console.log(fetchedAccount);
  }
}
