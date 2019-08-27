#! /usr/bin/env node
import commander from "commander";
import fs from "fs";
import path from "path";
import inquirer from 'inquirer';
const packageJson = require('../../package.json');

commander.version(packageJson.version, '-v, --version');

commander
    .option('-i, --init', 'generate a .editorconfig file on current directory');

commander.parse(process.argv);

//process init
if(commander.init){
    inquirer.prompt([
        {
            name: 'editortype',
            type: 'list',
            message: 'choose the editorconfig template?',
            choices: [
                {name: 'default', value: 'default'},
                {name: 'react', value: 'react'},
                {name: 'vue', value: 'vue'},
                {name: 'angular', value: 'angular'},
            ],
        }
    ]).then(answer => {
        const fileName = path.resolve(__dirname, `../../template/${answer.editortype}`);
        const editorConfigContent = fs.readFileSync(fileName, 'utf8');
        fs.writeFileSync(path.resolve(".editorconfig"), editorConfigContent, {
            encoding: 'utf8',
            flag: 'w',
        });
    });
    
}

if(!process.argv.slice(2).length){
    commander.outputHelp();
}
