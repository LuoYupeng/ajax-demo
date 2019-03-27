myButton.addEventListener('click',(e) => {
    let request = new XMLHttpRequest()

    request.open('GET','./xxx') //配置request
    request.send()

    request.onreadystatechange =  ()=>{
        if(request.readyState === 4){
            console.log('请求响应都完毕了')

            if(request.status >= 200 && request.status <= 300){
                console.log ('说明请求成功')
                console.log(request.responseText)
                let string =request.responseText
                //把符合的JSON语法的字符串 转换成JS对应的值
                let object = window.JSON.parse(string)
                console.log(typeof object)
                console.log('object.note')
                console.log(object.note)

            }else if (request.status >= 400) {
                console.log('请求失败')
            }
        }
    }
})