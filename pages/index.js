import Link from 'next/link'

function Home() {
    return (<div>
        <header>
            <h1>Contador</h1>
        </header>
        <section>
            <div id="divspace">
                Início: <input type="number" name="num1" id="num1"></input>(Da contagem)
            </div>
            <div id="divspace">
                Fim: <input type="number" name="num2" id="num2"></input>(Da contagem)
            </div>
            <div id="divspace">
                Contagem: <input type="number" name="cont" id="cont"></input>(De quanto em quanto)
            </div>
            <div id='btn'>
                <input id="button" type="button" value="Contar" onClick={() => {
                    var inicio = Number(document.getElementById('num1').value)
                    var fim = Number(document.getElementById('num2').value)
                    var cont = Number(document.getElementById('cont').value)
                    var res = document.getElementById('res')
                    if(cont == 0){
                        res.innerHTML = `[ERRO] COLOQUE O VALOR DO CONTADOR`
                    }else{
                        res.innerHTML = ``
                        if(inicio<fim){
                            for(inicio; inicio<=fim; inicio+=cont){
                                if(inicio != fim){
                                    res.innerHTML += String(inicio) + `\u{1F449}`
                                }else{
                                    res.innerHTML += String(inicio) + `\u{270B}`
                                }
                            }
                        }else{
                            for(inicio; inicio>=fim; inicio-=cont){
                                if(inicio != fim){
                                    res.innerHTML += String(inicio) + `\u{1F449}`
                                }else{
                                    res.innerHTML += String(inicio) + `\u{270B}`
                                }
                            }
                        }
                    }
                }}></input>
            </div>
            <div id="res">

            </div>
        </section>
        <footer>
            <p>&copy; RaulSCoelho</p>
        </footer>
    </div>)
}

export default Home