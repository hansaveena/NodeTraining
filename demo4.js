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
    })

    .help('help')
    .argv;
var command = argv._[0];

console.log(argv);

if (command === 'adduser' && typeof argv.name !=='undefined' && typeof argv.city !=='undefined' && typeof argv.country !=='undefined') {
	console.log('Hello ' + argv.name +' ' + argv.city +' '+argv.country);

} else if (command === 'adduser' && typeof argv.name !=='undefined' && typeof argv.city !=='undefined') {
	console.log('Hello '+ argv.name+' ' + argv.city);
}else if (command === 'adduser' && typeof argv.name !=='undefined' ) {
	console.log('Hello '+ argv.name );
} else {
	console.log('Hello ');
}
