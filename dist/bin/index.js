#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const packageJson = require('../../package.json');
commander_1.default.version(packageJson.version, '-v, --version');
commander_1.default
    .option('-i, --init', 'generate a .editorconfig file on current directory');
commander_1.default.parse(process.argv);
//process init
if (commander_1.default.init) {
    inquirer_1.default.prompt([
        {
            name: 'editortype',
            type: 'list',
            message: 'choose the editorconfig template?',
            choices: [
                { name: 'default', value: 'default' },
                { name: 'react', value: 'react' },
                { name: 'vue', value: 'vue' },
                { name: 'angular', value: 'angular' },
            ],
        }
    ]).then(answer => {
        const fileName = path_1.default.resolve(__dirname, `../../template/${answer.editortype}`);
        const editorConfigContent = fs_1.default.readFileSync(fileName, 'utf8');
        fs_1.default.writeFileSync(path_1.default.resolve(".editorconfig"), editorConfigContent, {
            encoding: 'utf8',
            flag: 'w',
        });
    });
}
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
