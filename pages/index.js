import { LinearScale } from 'chart.js';
import Link from 'next/link';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Home = () => {
    var fx = []
    var x = []
    var xn = []
    var yn = []
    var n = 0

    const [chartData, setChartData] = useState({})

    function chart() {

        setChartData({
            labels: x,
            datasets: [
                {
                    label: 'Equação da reta',
                    data: fx,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    React.useEffect(() => {
        chart()
    }, [])

    return <div>
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
                    n = 0
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
                <input id="result" type="button" value="Resultado" onClick={() => {
                    var res = document.getElementById('res')
                    var somax = 0
                    var somay = 0
                    var somaxy = 0
                    var somax2 = 0
                    var somay2 = 0
                    var b1 = 0
                    var b0 = 0
                    var r2 = 0
                    fx = []
                    x = []
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
                    b0 = (somay - somax * b1) / n
                    if (b1 < 0) {
                        res.innerHTML = `\u{1F4C9} Equação da reta: <br>`
                        res.innerHTML += `𝑓(𝑥) = ${b0.toFixed(3)} - ${Math.abs(b1).toFixed(3)}𝑥 <br>`
                    } else {
                        res.innerHTML = `\u{1F4C9} Equação da reta: <br>`
                        res.innerHTML += `𝑓(𝑥) = ${b0.toFixed(3)} + ${b1.toFixed(3)}𝑥 <br>`
                    }
                    r2 = Math.pow((somaxy - somax * somay / n), 2) / ((somax2 - Math.pow(somax, 2) / n) * (somay2 - Math.pow(somay, 2) / n))
                    res.innerHTML += `<br>Coeficiente de Determinação (𝑅²) <br>`
                    res.innerHTML += `${r2.toFixed(5)}`
                    for (var i = 0; i < 10; i++) {
                        x.push(i)
                        var fxconta = Number(b0.toFixed(3)) + Number(b1.toFixed(3)) * x[i]
                        fx.push(fxconta)
                    }
                    chart()
                }}></input>
            </div>
        </section>
        <footer>
            <p>&copy; Raul Semicek Coelho</p>
        </footer>
        <div id="chart">
            <Line data={chartData} options={{
                responsive: true
            }} />
        </div>
    </div>
}

export default Home