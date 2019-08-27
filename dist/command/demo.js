"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const chalk_1 = __importDefault(require("chalk"));
commander_1.default.version("0.1.0", '-v, --version');
commander_1.default
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
// let cmdValue: cmdString = undefined;
// let envValue: cmdString = undefined;
commander_1.default
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese');
// .arguments('<cmd> [env]')
// .action((cmd, env) => {
//     cmdValue = cmd;
//     envValue = env;
// });
commander_1.default
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
    console.log(`clone command called: ${source} to ${destination}`);
});
commander_1.default
    .command('rm <dir> [others...]', { noHelp: true })
    .option('-r, --recursive', 'Remove recursively')
    .action((dir, cmdObj, optionsObj) => {
    console.log(optionsObj);
    console.log('remove ' + dir + (optionsObj.recursive ? ' recursively' : ''));
});
commander_1.default.on('option:small', function () {
    // console.log((this as any).small);
});
commander_1.default.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of avaiable commands.', commander_1.default.args.join(' '));
    process.exit(1);
});
commander_1.default.parse(process.argv);
function makeRed(text) {
    return chalk_1.default.red(text);
}
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp(makeRed);
}
