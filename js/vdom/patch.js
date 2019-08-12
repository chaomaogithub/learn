let allPatches
let index = 0

function patch(node, patches) {
    // 给某个元素打补丁
    allPatches = patches

    console.log(node)

    walkPatch(node)
}


function walkPatch(node) {
    let currentPatch = allPatches[index++]
    let childNodes = node.childNodes
    childNodes.forEach(child => {
        walkPatch(child)
    })

    if (currentPatch && currentPatch.length > 0) {
        doPatch(node, currentPatch)
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (let key in patch.attrs) {
                    let value = patch.attrs[key]

                    if (value) {
                        setAttr(node, key, value)
                    } else {
                        node.removeAttribute(key)
                    }
                }
                break
            case 'TEXT':
                node.textContent = patch.text
                break
            case 'REPLACE':
                let newNode = patch.newNode instanceof Element
                    ? render(patch.newNode)
                    : document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
                break
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break
        }
    })
}