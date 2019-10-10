var arrayProto = Array.prototype

var arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            console.log(1111)
            return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})