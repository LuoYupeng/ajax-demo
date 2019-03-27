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

window.jQuery.ajax = function (url, method, body, successFn, failFn) {
    let request = new XMLHttpRequest()

    request.open(method,url) //配置request 请求第一部分

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

window.$ = window.jQuery

myButton.addEventListener('click',(e) => {
    window.jQuery.ajax(
        './xxx',
        'post',
        'a=1&b=2',
        (responseText) => {console.log(1)},
        (request) => {console.log(2)}
    )
})