import inquirer from 'inquirer';
import fs from "fs";
import path from "path";

function inquirerQuestions(){
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'files',
            message: 'Select files to generate',
            choices: [
                {name: 'editorconfig', value: 'editorconfig', checked: true},
                {name: 'gitignore', value: 'gitignore', checked: true},
            ],
        },
        {
            name: 'editortype',
            type: 'list',
            message: 'choose the editorconfig template?',
            when: (answers) => {
                return (answers as {files: any}).files.includes('editorconfig');
            },
            choices: [
                {name: 'default', value: 'default'},
                {name: 'react', value: 'react'},
                {name: 'vue', value: 'vue'},
                {name: 'angular', value: 'angular'},
            ],
        }
    ]).then(answers => {
        if((answers as {files: any}).files.includes('gitignore')){
            const fileName = path.resolve(__dirname, `../../template/gitignore`);
            writeFile(fileName, '.gitignore');
        }
        const type = (answers as {editortype: string}).editortype;
        if(type){
            const fileName = path.resolve(__dirname, `../../template/${type}`);
            writeFile(fileName, '.editorconfig');
        }
        
    });
}

function writeFile(filePath: string, fileName: string) {
    const editorConfigContent = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(path.resolve(fileName), editorConfigContent, {
        encoding: 'utf8',
        flag: 'w',
    });
}

export { inquirerQuestions }