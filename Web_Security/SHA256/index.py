import hashlib


def stringToBinary(n):
    return ''.join([format(ord(char), '08b') for char in n])

# STEP 1 and 2 : Padding bits and length
def padding(message):
    bin_mess = stringToBinary(message)
    bin_mess += "1"

    # m+p=(n∗512)−64
    while (len(bin_mess) % 512) != 448:
        bin_mess += "0"

    # Append original message length in bits as 64-bit binary number
    original_length = format(len(message) * 8, '064b')
    bin_mess += original_length
    
    return bin_mess


# STEP 3 : Initialize hash values (H) and constants (K) as per SHA-256 specification
# SHA-256 Constants
K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]
# Initial Hash Values
H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]

# STEP 4 aka the hard part : processing each message block

def rightrotate(x, n):
    return ((x >> n) | (x << (32 - n))) & 0xFFFFFFFF

def compression_function(chunk, K, H):
    # Prepare the message schedule
    W = []
    for i in range(16):
        W.append(int(chunk[i*32:(i+1)*32], 2))
    for i in range(16, 64):
        s0 = rightrotate(W[i-15], 7) ^ rightrotate(W[i-15], 18) ^ (W[i-15] >> 3)
        s1 = rightrotate(W[i-2], 17) ^ rightrotate(W[i-2], 19) ^ (W[i-2] >> 10)
        W.append((W[i-16] + s0 + W[i-7] + s1) & 0xFFFFFFFF)

    # Initialize working variables to current hash value
    a, b, c, d, e, f, g, h = H

    # Compression main loop
    for i in range(64):
        S1 = rightrotate(e, 6) ^ rightrotate(e, 11) ^ rightrotate(e, 25)
        ch = (e & f) ^ ((~e) & g)
        temp1 = (h + S1 + ch + K[i] + W[i]) & 0xFFFFFFFF
        S0 = rightrotate(a, 2) ^ rightrotate(a, 13) ^ rightrotate(a, 22)
        maj = (a & b) ^ (a & c) ^ (b & c)
        temp2 = (S0 + maj) & 0xFFFFFFFF

        h = g
        g = f
        f = e
        e = (d + temp1) & 0xFFFFFFFF
        d = c
        c = b
        b = a
        a = (temp1 + temp2) & 0xFFFFFFFF

    # Add the compressed chunk to the current hash value
    H[0] += a
    H[1] += b
    H[2] += c
    H[3] += d
    H[4] += e
    H[5] += f
    H[6] += g
    H[7] += h

    # Return the updated hash values
    return [x & 0xFFFFFFFF for x in H]


def sha256(message):
    padded_message = padding(message)
    
    # Parse the padded message into 512-bit blocks
    message_blocks = [padded_message[i:i+512] for i in range(0, len(padded_message), 512)]
    
    # Global hash values H
    global H

    # Process each message block
    for block in message_blocks:
        H = compression_function(block, K, H)

    # Final hash value is H[0] to H[7] concatenated
    return ''.join([format(h, '08x') for h in H])

print("Result from hashlib : ", hashlib.sha256(b"password").hexdigest())
print("Result from my own sha256 function : ", sha256("password"))