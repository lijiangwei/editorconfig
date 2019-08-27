#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const init_1 = require("../command/init");
const packageJson = require('../../package.json');
commander_1.default.version(packageJson.version, '-v, --version');
commander_1.default
    .option('-i, --init', 'generate a .editorconfig file on current directory');
commander_1.default.parse(process.argv);
//process init
if (commander_1.default.init) {
    init_1.inquirerQuestions();
}
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
