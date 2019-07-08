// 生成正则表达式的状态机图  https://regexper.com/

/**
 * 单个字符
 * 换行符     \n     new line
 * 换页符     \f     form  feed
 * 回车符     \r     return
 * 空白符     \s     space
 * 制表符     \t     tab
 * 垂直制表符  \v    vertical tab
 * 回退符     [\b]   backspace，之所以使用[]符号是避免和\b重复
 */


// 位置边界

// 1、单词边界
// \b


// 子表达式
/**
 * 所谓回溯引用（backreference）指的是模式的后面部分引用前面已经匹配到的子字符串。你可以把它想象成是变量，
 * 回溯引用的语法像\1,\2,....,其中\1表示引用的第一个子表达式，\2表示引用的第二个子表达式，以此类推。而\0则表示整个表达式。
 */
'abc abc 123'.replace(/(ab)c \1/g,'$1g')  // abgc 123

// 回溯引用
'abc abc 123'.replace(/(ab)c/g, '$1g')  // // 得到结果 'abg abg 123'

// 非捕获型括号
// 如果我们不想子表达式被引用，可以使用非捕获正则(?:regex)这样就可以避免浪费内存

'scq000'.replace(/(scq00)(?:0)/, '$1,$2')
// 返回scq00,$2
// 由于使用了非捕获正则，所以第二个引用没有值，这里直接替换为$2


// ========== 前向查找 =======
// 前向查找(lookahead)是用来限制后缀的。凡是以(?=regex)包含的子表达式在匹配过程中都会用来限制前面的表达式的匹配
// 例如happy happily这两个单词，我想获得以happ开头的副词，那么就可以使用happ(?=ily)来匹配。

/happ(?=ily)/.test('happy')  // false

/happ(?=ily)/.test('happily')  // true


// 如果我想过滤所有以happ开头的副词，那么也可以采用负前向查找的正则happ(?!ily)，就会匹配到happy单词的happ前缀。

/happ(?!ily)/.test('happy')  // true

/happ(?!ily)/.test('happily')  // false


// =========== 后向查找 ===============
// 后向查找(lookbehind)是通过指定一个子表达式，然后从符合这个子表达式的位置出发开始查找符合规则的字串
// 举个简单的例子： apple和people都包含ple这个后缀，那么如果我只想找到apple的ple，该怎么做呢？
// 我们可以通过限制app这个前缀，就能唯一确定ple这个单词了。

/(?<=app)ple/.test('apple')  // true
/(?<=app)ple/.test('people')   // false

// 其中(?<=regex)的语法就是我们这里要介绍的后向查找。regex指代的子表达式会作为限制项进行匹配，匹配到这个子表达式后，就会继续向后查找
// 另外一种限制匹配是利用(?<!regex) 语法，这里称为负后向查找。与正前向查找不同的是，被指定的子表达式不能被匹配到。
// 于是，在上面的例子中，如果想要查找apple的ple也可以这么写成/(?<!peo)ple

/(?<!app)ple/.test('apple')  // false
/(?<!app)ple/.test('people')   // true

// 需要注意的是，不是每种正则实现都支持向后查找，在javascript中是不支持的，所以如果有用到后向查找的情况，
// 有一个思路是将字符串进行翻转，然后再使用前向查找，作完处理后再翻转回来。看一个简单的例子：
// 比如我想替换apple的ple为ply
var str = 'apple people';
str.split('').reverse().join('').replace(/elp(?=pa)/, 'ylp').split('').reverse().join('');

