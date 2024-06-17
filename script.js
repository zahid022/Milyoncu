const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')
const h3 = document.querySelector('h3')
const ul = document.querySelector('ul')

let x = 0
let y = 1
let globalData = null
let j = 0
let n = 0

function getData() {
    fetch('https://raw.githubusercontent.com/zahid022/json/main/milyoncu.json')
        .then(res => res.json())
        .then(data => {
            globalData = data
            show(data)
        })
}
getData()

function show(data) {
    x = rnd(0, 80)
    let kod = ''
    let sualllar = data.sual
    h2.innerHTML = data.ad
    h1.innerHTML = "Sual: " + y + "/10"
    h3.innerHTML = sualllar[x].s
    sualllar[x].c.forEach((item, index) => kod += `<li id="a${index}" onclick="next(${index})">${item}</li>`)
    ul.innerHTML = kod
}

window.next = function next(index) {
    const cvb = document.getElementById(`a${index}`)
    if (index == globalData.sual[x].d) {
        cvb.style.background = 'green'
        j++
    } else {
        cvb.style.background = 'red'
        n++
    }
    if (y < 10) {
        y++
        setTimeout(() => {
            show(globalData)
        }, 500)
    } else if (y == 10) {
        y = 10
        h3.innerHTML = "Sizin nəticələriniz."
        setTimeout(() => {
            ul.innerHTML = `<li>Düzgün cavabların sayı: ${j}</li>
                            <li>Səhv cavabların sayı: ${n}</li>
                            <li id="refresh"><button onclick="location.reload()">Yenidən başlayın</button></li>`
        }, 500)
    }
}

// function ref(){
    
// }

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

