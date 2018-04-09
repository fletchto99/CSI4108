# Generate a 512-bit prime number
prime = random_prime(2^513,False,2^512)

# Create a reprsentation of the curve using SAGE
E = EllipticCurve(GF(p),-3,1)

#Point = E.random_point()
prv = E.random_point()

# n = Point.order()
n = prv.order()

#each will do
na = randrange(int(p/1000))
Pa = na*prv
nb = randrange(int(p/1000))
Pb = nb*prv

#Alice will do
Alice_Generated_Shared_Secret_Point = E.random_point()
k = Pb
C1 = na*prv
C2 = Alice_Generated_Shared_Secret_Point + na*Pb

#Bob will do
Bob_decrypted_shared_secret_point = C2 - C1*nb
timeit('C2 - C1*nb') #timing decryption
print "Alice genererated this secret point to talk to Bob", Alice_Generated_Shared_Secret_Point
print "Bob decrypted this secret point to talk to Alice", Bob_decrypted_shared_secret_point
print "is shared secret transfered? -> ", Alice_Generated_Shared_Secret_Point == Bob_decrypted_shared_secret_point
