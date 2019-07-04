# 1、水仙花数只是自幂数的一种，严格来说3位数的3次幂数才称为水仙花数。
for i in range(100, 1000):
    arr = list(str(i))

    if (int(arr[0]) ** 3 + int(arr[1]) ** 3 + int(arr[2]) ** 3 == i):
        print(i)

# 2、求完美数
def perfectNumber(n):
    nums = []
    i = 1

    while i <= n:
        sums = 0
        j = 1
        while j <= i / 2:
            if i % j == 0:
                sums += j
            j += 1

        if (sums == i):
            nums.append(i)
        i += 1
    return nums

#a = perfectNumber(10000)

#print(a)


# 3、百鸡百钱
for num_cock in range(0, 100):
    for num_hen in range(0, 100):
        if 14 * num_cock + 8 * num_hen - 200 == 0 and 100 - num_hen - num_cock >= 0:
            print('公鸡{0}只，母鸡{1}只，雏鸡{2}只'.format(num_cock, num_hen, (100 - num_cock-num_hen)))


# 4、斐波那契数列
def fib(n):
    a, b = 1, 1
    while a < n:
        print(a, end= '')
        a, b = b, a + b

fib(100)


