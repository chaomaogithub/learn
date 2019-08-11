class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)

        this.vm = vm

        // 如果这个元素能获取到，我们才开始编译
        if (this.el) {
            // 1. 先把真是的dom移入到内存中 fragment
            let fragment = this.node2fragment(this.el)

            // 2. 编译 => 提取想要的元素节点  v-model 和 文本节点{{}}
            this.compile(fragment)
            // 3. 把编译好的fragment再塞回页面里去

            this.el.appendChild(fragment)

        }
    }
    /**
     * 专门写一些辅助方法
     */
    isElementNode(node) { // 是否是元素节点
        return node.nodeType === 1
    }
    // 是不是指令
    isDirective(name) {
        return name.startsWith('v-')
    }

     /**
      * 核心方法
      */
    compileElement(node) {
        // 带v-model v-text v-aaaa
        let attrs = node.attributes;

        Array.from(attrs).forEach(attr=> {
            // 判断属性名字是不是包含v-
            let attrName = attr.name

            if (this.isDirective(attr.name)) {
                // 取到对应的值放到节点中

                let expr = attr.value
                let type = attrName.slice(2)

                // node this.vm.$data a
                CompileUtil[type](node, this.vm, expr)
            }
        })
    }
    compileText(node) {
        // 带 {{}}
        let expr = node.textContent;
        let reg = /\{\{([^]+)\}\}/g

        if (reg.test(expr)) {
            // node ths.vm.$data
            CompileUtil.text(node, this.vm, expr)
        }
    }
    compile(fragment) {
        let childNodes = fragment.childNodes

        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 元素节点，还还需要继续深入检查
                // 这里需要编译元素
                this.compileElement(node)
                this.compile(node)
            } else {
                // 文本节点
                // 这里需要编译文本
                this.compileText(node)
            }
        })
    }
    node2fragment(el) { // 需要将el中的内存全部放在内存中
        let fragment = document.createDocumentFragment()
        let firstChild

        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }

        return fragment
    }
}


var CompileUtil = {
    getVal(vm, expr) {
        // todo 考虑中括号
        expr = expr.split('.')

        return expr.reduce((prev, next) => { // vm.$data.a
            return prev[next]
        }, vm.$data)
    },
    setVal(vm, expr, value) {
        expr = expr.split('.')

        return expr.reduce((prev, next, currentIndex)=> {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value
            }
            return prev[next]
        }, vm.$data)
    },
    getTextVal(vm, expr) { // 获取编译文本后的结果
        return expr.replace(/\{\{([^]+)\}\}/g, (...arguments) => {

            return this.getVal(vm, arguments[1].trim())
        })
    },
    text(node, vm, expr) { // 文本处理
        let updaterFn = this.updater.textUpdater

        let value = this.getTextVal(vm, expr)

        expr.replace(/\{\{([^]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1].trim(), (newValue) => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updaterFn && updaterFn(node, this.getTextVal(vm, expr))
            })
        })

        if (updaterFn) {
            updaterFn(node, value)
        }
    },
    model(node, vm, expr) { // 输入框处理
        let updaterFn = this.updater.modelUpdater

        // 这里应该加一个监控  数据变化了  应该调用这个 watch的callback

        new Watcher(vm, expr, (newValue)=> {
            // 当值变化后，会调用cb 将新的值的传递过来
            updaterFn && updaterFn(node, this.getVal(vm, expr))
        })

        node.addEventListener('input', (e) => {
            let newValue = e.target.value

            this.setVal(vm, expr, newValue)
        })

        if (updaterFn) {
            updaterFn(node, this.getVal(vm, expr))
        }
    },
    updater: {
        // 文本更新
        textUpdater(node, value) {
            node.textContent = value
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value
        }
    }
}