const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const Employees = []
// function promptUser() {
//     return
     inquirer.prompt([
        {
            type: "input",
            message: "Enter your first name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter your email adress",
            name: "emai"


        },
        {
            type: "checkbox",
            message: "What is your role in the company",
            name: "position",
            choices:
                [
                   { name:"manager" ,value:0},
                    {name:"engineer",value:1},
                    {name:"inter", value:2}
                ]
        },
        {
            type: "input",
            message: "Enter your github username:",
            name: "username"
        }

    ])
// }
.then((responses) => {
    if (responses.position === 0) {
        console.log("You are probably smart");
    }
})

const opening = [
    {
        type: "list",
        mesage: "Would you like to form a team?",
        name: "open",
        choices: ["YES", "NO"]
    }
];
const askEmployees = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your ID#?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is your role in the company?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

const askManager = [
    {
        type: "input",
        message: "What is the Manager's Office #?",
        name: "office"
    }
];

const askEngineer = [
    {
        type: "input",
        message: "What is your Github?",
        name: "github"
    }
];

const askIntern = [
    {
        type: "input",
        message: "What school are you attending?",
        name: "school"
    }
];

const newMember = [
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "new",
        choices: ["YES", "NO"]
    }
];

async function makeTeams() {
    await inquirer
        .prompt(askEmployees)
        .then(async function (answers) {
            console.log(answers);
        
            if (answers.role === "Manager") {
                let managerReply = await inquirer
                    .prompt(askManager)
                const newManager = new Manager(answers.name, answers.id, answers.email, managerReply.office);
                Employees.push(newManager);
            }
            if (answers.role === "Engineer") {
                let engineerReply = await inquirer
                    .prompt(askEngineer)
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, engineerReply.github);
                Employees.push(newEngineer);
            }
            if (answers.role === "Intern") {
                let internReply = await inquirer
                    .prompt(askIntern)
                const newIntern = new Intern(answers.name, answers.id, answers.email, internReply.school);
                Employees.push(newIntern);
            }
           
        })

        await inquirer
        .prompt(newMember)
        .then(async function (answers) {
            if (answers.new === "YES") {
                makeRoster();
            } 
            else {
                template = render(Employees);
                fs.writeFile(outputPath, template, err => {
                    if (err) {
                        throw err;
                    } console.log("Successfully written to team.html file");
                })
            }
        })
};

makeTeams();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
