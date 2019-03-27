// myButton.addEventListener('click',(e) => {
//     let request = new XMLHttpRequest()
//
//     request.open('GET','./xxx') //配置request 请求第一部分
//
//     request.setRequestHeader('tom','18') //设置请求头
//
//     request.send('请求的第四部分body')
//
//     request.onreadystatechange =  ()=>{
//         if(request.readyState === 4){
//             console.log('请求响应都完毕了')
//
//             if(request.status >= 200 && request.status <= 300){
//                 console.log ('说明请求成功')
//                 console.log(request.responseText)  //响应第四部分
//                 let string =request.responseText
//                 //把符合的JSON语法的字符串 转换成JS对应的值
//                 let object = window.JSON.parse(string)
//
//                 console.log(request.getAllResponseHeaders()) //打印出所有响应头
//                 //request.status/request.statusText  request.getResponseHeader()
//                 //        200   / ok
//             }else if (request.status >= 400) {
//                 console.log('请求失败')
//             }
//         }
//     }
// })


//自己实现jQuery的ajax封装
window.jQuery = function (nodeOrSelector) {
    let nodes = { }
    nodes.addClass = function(){}
    nodes.html = function () {}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function (options) {
    //允许传两个参数
    let url
    if(arguments.length ===1){
        url = options.url
    }else if(arguments.length ===2){
        url = arguments[0]
        options = arguments[1]
    }
    let method = options.method
    let body = options.body
    let successFn = options.successFn
    let failFn = options.failFn
    let headers = options.headers

    let request = new XMLHttpRequest()
    request.open(method,url) //配置request 请求第一部分

    for(let key in headers){ //遍历设置多个header
        let value = headers[key]
        request.setRequestHeader(key, value)
    }

    request.onreadystatechange =  ()=>{
        if(request.readyState === 4){
            if(request.status >= 200 && request.status <= 300){
                successFn.call(undefined,request.responseText)

            }else if (request.status >= 400) {
                failFn.call(undefined,request)
            }
        }
    }

    request.send(body)
}

//成功之后执行两个函数
function f1(responseText){}
function f2(responseText){}

myButton.addEventListener('click',(e) => {
    window.jQuery.ajax({
        url: './xx',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'tom': '18'
        },
        successFn: (x)=>{
            f1.call(undefined,x)
            f2.call(undefined,x)
        },
        failFn: (x)=>{
            console.log(x)
            console.log(x.status)
            console.log(x.responseText )
        }
    })
})