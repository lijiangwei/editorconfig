"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function inquirerQuestions() {
    return inquirer_1.default.prompt([
        {
            type: 'checkbox',
            name: 'files',
            message: 'Select files to generate',
            choices: [
                { name: 'editorconfig', value: 'editorconfig', checked: true },
                { name: 'gitignore', value: 'gitignore', checked: true },
            ],
        },
        {
            name: 'editortype',
            type: 'list',
            message: 'choose the editorconfig template?',
            when: (answers) => {
                return answers.files.includes('editorconfig');
            },
            choices: [
                { name: 'default', value: 'default' },
                { name: 'react', value: 'react' },
                { name: 'vue', value: 'vue' },
                { name: 'angular', value: 'angular' },
            ],
        }
    ]).then(answers => {
        if (answers.files.includes('gitignore')) {
            const fileName = path_1.default.resolve(__dirname, `../../template/gitignore`);
            writeFile(fileName, '.gitignore');
        }
        const type = answers.editortype;
        if (type) {
            const fileName = path_1.default.resolve(__dirname, `../../template/${type}`);
            writeFile(fileName, '.editorconfig');
        }
    });
}
exports.inquirerQuestions = inquirerQuestions;
function writeFile(filePath, fileName) {
    const editorConfigContent = fs_1.default.readFileSync(filePath, 'utf8');
    fs_1.default.writeFileSync(path_1.default.resolve(fileName), editorConfigContent, {
        encoding: 'utf8',
        flag: 'w',
    });
}
