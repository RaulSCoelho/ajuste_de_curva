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

    const [chartData1, setChartData1] = useState({})
    const [chartData2, setChartData2] = useState({})

    function chart1() {

        setChartData1({
            labels: xn,
            datasets: [
                {
                    label: 'Pontos',
                    showLine: false,
                    data: yn,
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

    function chart2() {

        setChartData2({
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
        chart1()
        chart2()
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
                    var menorx = 0
                    var maiorx = 0
                    for (var i = 0; i < xn.length; i++) {
                        if (xn[i] > maiorx) {
                            maiorx = xn[i]
                        }
                    }
                    menorx = maiorx
                    for (var i = 0; i < xn.length; i++) {
                        if (xn[i] < menorx) {
                            menorx = xn[i]
                        }
                    }
                    for (var i2 = 0; i2 <= maiorx; i2++) {
                        x.push(i2)
                        var fxconta = Number(b0.toFixed(3)) + Number(b1.toFixed(3)) * x[i2]
                        fx.push(fxconta)
                    }

                    chart2()
                    var i = xn.length - 1
                    var i2 = 0
                    var i3 = 1
                    var maiorxsort = 0
                    while (i2 < xn.length - 1) {
                        maiorxsort = 0
                        for (i; i >= 0; i--) {
                            if (xn[i] > maiorxsort) {
                                maiorxsort = xn[i]
                            }
                        }
                        for (i = 0; i < xn.length; i++) {
                            if (xn[i] == maiorxsort && xn[i] != menorx && xn[i + 1] < xn[i]) {
                                xn[i] = xn[xn.length - i3]
                                xn[xn.length - i3] = maiorxsort
                                var ynsort = yn[i]
                                yn[i] = yn[yn.length - i3]
                                yn[yn.length - i3] = ynsort
                            }
                        }
                        i = xn.length - 2
                        i2++
                        i3++
                    }
                    chart1()
                }}></input>
            </div>
        </section>
        <footer>
            <p>&copy; Raul Semicek Coelho</p>
        </footer>
        <div id="chart">
            <Line data={chartData1} options={{
                responsive: true
            }} />
            <Line data={chartData2} options={{
                responsive: true
            }} />
        </div>
    </div>
}

export default Home