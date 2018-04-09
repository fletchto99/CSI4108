# Message as per the assigment
m = 399621883454709

# Given public exponent
e = 65537

# Prime number generation (a number between 2^1024 and 2^1025 which is prime)
p = random_prime(2^1025,None,2^1024)
q = random_prime(2^1025,None,2^1024)

# Compute phi and n
n = p*q
phi = (p-1)*(q-1)

# Compute the private exponenet
d = inverse_mod(e,phi)

# Ecnrypt the data
encrypted = power_mod(m,e,n)

# Decrypt the data normally
timeit('pow(encrypted,d,n)')
print(pow(encrypted,d,n))


# Decrypt the data using chinese remainder therom
dP = int(d)%(p-1)
dQ = int(d)%(q-1)

cP = c%p
cQ = c%q

mP = power_mod(cP, dP, p)
mQ = power_mod(cQ, dQ, p)

timeit('crt([mP, mQ], [p,q])')
print(crt([mP, mQ], [p,q]))
