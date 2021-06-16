import { LinearScale } from 'chart.js';
import Link from 'next/link';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Interpol = () => {
    var fx = []
    var x = []
    var xn = []
    var yn = []
    var n = 0

    const [chartData1, setChartData1] = useState({})

    function chart1() {

        setChartData1({
            labels: x,
            datasets: [
                {
                    label: 'Interpolação Linear',
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
    }, [])

    return <div>
        <header>
            <a id="link" href="/"> Ajuste Linear de Curvas </a>
            <h1>Interpolação Linear</h1>
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
                        if (res.innerHTML == `[ERRO] Digite os valores de xi e yi` || res.innerHTML == `[ERRO] Digite no mínimo dois valores para xi e yi`) {
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
                    if (xn.length < 2) {
                        res.innerHTML = `[ERRO] Digite no mínimo dois valores para xi e yi`
                    } else {
                        fx = []
                        x = []
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
                            i = xn.length - 1
                            i -= i3
                            i3++
                            i2++
                        }
                        res.innerHTML = ``
                        var cont = 0
                        for (var i = 0; i < xn.length - 1; i ++) {
                            //y0 = a1 * x0 + a0
                            //- y1 = - (a1 * x1) - a0
                            cont++
                            var a0 = 0
                            var a1 = 0
                            var y0 = yn[i]
                            var x0 = xn[i]
                            var y1 = yn[i + 1]
                            var x1 = xn[i + 1]
                            a1 = (y0 - y1) / (x0 - x1)
                            a0 = y0 - (x0 * a1)
                            y0 = a1 * x0 + a0
                            if(y0 != fx[fx.length-1]){
                                fx.push(y0.toFixed(3))
                            }
                            if(x0 != x[x.length-1]){
                                x.push(x0.toFixed(3))
                            }
                            y1 = a1 * x1 + a0
                            if(y1 != fx[fx.length-1]){
                                fx.push(y1.toFixed(3))
                            }
                            if(x1 != x[x.length-1]){
                                x.push(x1.toFixed(3))
                            }
                            if (a0 < 0) {
                                res.innerHTML += `\u{1F4C9} Equação da reta ${cont}: <br>`
                                res.innerHTML += `a1 = ${a1.toFixed(3)} | a0 = ${a0.toFixed(3)} <br>`
                                res.innerHTML += `𝑓(𝑥) = ${a1.toFixed(3)}𝑥 - ${Math.abs(a0).toFixed(3)} <br><br>`
                            } else {
                                res.innerHTML += `\u{1F4C9} Equação da reta ${cont}: <br>`
                                res.innerHTML += `a1 = ${a1.toFixed(3)} | a0 = ${a0.toFixed(3)} <br>`
                                res.innerHTML += `𝑓(𝑥) = ${a1.toFixed(3)}𝑥 + ${a0.toFixed(3)} <br><br>`
                            }
                            //window.alert(`x[${x}] a1[${a1}] a0[${a0}] \n xn[${xn}] \n\n fx[${fx}] \n yn[${yn}]`)
                        }
                        chart1()
                    }
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
        </div>
    </div>
}

export default Interpol