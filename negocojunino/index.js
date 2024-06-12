function começar(target) {
    var dados = document.querySelectorAll('.Ativo')
    target.remove()
    document.getElementById('comecarReiniciar').innerHTML = `<button onclick="btnReset(this)" class="btn btn-outline-secondary">reiniciar</button>`
    dados.forEach(element => {
        element.classList.add('flip')
    });
    iniciarCronometro()
    setTimeout(() => {
        dados.forEach(element => {
            element.classList.remove('flip')
            element.classList.remove('Inclicavel')
        });
    }, "2000");
}

function btnReset(target) {
    reset()
    target.remove()
    document.getElementById('comecarReiniciar').innerHTML = `<button onclick="começar(this)" class="btn btn-outline-success">começar</button>`
}

localStorage.setItem("ValorAnterior", null);
localStorage.setItem("Tentativas", 0)


let minutos = 0;
let segundos = 0;
let cronometro;
function atualizarCronometro() {
    segundos++;
    if (segundos == 60) {
        segundos = 0;
        minutos++;
    }

    let minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    let segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;

    document.getElementById('Tempo').textContent = `Tempo: ${minutosFormatados}:${segundosFormatados}`;
}

function iniciarCronometro() {
    if (!cronometro) {
        cronometro = setInterval(atualizarCronometro, 1000);
    }
}

function pararCronometro() {
    clearInterval(cronometro);
    cronometro = null;
}

function reiniciarCronometro() {
    pararCronometro();
    minutos = 0;
    segundos = 0;
}

window.addEventListener('beforeunload', () => {
    pararCronometro();
});

function SelecionarItem(element) {
    element.classList.add('flip');
    setTimeout(() => {
        var value = element.getAttribute('data-codigo')
        var ValorAnterior = localStorage.getItem("ValorAnterior")
        if (ValorAnterior == 'null') {
            element.classList.add('Inclicavel')
            if (!cronometro) {
                iniciarCronometro()
            }
            localStorage.setItem("ValorAnterior", value);
        } else {
            if (value == ValorAnterior) {
                var Results = document.querySelectorAll(`[data-codigo="${value}"]`)
                Results.forEach(target => {
                    target.classList.add('Desativo');
                    target.classList.remove('Ativo');
                    target.classList.remove('flip');
                });
                localStorage.setItem("ValorAnterior", null);
                CheckFinalizar()
            } else {

                var Tentativas = parseInt(localStorage.getItem('Tentativas'))
                CheckDerrota(Tentativas)
                localStorage.setItem('Tentativas', (Tentativas + 1))
                document.querySelector('#Tentativas').innerHTML = `Tentativas: ${Tentativas + 1}`
                var Results = document.querySelectorAll(`[data-codigo="${ValorAnterior}"]`)
                Results.forEach(target => {
                    target.classList.remove('Inclicavel');
                    target.classList.remove('flip');
                    element.classList.remove('flip');
                });
                element.classList.remove('Inclicavel')
                localStorage.setItem("ValorAnterior", null);
            }
        }
    }, "800");

}

function reset() {
    document.getElementById('Tentativas').innerHTML = 'Tentativas: 0'
    document.getElementById('Tempo').innerHTML = 'Tempo: 00:00'
    localStorage.setItem("ValorAnterior", null);
    reiniciarCronometro()
    localStorage.setItem("Tentativas", 0)
    var Results = document.querySelectorAll(`[data-codigo]`)
    Results.forEach(target => {
        target.classList.remove('Desativo');
        target.classList.remove('Inclicavel');
        target.classList.add('Ativo');
    });
}

function CheckFinalizar() {
    setTimeout(() => {
        var Total = document.querySelectorAll('.Ativo')
        if (Total.length == 0) {
            pararCronometro()
            const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            myModal.show();
        }
    }, "500");
}

function CheckDerrota(qtdErros) {
    if (qtdErros >= 4) {
        pararCronometro()
        const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop2'));
        myModal.show();
    }
}


