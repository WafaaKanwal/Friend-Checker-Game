import inquirer from 'inquirer';
import chalk from 'chalk';

const friendsList: string[] = ["Haya", "Wafa", "Saba", "Rida", "Sara", "Irha"];

function printHeader(): void {
    console.log("\t\t\t" + "✨".repeat(15));
    console.log(chalk.cyanBright.bold("\t\t\t  👫 Friend Checker Game👫 "));
    console.log("\t\t\t" + "✨".repeat(15));
    console.log('\n');
}

function printFooter(): void {
    console.log("\n\t\t\t   " + "🌟".repeat(7));
    console.log(chalk.cyanBright.bold("\t\t\t Thanks for playing! "));
    console.log("\t\t\t   " + "🌟".repeat(7));
}

function isFriend(name: string): boolean {
    const lowerCaseName = name.toLowerCase();
    return friendsList.map(friend => friend.toLowerCase()).includes(lowerCaseName);
}
function capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

async function askAnotherName(): Promise<void> {
    const { continueChecking } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continueChecking',
            message: chalk.magentaBright('Do you want to discover if another name is in your friend list?'),
            default: false,
        },
    ]);

    if (continueChecking) {
        playFriendCheckerGame();
    } else {
        printFooter();
    }
}

async function playFriendCheckerGame(): Promise<void> {
    const { inputName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'inputName',
            message: chalk.magentaBright('Enter a name to check if they are a friend of yours:'),
            validate: (name: string) => name.trim() !== '' || 'Please enter a valid name.',
        },
    ]);

    const formattedName = capitalizeFirstLetter(inputName.trim());;
    if (isFriend(inputName.trim())) {
        console.log(chalk.yellowBright.bold(`\nHooray! ${formattedName} is indeed your friend! 🎉
        \n`));
    } else {
        console.log(chalk.bold.redBright(`\nOh no! ${formattedName} is not in your friend list. 😞\n`));
    }

    await askAnotherName();
}

printHeader();
playFriendCheckerGame();
