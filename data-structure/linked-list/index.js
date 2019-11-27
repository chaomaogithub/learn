// 1、输入一个链表，按链表值从尾到头的顺序返回一个ArrayList

/*
function ListNode(x){
    this.val = x;
    this.next = null;
}
*/

function printListFromTailToHead(head) {
    let arr = []

    while(head.next) {
        arr.unshift(head.val)
        head = head.next
    }

    return arr
}

var c = {
    val: 'c',
    next: null
}

var b = {
    val: 'b',
    next: c
}

var a = {
    val: 'a',
    next: b
}


// 2. 输入一个链表，反转链表后，输出新链表的表头

function reverseList(head) {
    let prevNode = null
    // let nextNode = null
    
    while(head) {
        console.log('head:', head)
        // head = head.next
        head.next = prevNode
        prevNode = head
        head = head.next
    }

    return prevNode

    // return prevNode
}
reverseList(a)

console.log(a, b, c)
