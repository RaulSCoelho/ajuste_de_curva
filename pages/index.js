import Link from 'next/link'

function Home() {
    var xn = []
    var yn = []
    var n = 0
    return (<div>
        <header>
            <h1>Ajuste de Curvas</h1>
        </header>
        <section id="principal">
            <div id="divnums">
                Xi: <input type="number" name="xi" id="xi"></input> Yi: <input type="number" name="yi" id="yi"></input>
            </div>
            <div id='btn'>
                <input id="reset" type="button" value="Resetar" onClick={() => {
                    var res = document.getElementById('res')
                    res.innerHTML = ``
                    xn = []
                    yn = []
                }}></input><input id="adic" type="button" value="Adicionar" onClick={() => {
                    var res = document.getElementById('res')
                    var xitext = document.getElementById('xi').value
                    var yitext = document.getElementById('yi').value
                    var xi = Number(xitext)
                    var yi = Number(yitext)
                    if (xitext.length == 0 || yitext.length == 0) {
                        res.innerHTML = `[ERRO] Digite os valores de xi e yi`
                    } else {
                        if (res.innerHTML == `[ERRO] Digite os valores de xi e yi`) {
                            res.innerHTML = ``
                        }
                        res.innerHTML += `${xi} | ${yi}<br>`
                        xn.push(xi)
                        yn.push(yi)
                    }
                    n++
                }}></input>
            </div>
            <div id='res'>

            </div>
            <div id='btnres'>
                <input id="reset" type="button" value="Resultado" onClick={() => {
                    var res = document.getElementById('res')
                    var somax = 0
                    var somay = 0
                    var somaxy = 0
                    var somax2 = 0
                    var somay2 = 0
                    var b1 = 0
                    var b0 = 0
                    for (var i = 0; i < n; i++) {
                        somax += xn[i]
                    }
                    for (var i = 0; i < n; i++) {
                        somay += yn[i]
                    }
                    for (var i = 0; i < n; i++) {
                        somaxy += xn[i] * yn[i]
                    }
                    for (var i = 0; i < n; i++) {
                        somax2 += Math.pow(xn[i], 2)
                    }
                    for (var i = 0; i < n; i++) {
                        somay2 += Math.pow(yn[i], 2)
                    }
                    b1 = (n * somaxy - somax * somay) / (n * somax2 - Math.pow(somax, 2))
                    b0 = (somay-somax*b1)/n
                    res.innerHTML = `𝑓(𝑥) = ${b0.toFixed(3)} + ${b1.toFixed(3)}𝑥`
                }}></input>
            </div>
        </section>
        <footer>
            <p>&copy; Raul Semicek Coelho</p>
        </footer>
    </div>)
}

export default Home