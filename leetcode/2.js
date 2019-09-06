var addTwoNumbers = function(l1, l2) {
    let max = Math.max(l1.length, l2.length)
    
    let arr = []
    let flag = false
    for (let i = 0; i < max; i++) {
        if ( (~~l1[i]) + (~~l2[i]) >= 10) {
            console.log(~~l1[i], ~~l2[i])
            arr.push( ((~~l1[i]) + (~~l2[i])) % 10 + (flag ? 1 : 0) )
            flag = true
        } else {
            arr.push((~~l1[i]) + (~~l2[i])  + (flag ? 1 : 0))
            flag = false
        }
    }
    
    return arr
};

let a = addTwoNumbers([2,4,3], [5,6,4])

console.log(a)