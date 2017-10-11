//Converts a number to binary and pads it to n bits
//for example genBitArray(2, 5) would return [0, 0, 0, 1, 0]
let genBitArray = (num, bits) => {
	let n = num.toString(2);
	return n.length >= bits ? n.split('').map(val => parseInt(val)) : (new Array(bits - n.length + 1).join("0") + n).split('').map(val => parseInt(val));
}

//Replaces n items in an array with items from another array
let replaceBits = (main, replacement, start) => {
	Array.prototype.splice.apply(main, [start, replacement.length].concat(replacement))
}

let substitute = (ciphertext, substitute) => {
	let subGroup = (start, end) => {
		return substitute[parseInt(ciphertext.slice(start,end).join(''), 2)]
	}

	return genBitArray(subGroup(0,4),4)
			.concat(genBitArray(subGroup(4,8),4))
			.concat(genBitArray(subGroup(8,12),4))
			.concat(genBitArray(subGroup(12,16),4))
}

let sbox = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7]
let perm = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]
let sbox_inverse = [14, 3, 4, 8, 1, 12, 10, 15, 7, 13, 9, 6, 11, 2, 0, 5]

let encrypt = (plaintext, keys) => {

	let ciphertext = plaintext;

	for(let i = 0; i < 3; i++) {
		//k1 mixing
		ciphertext = ciphertext.map((val, idx) => {
			return keys[i][idx] ^ val
		})
		//substitution
		ciphertext = substitute(ciphertext, sbox)

		//permutation
		ciphertext = perm.map(idx => ciphertext[idx-1])
	}

	//k4 mixing
	ciphertext = ciphertext.map((val, idx) => {
		return val ^ keys[4][idx]
	})

	//substitution
	ciphertext = substitute(ciphertext, sbox)

	//k4 mixing
	ciphertext = ciphertext.map((val, idx) => {
		return val ^ keys[4][idx]
	})

	return ciphertext;
}

//Generate the round keys
console.log(`Generating round keys...`);

keys = Array.from({length: 5}, () => genBitArray(Math.round(Math.random()*(Math.pow(2, 16)-1)) + 1, 16));

let replacement7D = genBitArray(0x7D, 8);
replaceBits(keys[4], replacement7D.slice(0,4), 4)
replaceBits(keys[4], replacement7D.slice(4,8), 12)

console.log(keys);

console.log(`Done!`);

let pairs = [];

console.log(`Generating plaintext/ciphertext pairs...`);

for(let i = 0; i < 10000; i++) {
	let plaintext = genBitArray(Math.round(Math.random()*(Math.pow(2, 16)-1)) + 1, 16);

	//ensure plaintext hasn't been used
	while (pairs.find(pair => {
		return pair.plaintext.every((elem,idx)=> elem === plaintext[idx])
	}) != undefined) {
		plaintext = genBitArray(Math.round(Math.random()*(Math.pow(2, 16)-1)) + 1, 16);
	}

	let ciphertext = encrypt(plaintext, keys);


	pairs.push({
		plaintext: plaintext,
		ciphertext: ciphertext
	})
}

console.log(pairs.slice(0,10))
console.log('(only showing first 10 pairs)')

console.log(`Done!`)

console.log(`Perfoming cryptanalysis...`)

for(let i = 0x65; i <= 0x85; i++) {
	let replacementBits = genBitArray(i, 8);
	replaceBits(keys[4], replacementBits.slice(0,4), 4)
	replaceBits(keys[4], replacementBits.slice(4,8), 12)

	let correct = 0;

	pairs.forEach((pair, idx) => {
		let reverse  = pair.ciphertext.map((val, idx) => {
			return val ^ keys[4][idx]
		})
		reverse = substitute(reverse, sbox_inverse)

		if (reverse[5] ^ reverse[7] ^ reverse[13] ^ reverse[15] ^ pair.plaintext[4] ^ pair.plaintext[6] ^ pair.plaintext[7] == 0) {
			correct++
		}
	});
	console.log(`0x${i.toString(16)}: ${(Math.abs(correct - (pairs.length/2)) / pairs.length).toFixed(3)}`)
}
