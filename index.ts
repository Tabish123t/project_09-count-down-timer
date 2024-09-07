import inquirer from 'inquirer';

class CountdownTimer {
    private duration: number;
    private intervalId: NodeJS.Timeout | null = null;

    constructor(duration: number) {
        this.duration = duration;
    }

    start() {
        this.intervalId = setInterval(() => {
            if (this.duration > 0) {
                this.duration--;
                console.log(`Time left: ${this.duration} seconds`);
            } else {
                console.log('Time is up!');
                this.stop();
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

async function getUserInput() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'duration',
            message: 'Enter the countdown duration in seconds:',
            validate: (input) => {
                const num = parseInt(input, 10);
                return !isNaN(num) && num > 0 ? true : 'Please enter a valid number greater than 0';
            }
        }
    ]);

    const duration = parseInt(answers.duration, 10);
    const timer = new CountdownTimer(duration);
    timer.start();
}

getUserInput();
