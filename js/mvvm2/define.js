const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        
        if (Array.isArray(value)) {
            const augment = hasProto ? protoAugment : copyAugment

            augment(value, arrayMethods, arrayKeys)
        } else {
            this.walk(value)
        }
    }
    walk(obj) {
        const keys = Object.keys(obj)

        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function defineReactive(data, key, val) {
    let childOb = observe(val)
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend()
            console.log('get：' + key + ':' + val)

            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set: function(newVal) {
            if (val === newVal) {
                return
            }
            dep.notify()
            val = newVal
            console.log('set：' + val)
        }
    })
}

function protoAugment(target, src, keys) {
    target.__proto__ = src
}

function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[keys])
    }
}

function hasOwn(value, key) {
    return Object.prototype.hasOwnProperty.call(value, key)
}

function observe(value, asRootData) {
    if (typeof val !== 'object') {
        return
    }

    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }

    return ob
}