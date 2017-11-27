const readline = require('readline');
const process = require('process');
const q = 67;
const alpha = 12;

const commands = {
    encrypt: (Y_A, message) => {

        message = parseInt(message);
        Y_A = parseInt(Y_A);

        if (message > q) {
            console.log(`Message too big`);
            return;
        }

        let k = rand(1, q-1)
        let K = Math.pow(Y_A, k) % q;

        let C_1 = Math.pow(alpha, k) % q;
        let C_2 = (K * message) % q;

        console.log(`Encryption: (${C_1}, ${C_2})`);
        console.log(`----------`);
    },

    decrypt: (X_A, C_1, C_2) => {
        C_1 = parseInt(C_1);
        C_2 = parseInt(C_2);
        let K = Math.pow(C_1, X_A) % q;
        let M = (C_2 * modInverse(K, q)) % q;
        console.log(`Your message is: ${M}`);
        console.log(`----------`);
    },

    genkeys: () => {
        let X_A = rand(1, q-1);
        let Y_A = Math.pow(alpha, X_A) % q;
        console.log(`Private Key: ${X_A}`)
        console.log(`Public key: (${q}, ${alpha}, ${Y_A})`);
        console.log(`----------`);
    }

};

let rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let modInverse = (num, mod) => {
    num %= mod;
    for (let x = 1; x < mod; x++) {
        if ((num*x)%mod == 1) {
            return x;
        }
    }
}

readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}).on('line', line => {
    const [command, ...args] = line.split(' ');
    const action = commands[command];
    if (!action) {
        console.error(`Invalid command: ${command}`);
        return;
    }
    action.apply(null, args);
});