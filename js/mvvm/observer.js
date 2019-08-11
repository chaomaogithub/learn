class Observer {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        // 要对这个data数据将原有的属性改成get和set的形式
        if (!data || typeof data !== 'object') {
            return
        }

        // 要将数据一一劫持 先获取到data的key和value
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data, key, data[key])
            this.observe(data[key])
        })
    }
    // 定义数据响应式
    defineReactive(obj, key, value) {
        let that = this
        let dep = new Dep() // 每个变化的数据，都会对应的数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() { // 当取值调用的方法
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) { // 当给data属性中设置值的时候，更改获取的属性的值
                if (newValue !== value) {
                    // 这里的this不是实例
                    that.observe(newValue) // 如果是对象继续劫持
                    value === newValue
                    dep.notify() // 通知所有回调方法更新
                }
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = []
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}