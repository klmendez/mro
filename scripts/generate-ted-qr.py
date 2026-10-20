"""Generate a version 3-L byte-mode QR for Jaime's TED profile, without dependencies."""
from pathlib import Path

payload = b'https://www.ted.com/profiles/521925'
bits = []
def append(value, length):
    bits.extend((value >> i) & 1 for i in range(length - 1, -1, -1))
append(4, 4)
append(len(payload), 8)
for value in payload:
    append(value, 8)
append(0, min(4, 440 - len(bits)))
while len(bits) % 8:
    bits.append(0)
data = [sum(bits[i+j] << (7-j) for j in range(8)) for i in range(0, len(bits), 8)]
while len(data) < 55:
    data.append(0xEC if (len(data) - (len(bits)//8)) % 2 == 0 else 0x11)

def multiply(a, b):
    result = 0
    for i in range(7, -1, -1):
        result = (result << 1) ^ ((result >> 7) * 0x11D)
        result ^= ((b >> i) & 1) * a
    return result

divisor = [0] * 14 + [1]
root = 1
for _ in range(15):
    for j in range(15):
        divisor[j] = multiply(divisor[j], root)
        if j + 1 < 15:
            divisor[j] ^= divisor[j+1]
    root = multiply(root, 2)
remainder = [0] * 15
for value in data:
    factor = value ^ remainder.pop(0)
    remainder.append(0)
    remainder = [x ^ multiply(y, factor) for x, y in zip(remainder, divisor)]
codewords = data + remainder
size = 29
modules = [[False] * size for _ in range(size)]
reserved = [[False] * size for _ in range(size)]
def put(x, y, value):
    if 0 <= x < size and 0 <= y < size:
        modules[y][x] = bool(value)
        reserved[y][x] = True
for i in range(size):
    put(6, i, i % 2 == 0)
    put(i, 6, i % 2 == 0)
for cx, cy in [(3,3),(25,3),(3,25)]:
    for dy in range(-4,5):
        for dx in range(-4,5):
            put(cx+dx, cy+dy, max(abs(dx),abs(dy)) not in (2,4))
for dy in range(-2,3):
    for dx in range(-2,3):
        put(22+dx,22+dy,max(abs(dx),abs(dy)) != 1)
# Error correction L (01), mask 000; BCH format information.
format_data = 8
rem = format_data
for _ in range(10):
    rem = (rem << 1) ^ ((rem >> 9) * 0x537)
format_bits = ((format_data << 10) | rem) ^ 0x5412
bit = lambda i: (format_bits >> i) & 1
for i in range(6): put(8,i,bit(i))
put(8,7,bit(6)); put(8,8,bit(7)); put(7,8,bit(8))
for i in range(9,15): put(14-i,8,bit(i))
for i in range(8): put(size-1-i,8,bit(i))
for i in range(8,15): put(8,size-15+i,bit(i))
put(8,size-8,True)
stream = [(value >> i) & 1 for value in codewords for i in range(7,-1,-1)]
index = 0
right = size - 1
while right >= 1:
    if right == 6: right = 5
    for vertical in range(size):
        y = size - 1 - vertical if ((right+1)&2)==0 else vertical
        for x in (right,right-1):
            if not reserved[y][x]:
                value = stream[index] if index < len(stream) else 0
                modules[y][x] = bool(value ^ ((x+y)%2 == 0))
                index += 1
    right -= 2
assert index == 567 and len(codewords) == 70
path = ''.join(f'M{x+4},{y+4}h1v1h-1z' for y in range(size) for x in range(size) if modules[y][x])
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges"><rect width="37" height="37" fill="white"/><path d="{path}" fill="black"/></svg>'
Path('public/images/jaime-ted-qr.svg').write_text(svg, encoding='utf-8')
print('Generated TED QR: version 3-L, 29 modules, 4-module quiet zone.')
