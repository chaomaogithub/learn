/**
 * 规则：当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包 { type: 'ATTRS', attrs: {class: 'list-group'} }
 * 
 * 新的dom节点不存在 { type:'REMOVE', index: xxx }
 * 
 * 节点类型不相同时，直接采用替换模式 { type: 'REPLACE', newNode: newNode }
 * 
 * 文本的变化 { type: 'TEXT', text: 1 }
 */

function diff(oldTree, newTree) {
    let patches = {}
    let index = 0

    // 递归数 比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches)

    return patches
}

const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'

let Index = 0

function diffAttr(oldAttrs, newAttrs) {
    let patch = {}

    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]  // 有可能是undefined
        }
    }

    for (let key in newAttrs) {
        // 老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }

    return patch
}


function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index
        // index 每次传递给walk时 index是递增的, 所有的人都基于一个来实现
        walk(child, newChildren[idx], ++Index, patches)
    });
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

function walk(oldNode, newNode, index, patches) {
    let currentPatch = [] // 每个元素都有一个补丁对象

    if (!newNode) {
        currentPatch.push({ type: REMOVE, index})
    } else if (isString(oldNode) && isString(newNode)) {  // 判断文本是否一致
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props)

        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs})
        }

        // 如果有儿子节点 遍历儿子
        diffChildren(oldNode.children, newNode.children, patches)
    } else {
        currentPatch.push({type: REPLACE, newNode})
    }

    if (currentPatch.length > 0) { // 当前元素确实有补丁
        // 
        patches[index] = currentPatch
    }
}