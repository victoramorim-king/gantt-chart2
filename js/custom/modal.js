// script.js
// Obtém a referência para os elementos do DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

var produtos = [
    { id: 0, nome: "Cloro Gel Eco" },
    { id: 1, nome: "Cloro Líquido Eco" },
    { id: 2, nome: "Cloro Barra Eco" }
];

var db = [
    [{
        name: "Cloro Gel Eco",
        desc: "Separar material",
        values: [{
            from: 1735689600000,
            to: 1735689600000,
            label: "Preparação",
            customClass: "ganttRed"
        }]
    }, {
        desc: "Colocar material na máquina",
        values: [{
            from: 1735689600000 + (1 * 60 * 60 * 1000),
            to: 1735689600000 + (1 * 60 * 60 * 1000),
            label: "Carregamento",
            customClass: "ganttYellow"
        }]
    }, {
        desc: "Produção do gel",
        values: [{
            from: 1735689600000 + (2 * 60 * 60 * 1000),
            to: 1735689600000 + (4 * 60 * 60 * 1000), 
            label: "Produção",
            customClass: "ganttGreen"
        }]
    }], [{
        name: "Cloro Líquido Eco",
        desc: "Separar material",
        values: [{
            from: 1735689600000,
            to: 1735689600000,
            label: "Preparação",
            customClass: "ganttRed"
        }]
    }, {
        desc: "Colocar material na máquina",
        values: [{
            from: 1735689600000 + (1 * 60 * 60 * 1000),
            to: 1735689600000 + (1 * 60 * 60 * 1000),
            label: "Carregamento",
            customClass: "ganttYellow"
        }]
    }, {
        desc: "Produção do Cloro Líquido",
        values: [{
            from: 1735689600000 + (2 * 60 * 60 * 1000),
            to: 1735689600000 + (5 * 60 * 60 * 1000), // 3 horas após o início
            label: "Produção",
            customClass: "ganttGreen"
        }]
    }], [{
        name: "Cloro Barra Eco",
        desc: "Separar material",
        values: [{
            from: 1735689600000,
            to: 1735689600000,
            label: "Preparação",
            customClass: "ganttRed"
        }]
    }, {
        desc: "Colocar material na máquina",
        values: [{
            from: 1735689600000 + (1 * 60 * 60 * 1000),
            to: 1735689600000 + (1 * 60 * 60 * 1000),
            label: "Carregamento",
            customClass: "ganttYellow"
        }]
    }, {
        desc: "Produção do Cloro Barra",
        values: [{
            from: 1735689600000 + (2 * 60 * 60 * 1000),
            to: 1735689600000 + (6 * 60 * 60 * 1000), // 3 horas após o início
            label: "Produção",
            customClass: "ganttGreen"
        }]
    }]
];

// Obtém referência ao elemento select


// Quando o usuário clicar no botão, a modal é exibida
btn.onclick = function () {
    modal.style.display = "block";

    // Obtém a data e hora atual
    var dataAtual = new Date();
    dataAtual.setMinutes(0); // Arredonda os minutos para 00
    dataAtual.setHours(dataAtual.getHours() - 2);
    var dataFormatada = dataAtual.toISOString().slice(0,16); // Formato: YYYY-MM-DDTHH:MM

    // Define a data mínima para o campo de entrada
    document.getElementById("dataInicial").min = dataFormatada;
    document.getElementById("dataInicial").value = dataFormatada;


    var selectProduto = document.getElementById("produto");

    // Limpar o select removendo todas as options existentes
    selectProduto.innerHTML = '';

    // Itera sobre o array de produtos e adiciona opções ao select
    produtos.forEach(function (produto) {
        var option = document.createElement("option");
        option.value = produto.id;
        option.text = produto.nome;
        selectProduto.appendChild(option);
    });

    atualizarTabela();
}

// Quando o usuário clicar no "x", a modal é fechada
span.onclick = function () {
    modal.style.display = "none";
}

// Fecha a modal se o usuário clicar fora dela
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function atualizarTabela() {
    var selectProduto = document.getElementById("produto");
    var indice = selectProduto.value; // Obtém o valor selecionado no select

    var tbody = document.querySelector("table tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo atual do tbody

    // Itera sobre os dados do produto selecionado e popula a tabela
    db[indice].forEach(function (etapa) {
        var tr = document.createElement("tr");

        // Adiciona as células com os dados da etapa
        var tdEtapa = document.createElement("td");
        tdEtapa.textContent = etapa.desc;
        tr.appendChild(tdEtapa);

        var tdTempo = document.createElement("td");
        // Calcula o tempo decorrido em horas
        var tempoDecorrido = (etapa.values[0].to - etapa.values[0].from) / (60 * 60 * 1000) + 1;
        tdTempo.textContent = tempoDecorrido + "h";
        tr.appendChild(tdTempo);

        var tdDescricao = document.createElement("td");
        tdDescricao.textContent = etapa.values[0].label;
        tr.appendChild(tdDescricao);

        var tdCor = document.createElement("td");
        tdCor.textContent = etapa.values[0].customClass;
        tr.appendChild(tdCor);

        // Adiciona a linha à tabela
        tbody.appendChild(tr);
    });
}

function adicionarProcesso(){
    var selectProduto = document.getElementById("produto");
    var indice = selectProduto.value; // Obtém o valor selecionado no select

    demoSource.push(db[indice]);
}

// Adiciona um listener para o evento change do select para chamar a função de atualização da tabela
document.getElementById("produto").addEventListener("change", atualizarTabela);
document.getElementById("addProcessoBtn").addEventListener("click", adicionarProcesso);