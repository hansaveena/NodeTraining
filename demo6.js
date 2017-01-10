console.log('starting password manager.. !')
var crypto =require('crypto-js');
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
            username: {
                demand: true,
                alias: 'u',
                description: 'Account username or email',
                type: 'string'
            },
            password: {
                demand: false,
                alias: 'p',
                description: 'Your password goes here',
                type: 'string'
            },
            masterPassword: {
                demand: false,
                alias: 'm',
                description: 'Your masterPassword goes here',
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
        },
        masterPassword: {
            demand: false,
            alias: 'm',
            description: 'Your masterPassword goes here',
            type: 'string'
        }
      }).help('help');
    })

    .help('help')
    .argv;
var command = argv._[0];


function getAccounts (masterPassword) {
    // use getItemSync to fetch accounts
    var encryptedAccount = storage.getItemSync('accounts');
    var accounts = [];

    // decrypt
    if (typeof encryptedAccount !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    // return accounts array
    return accounts;
}


function saveAccounts (accounts, masterPassword) {
    // encrypt accounts
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

    // setItemSync
    storage.setItemSync('accounts', encryptedAccounts.toString());

    // return accounts
    return accounts;
}

function createAccount (account, masterPassword) {
    var accounts = getAccounts(masterPassword);

    accounts.push(account);

    saveAccounts(accounts, masterPassword);

    return account;
}


function getAccount (accountName, masterPassword) {
    var accounts = getAccounts(masterPassword)
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
  try {
          var createdAccount = createAccount({
              name: argv.name,
              username: argv.username,
              password: argv.password
          }, argv.masterPassword);
          console.log('Account created!');
          console.log(createdAccount);
      } catch (e) {
          console.log('Unable to create account.');
      }
  } else if (command === 'getuser') {
      try {
          var fetchedAccount = getAccount(argv.name, argv.masterPassword);

          if (typeof fetchedAccount === 'undefined') {
              console.log('Account not found');
          } else {
              console.log('Account found!');
              console.log(fetchedAccount);
          }
      } catch (e) {
          console.log('Unable to fetch account.');
      }
}
