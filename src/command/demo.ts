import commander from "commander";
import chalk from "chalk";

type cmdString = string | undefined;

commander.version("0.1.0", '-v, --version');

commander
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

// let cmdValue: cmdString = undefined;
// let envValue: cmdString = undefined;

commander
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese')
    // .arguments('<cmd> [env]')
    // .action((cmd, env) => {
    //     cmdValue = cmd;
    //     envValue = env;
    // });

commander
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
        console.log(`clone command called: ${source} to ${destination}`);
    });

commander
    .command('rm <dir> [others...]', {noHelp: true})
    .option('-r, --recursive', 'Remove recursively')
    .action((dir, cmdObj, optionsObj) => {
        console.log(optionsObj);
        console.log('remove ' + dir + (optionsObj.recursive ? ' recursively' : ''));
    });

commander.on('option:small', function() {
    // console.log((this as any).small);
});

commander.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of avaiable commands.', commander.args.join(' '));
    process.exit(1);
});

commander.parse(process.argv);

function makeRed(text:string): string {
    return chalk.red(text);
}

if(!process.argv.slice(2).length){
    commander.outputHelp(makeRed);
}


