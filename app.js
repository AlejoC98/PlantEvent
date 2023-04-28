const EventEmmiter = require('events');

class Plant extends EventEmmiter {
    constructor(size, hasBeenPlanted) {
        super();
        this.size = size;
        this.hasBeenPlanted = hasBeenPlanted;
        this.addListeners();
    }

    addListeners() {
        this.once('plantSeed', () => {
            this.size = 1;
            this.hasBeenPlanted = true;
            console.log('Plant has been planted');
        });

        this.on('water', () => {
            if (this.hasBeenPlanted) {
                this.size += 1;
                console.log(`The size of your plant: ${this.size}`);
            }
        });

        this.on('bugAttack', () => {
            if (this.hasBeenPlanted) {
                this.size -= 1;
                console.log(`The size of your plant: ${this.size}`);
            }
        });

        this.on('harvest', () => {
            if (this.hasBeenPlanted) {
                console.log(`The size of your plant: ${this.size}`);
                this.removeAllListeners();
            } else {
                console.log('You need to plant it first');
            }
        });
    }
}

const myPlant = new Plant();

process.stdin.setEncoding('utf-8');

process.stdin.on('data', data => {
    console.log(`You typed ${data}`);
    myPlant.emit(data.trim());
});

// process.stdin.on('readable', () => {
//     let action = process.stdin.read();
// });
