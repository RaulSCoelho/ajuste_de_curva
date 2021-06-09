import Link from 'next/link'

function Home() {
    var xn = []
    var yn = []
    return (<div>
        <header>
            <h1>Ajuste de Curvas</h1>
        </header>
        <section id="principal">
            <div id="divspace">
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
                        if(res.innerHTML == `[ERRO] Digite os valores de xi e yi`){
                            res.innerHTML = ``
                        }
                        res.innerHTML += `${xi} | ${yi}<br>`
                        xn.push(xi)
                        yn.push(yi)
                    }
                }}></input>
            </div>
            <div id='res'>

            </div>
        </section>
        <footer>
            <p>&copy; Raul Semicek Coelho</p>
        </footer>
    </div>)
}

export default Home