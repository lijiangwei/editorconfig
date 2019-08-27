#! /usr/bin/env node
import commander from "commander";
import fs from "fs";
import path from "path";
import inquirer from 'inquirer';
import { inquirerQuestions } from '../command/init';
const packageJson = require('../../package.json');

commander.version(packageJson.version, '-v, --version');

commander
    .option('-i, --init', 'generate a .editorconfig file on current directory');

commander.parse(process.argv);

//process init
if(commander.init){
    inquirerQuestions();
}

if(!process.argv.slice(2).length){
    commander.outputHelp();
}
