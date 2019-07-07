import sys

def main():
    fruits = ['grape', 'apple', 'strawberry', 'waxberry']
    fruits += ['pitaya', 'pear', 'mango']
    print(fruits)

    for fruit in fruits:
        print(fruit.title(), end=' ')

    # 列表切片
    fruits2 = fruits[1:4]
    print(fruits2)

    # fruit3 = fruits  # 没有复制列表只创建了新的引用
    # 可以通过完整切片操作来复制列表
    fruits3 = fruits[:]

    print(fruits3)

    fruits4 = fruits[-3:-1]

    print(fruits4)

    # 可以通过反向切片操作来获得倒转后的列表的拷贝
    fruits5 = fruits[::-1]
    print(fruits5)

def main2():
    list1 = ['orange', 'apple', 'zoo', 'internationalization', 'blueberry']
    list2 = sorted(list1)
    # sorted函数返回列表排序后的拷贝不会修改传入的列表
    # 函数的设计就应该像sorted函数一样尽可能不产生副作用
    list3 = sorted(list1, reverse=True)
    # 通过key关键字参数指定根据字符串长度进行排序而不是默认的字母表顺序
    list4 = sorted(list1, key=len)
    print(list1)
    print(list2)
    print(list3)
    print(list4)
    # 给列表对象发出排序消息直接在列表对象上进行排序
    list1.sort(reverse=True)
    print(list1)


# 生成列表
def main3():
    f = [x for x in range(1, 30)]

    print(f)

    f = [x + y for x in 'ABCDE' for y in '1234567']
    print(f)

    # 用这种语法创建列表之后元素已经准备就绪所以需要耗费较多的内存空间
    f = [x ** 2 for x in range(1, 100)]
    print(sys.getsizeof(f))  # 查看对象占用内存的字节数
    print(f)


if __name__ == '__main__':
    main3()