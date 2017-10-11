let key = "1010101010101011101110111100110011001101110111011110111011101111".split('').map(val => parseInt(val))
let plaintext = "1010101010101011101110111100110011001101110111011110111011101111".split('').map(val => parseInt(val))

console.log(`------Input-----`)

console.log(`Key: ${key.join('')}`)
console.log(`Plaintext: ${plaintext.join('')}`)

//Part A -- Derive the key
console.log(`------Part A------`)

let pc1_l = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36]
let pc1_r = [63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]

let k_l = pc1_l.map(idx => key[idx-1]);
let k_r = pc1_r.map(idx => key[idx-1]);

console.log(`Key left pre shift: ${k_l.join('')}`)
console.log(`Key right pre shift: ${k_r.join('')}`)

//shift left
k_l.push(k_l.shift())
k_r.push(k_r.shift())

console.log(`K1 left after shift: ${k_l.join('')}`)
console.log(`K1 right after shift: ${k_r.join('')}`)

// Rebuild k
let k1 = k_l.concat(k_r)

console.log(`K1 before PC-2: ${k1.join('')}`)

let pc2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]

//pass key through PC-2
k1 = pc2.map(idx => k1[idx-1]);

console.log(`K1: ${k1.join('')}`)


//Part B -- Derive L0 and R0 by passing message through IP


console.log(`\n------Part B------`)

let ip = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3 ,61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7]

let im_message = ip.map(idx => plaintext[idx-1])
let l0 = im_message.slice(0, 32)
let r0 = im_message.slice(32, 64)


console.log(`l0: ${l0.join('')}`)
console.log(`r0: ${r0.join('')}`)

//Part C
console.log(`\n------Part C------`)
let e = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1]

let e_r0 = e.map(idx => r0[idx-1]);

console.log(`e_r0: ${e_r0.join('')}`)

//Part D
console.log(`\n------Part D------`)

let a = k1.map((val, idx) => val ^ e_r0[idx])

console.log(`A = k1 ^ e_r0: ${a.join('')}`)

console.log(`\n------Part E------`)

let s1_bits = a.slice(0, 6);
let s2_bits = a.slice(6, 12);
let s3_bits = a.slice(12, 18);
let s4_bits = a.slice(18, 24);
let s5_bits = a.slice(24, 30);
let s6_bits = a.slice(30, 36);
let s7_bits = a.slice(36, 42);
let s8_bits = a.slice(42, 48);

let s1 = [
	[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
	[0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
	[4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
	[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
]

let s2 = [
	[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
	[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
	[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
	[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
]

let s3 = [
	[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
	[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
	[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
	[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
]

let s4 = [
	[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
	[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
	[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
	[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
]

let s5 = [
	[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
	[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
	[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
	[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
]

let s6 = [
	[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
	[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
	[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
	[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
]

let s7 = [
	[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
	[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
	[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
	[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
]

let s8 = [
	[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
	[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
	[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
	[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
]

let binArray = (num, bits) => {
	let n = num.toString(2);
	return n.length >= bits ? n.split('').map(val => parseInt(val)) : (new Array(bits - n.length + 1).join("0") + n).split('').map(val => parseInt(val));
}

let getRow = arr => {
	return parseInt(`${arr[0]}${arr[5]}`, 2)
}

let getCol = arr => {
	return parseInt(`${arr[1]}${arr[2]}${arr[3]}${arr[4]}`, 2)
}

let s1_sub = binArray(s1[getRow(s1_bits)][getCol(s1_bits)], 4)
let s2_sub = binArray(s2[getRow(s2_bits)][getCol(s2_bits)], 4)
let s3_sub = binArray(s3[getRow(s3_bits)][getCol(s3_bits)], 4)
let s4_sub = binArray(s4[getRow(s4_bits)][getCol(s4_bits)], 4)
let s5_sub = binArray(s5[getRow(s5_bits)][getCol(s5_bits)], 4)
let s6_sub = binArray(s6[getRow(s6_bits)][getCol(s6_bits)], 4)
let s7_sub = binArray(s7[getRow(s7_bits)][getCol(s7_bits)], 4)
let s8_sub = binArray(s8[getRow(s8_bits)][getCol(s8_bits)], 4)

console.log(`S1 after sub: ${s1_sub.join('')}`)
console.log(`S2 after sub: ${s2_sub.join('')}`)
console.log(`S3 after sub: ${s3_sub.join('')}`)
console.log(`S4 after sub: ${s4_sub.join('')}`)
console.log(`S5 after sub: ${s5_sub.join('')}`)
console.log(`S6 after sub: ${s6_sub.join('')}`)
console.log(`S7 after sub: ${s7_sub.join('')}`)
console.log(`S8 after sub: ${s8_sub.join('')}`)

console.log(`\n------Part F------`)
let b = s1_sub.concat(s2_sub).concat(s3_sub).concat(s4_sub).concat(s5_sub).concat(s6_sub).concat(s7_sub).concat(s8_sub)
console.log(`B: ${b.join('')}`)

console.log(`\n------Part G------`)
let p = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25]

let p_b = p.map(idx => b[idx-1]);

console.log(`P(B): ${p_b.join('')}`)


console.log(`\n------Part H------`)

let r1 = p_b.map((val, idx) => val ^ l0[idx])

console.log(`r1 = P(B) ^ l0: ${r1.join('')}`)

console.log(`\n------Part I------`)

let l1 = r0;

let msg_preip = r1.concat(l1);
let ip_inverse = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25]


let ciphertext = ip_inverse.map(idx => msg_preip[idx-1]);

console.log(`Ciphertext: ${ciphertext.join('')}`);


