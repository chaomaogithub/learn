// import { createElement } from './element'

let vertualDom = createElement('ul', { class: 'list'}, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])

let vertualDom2 = createElement('ul', { classa: 'list-group'}, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('div', { class: 'item' }, ['3'])
])



// 如果平级元素互换 那会导致重新渲染
// 新增节点也不会被更新
// index

let el = render(vertualDom)
renderDom(el, window.root)

let patches = diff(vertualDom, vertualDom2)

// 给元素打补丁
patch(el, patches)

console.log(patches)




// DOM Diff比较两个虚拟DOM区别 比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom

// 先序深度优先遍历

// 先遍历深度