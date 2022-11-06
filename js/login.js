// 注册登录tab切换
let tab = document.querySelectorAll('.tab');
let container = document.querySelectorAll('form');
for (let i = 0; i < tab.length; i++) {
    tab[i].setAttribute('index', i);
    tab[i].onclick = function () {
        for (let i = 0; i < tab.length; i++) {
            tab[i].style.color = ''
        }
        this.style.color = '#555';
        let index = this.getAttribute('index');
        for (let i = 0; i < container.length; i++) {
            container[i].style.display = 'none';
        }
        container[index].style.display = 'block';
    }
}

const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

// 获取注册信息
let regName = document.querySelectorAll('input')[0];
let regId = document.querySelectorAll('input')[1];
let regPwd = document.querySelectorAll('input')[2];
let regBtn = document.querySelectorAll('input')[3];

// 注册事件监听
regBtn.addEventListener('click', () => {
    let host = 'http://123.60.44.50:3000'
    let key = 'users'
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    }
    let id = regId.value;
    let name = regName.value;
    let pwd = regPwd.value;
    requestOptions.body = JSON.stringify({
        id: id, name: name, password: pwd,
    });
    fetch(`${host}/${key}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            alert('注册成功')
            console.log(data.name + '用户注册成功')
        })
        .catch(err => {
            alert('用户已存在，注册失败')
            throw new Error("用户已存在，注册失败")
        })
})

// 获取登录信息
let logId = document.querySelectorAll('input')[4];
let logPwd = document.querySelectorAll('input')[5];
let logBtn = document.querySelectorAll('input')[6];

// 登录事件监听
logBtn.addEventListener('click', () => {
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    }
    let host = 'http://123.60.44.50:3000'
    let key = 'users'
    let id = logId.value;
    let password = logPwd.value;
    fetch(`${host}/${key}/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.id === id) {
                if (data.password === password) {
                    console.log(data.name + '登录成功')
                    window.location.href = encodeURI('./home.html?id=' + data.name);
                } else {
                    window.location.href = encodeURI('./error.html');
                    throw new Error("密码不正确")
                }
            } else {
                alert("用户名不存在")
                throw new Error("用户名不存在")
            }
        })
        .catch(err => console.log(err))
})