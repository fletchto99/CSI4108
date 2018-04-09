let p = 1019;
let q = 1231;
let M = p*q;
let seed = 1254383;

for(let i = 0; i < 20; i++) {
    seed = (seed*seed)%M;
    console.log(seed)
}
