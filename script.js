const $nome = document.querySelector('#nome');
const $respeito = document.querySelector('#respeito');
const $estamina = document.querySelector('#estamina');
const $barraEstamina = document.querySelector('.barra-estamina div');
const $atributosJ = document.querySelectorAll('.stats-n');
const $btnRoubar = document.querySelector('.btn-roubar button');
const $tabelaRoubos = document.querySelector('.centro-tabela table');
const $selectRoubos = document.querySelector('#lista-crimes');
const $modalRoubos = document.querySelector('.modal-roubos');
const $horas = document.querySelector('.horas');
const $dias = document.querySelector('.dias');
const $btnRave = document.querySelector('.btn-rave');
const $equipamentos = document.querySelectorAll('.equipamento div');
const $tabelaArmasCompradas = document.querySelector('#tabela-armas');
const $tabelaMercado = document.querySelector('#tabela-mercado');
const $tabelaDrogas = document.querySelector('#tabela-drogas');
const $tabelaMercadoColetes = document.querySelector('#tabela-coletes');
const $tabelaMochilaColete = document.querySelector('#mochila-colete')
const $btnTransferir = document.querySelector('#btn-transferir');
const $selectBanco = document.querySelector('#select-banco');
const $inputBanco = document.querySelector('#input-banco');
const $valorSaldo = document.querySelector('#valor-saldo');
const $tabelaPutas = document.querySelector('#tabela-putas');
const $tabelaMeuCabare = document.querySelector('#tabela-minhas-putas');
const $infoCabare = document.querySelector('.info-cabare');
const $objetivos = document.querySelector('.objetivos');
const $bonusRecompensa = document.querySelector('#bonus-recompensa');
const $modalMissoes = document.querySelector('.modal-missoes');

//classes jogador roubos armas coletes
class Jogador1{
    constructor(nome, respeito, estamina, atributosJ, grana, powerRS, arma, colete, saldoConta, granaTxt, bonusReconpensa, nRoubos, nArmas){
        this.nome = nome;
        this.respeito = respeito;
        this.estamina = estamina;
        this.atributosJ = atributosJ;
        this.grana = grana;
        this.powerRS = powerRS;
        this.arma = arma;
        this.colete = colete;
        this.saldoConta = saldoConta;
        this.granaTxt = granaTxt;
        this.bonusReconpensa = bonusReconpensa;
        this.nRoubos = nRoubos;
        this.nArmas = nArmas;
    }

    get rendimento(){
        return this.calculaRendimento();
    }
    get saldoContaTxt(){
        return this.criaSaldoTxt();
    }

    calculaRendimento(){
        let n = geraNAleatorio(2, 0);
        let juros = [0.01, 0.02, 0.03];
        let rendimento = this.saldoConta * juros[n];
        console.log(`Juros: ${juros[n]}`);
        console.log(`Rendimento: ${rendimento}`)
        return rendimento;
    }

    criaSaldoTxt(){
        let saldoTxt = this.saldoConta.toLocaleString('pt-BR')
        return saldoTxt;
    }
}

class Roubos{
    constructor(nome, estaminaR, powerNecessario, recompensaTxt, rMin, rMax, atributosMin, atributosMax, respeitoR){
        this.nome = nome;
        this.estaminaR = estaminaR;
        this.powerNecessario = powerNecessario;
        this.recompensaTxt = recompensaTxt;
        this.rMin = rMin;
        this.rMax = rMax;
        this.atributosMin = atributosMin;
        this.atributosMax = atributosMax;
        //this.atributosTotal = atributosTotal;
        this.respeitoR = respeitoR;
    }

    get valorTotal(){
        return this.calculaValorTotal();
    }
    get atributosTotal(){
        return this.calculaAtibutosTotal();
    }

    calculaValorTotal(){
        let total = this.recompensa + (this.recompensa * jogador1.bonusReconpensa);
        total = parseInt(total.toFixed(0));

        return  total;
    }

    calculaAtibutosTotal(){
        let atriTotal = geraNAleatorio(this.atributosMax, this.atributosMin);
        return atriTotal;
    }
}

class Armas{
    constructor(nome, forca, preco, pBonus, id, precoTxt){
        this.nome = nome;
        this.forca = forca;
        this.preco = preco;
        this.pBonus = pBonus;
        this.id = id;
        this.precoTxt = precoTxt;
    }

    get bonusArma(){
        return this.calculaBonusArma();
    }

    calculaBonusArma(){
        let bonusRS = 0;
        if(this.forca == undefined){
            bonusRS = 0;
        }else{
            jogador1.powerRS = parseInt(jogador1.powerRS);
            bonusRS = this.forca + (jogador1.powerRS * (this.pBonus));
        }
        return bonusRS
    }
}


class Coletes{
    constructor(nome, resistencia, preco, resBonus, id, precoTxt){
        this.nome = nome;
        this.resistencia = resistencia;
        this.preco = preco;
        this.resBonus = resBonus;
        this.id = id;
        this.precoTxt = precoTxt;
    }
}

class Relogio{
    constructor(segundos, minutos, horas, dias, penalidade, comeco){
        this.segundos = segundos;
        this.minutos =  minutos;
        this.horas = horas;
        this.dias = dias;
        this.penalidade = penalidade;
        this.comeco = comeco;
    }
}

class DrogasRave{
    constructor(nome, estaminaRecuperada, preco){
        this.nome = nome;
        this.estaminaRecuperada = estaminaRecuperada;
        this.preco = preco;
    }
}

class Putas{
    constructor(nome, foto, pagamentoDia, preco, ganhos, quantidade, id, precoTxt){
        this.nome = nome;
        this.foto = foto;
        this.pagamentoDia = pagamentoDia;
        this.preco = preco;
        this.ganhos = ganhos;
        this.quantidade = quantidade;
        this.id = id;
        this.precoTxt = precoTxt;
    }
}

class Cabare{
    constructor(ganhos, pagamentoDia, quantidade, espacoOcupado, espacoTotal, espacoGanho, ganhosTxt){
        this.ganhos = ganhos;
        this.pagamentoDia = pagamentoDia;
        this.quantidade = quantidade;
        this.espacoOcupado = espacoOcupado;
        this.espacoTotal = espacoTotal;
        this.espacoGanho = espacoGanho;
        this.ganhosTxt = ganhosTxt;
    }
}

//objetos criados tempo jogador roubos armas coletes
let tempoJogo =  new Relogio(0,0,0,1, 300, true);

let jogador1 = new Jogador1('Alexey', 2, 100, 5, 5000, 3, '', '', 0, '', 0, 0, 0);

let loja199 = new Roubos('Loja de 1.99', 5, 2, '$5 - $11', 5, 11, 1, 1, 1);
let velinhaRua = new Roubos('Velhinha na rua', 10, 8, '$12 - $26', 12, 26, 1, 3, 1);
let radioCarro = new Roubos('Rádio de carro', 10, 16, '$27 - $89', 27, 89, 2, 4, 2);
let taxi = new Roubos('Taxi', 10, 40, '$90 - $265', 90, 265, 3, 6, 3);
let roubarCasa = new Roubos('Roubar uma casa', 10, 80, '$266 - $761', 266, 761, 4, 8, 3);
let roubarPosto = new Roubos('Posto de Gasolina', 10, 160, '$762 - $1.983', 762, 1983, 5, 10, 6);
let tabacaria = new Roubos('Tabacaria', 10, 400, '$1.984 - $4.407', 1984, 4407, 6, 11, 7);
let mercadinho = new Roubos('Mercadinho', 15, 700, '$4.408 - $8.753', 4408, 8753, 7, 13, 8);
let superMercado = new Roubos('Supermercado', 15, 1200, '$8.754 - $14.850', 8754, 14850, 8, 14, 9);
let caixaEletronico = new Roubos('Caixa-Eletrônico', 15, 2100, '$14.851 - $28.587', 14851, 28587, 9, 16, 10);
let casaLoterica = new Roubos('Casa Lotérica', 20, 4100, '$28.588 - $51.268', 28588, 51268, 10, 18, 11);
let brb = new Roubos('BRB', 20, 7700, '$51.269 - $98.880', 51269, 98880, 11, 20, 12);
let bombaBurguer = new Roubos('Bomba Burguer', 20, 12200, '$98.881 - $167.589', 98881, 167589, 12, 24, 14);
let escolhaRoubos = {nome: '- [Escolha...]',powerNecessario: ''};
let roubosGrupo = [
    escolhaRoubos, loja199, velinhaRua, radioCarro, taxi, roubarCasa, roubarPosto, tabacaria, mercadinho,
    superMercado, caixaEletronico, casaLoterica, brb, bombaBurguer
];

let bastaoBaseball = new Armas('Bastão Baseball', 10, 1240, 0.02, 0, '$1.240');
let faca = new Armas('Faca', 20, 6700, 0.03, 1, '$6.700');
let machado = new Armas('Machadinha', 35, 13250, 0.03, 2, '$13.250');
let serraEletrica = new Armas('Serra-Eletrica', 150, 74800, 0.04, 3, '$74.800');
let revolver22 = new Armas('Taurus 96 .22', 180, 110500, 0.05, 4, '$110.500');
let revolver38 = new Armas('Taurus 889 .38', 280, 205500, 0.05, 5, '$205.500');
let revolver357 = new Armas('Magnum .357', 410, 389000, 0.05, 6, '$389.000');
let glock39 = new Armas('Glock 39 .45',740, 675000, 0.06, 7, '$675.000');
let bereta92x = new Armas('Bereta 92X .9mm', 1140, 925000, 0.06, 8, '$925.000');
let fnp90 = new Armas('FN P90', 1800, 1420000, 0.075, 9, '$1.420.000');
let uzi = new Armas('Uzi', 2700, 2250000, 0.075, 10, '$2.250.000');
let mp5 = new Armas('MP5', 4150, 3890000, 0.075, 11, '$3.890.000');
let ak47 = new Armas('AK-47', 7200, 5200000, 0.08, 12, '$5.200.000');
let ar15 = new Armas('AR-15', 11500, 8750000, 0.08, 13, '$8.750.000');
let m16 = new Armas('M16', 17450, 12980000, 0.08, 14, '$12.980.000');
let mercadoArmas = [bastaoBaseball, faca ,machado, serraEletrica, revolver22, revolver38, 
revolver357, glock39, bereta92x, fnp90, uzi, mp5, ak47, ar15, m16];
let mochilaArmas = [];

let fraldinha = new Coletes('Fraudinha', 0.01, 1000, 0, 0, '$1.000');
let terno = new Coletes('Terno', 0.02, 4800, 0, 1, '$4.800');
let jaquetaCouro = new Coletes('Jaqueta de Couro', 0.03, 12300, 0, 2, '$12.300');
let kevlarNv1 = new Coletes('Colete Kevlar Nv. I', 0.04, 28600, 0, 3, '$28.600');
let kevlarNv2 = new Coletes('Colete Kevlar Nv. II', 0.05, 51900, 0, 4, '$51.900');
let kevlarNv3 = new Coletes('Colete Kevlar Nv. III', 0.06, 150000, 0, 5, '$150.000');
let nanoNv1 = new Coletes('Colete Nano Fibra Nv. I', 0.075, 278000, 0, 6, '$278.000');
let nanoNv2 = new Coletes('Colete Nano Fibra Nv. II', 0.08, 620000, 0, 7, '$620.000');
let nanoNv3 = new Coletes('Colete Nano Fibra Nv. III', 0.09, 940000, 0, 8, '$940.000');
let mark1 = new Coletes('Mark I', 0.10, 2100000, 0, 9, '$2.100.000');
let markL = new Coletes('Mark L', 0.20, 10000000, 0,  10, '$10.000.000');
let mercadoColetes = [fraldinha, terno, jaquetaCouro, kevlarNv1, kevlarNv2, kevlarNv3,
nanoNv1, nanoNv2, nanoNv3, mark1, markL];
let mochilaColete = [];

let haxixe = new DrogasRave('Haxixe', 100, 1200);
let maconha = new DrogasRave('Maconha', 20, 200);
let pinga51 = new DrogasRave('Caninha 51', 5, 54);
let festaRaveDrogas = [pinga51, maconha, haxixe];

let putaFeia = new Putas('Feia da Esquina', '0.jpg', 15, 150, 0, 0, 0, '$150');
let putaPobre = new Putas('Puta Pobre', '1.jpg', 45, 450, 0, 0, 1, '$450');
let putaConic = new Putas('Puta do Conic', '2.jpg', 100, 1000, 0, 0, 2, '$1.000');
let puta315Norte = new Putas('Puta da 315N', '3.jpg', 190, 2700, 0, 0, 3, '$2.700');
let putasGrupo = [ putaFeia, putaPobre, putaConic, puta315Norte];
let meuCabare = [];

let cabareG1 = new Cabare(0, 0, 0, 0, 20, 100,'' );



//listiners botao roubos, seleção do roubo e movimentaçao do banco
$selectRoubos.addEventListener('change', ()=>{
    mostraSelect($selectRoubos.value);
})

$btnRoubar.addEventListener('click', ()=>{
    efetuaRoubo($selectRoubos.value);
})

$btnTransferir.addEventListener('click',()=>{
    let valorDigitado = $inputBanco.value 
    valorDigitado = parseInt(valorDigitado)
    switch($selectBanco.value){
        case '1':
            if(jogador1.grana < valorDigitado){
                console.log('saldo insuficiente')
            }else{
                jogador1.saldoConta += valorDigitado;
                $valorSaldo.innerHTML = `$${jogador1.saldoContaTxt}`;
                jogador1.grana -= valorDigitado
                gravarLS('grana', jogador1.grana)
                gravarLS('saldo', jogador1.saldoConta)
                mostraInfoJogador()
                $inputBanco.value = '';
            }
            break
        case '2':
            if(jogador1.saldoConta < valorDigitado){
                console.log('saldo em conta insuficiente')
            }else{
                jogador1.saldoConta -= valorDigitado;
                jogador1.grana += valorDigitado
                // saldoTxt = jogador1.saldoConta.toLocaleString('pt-BR')
                $valorSaldo.innerHTML = `$${jogador1.saldoContaTxt}`;
                gravarLS('grana', jogador1.grana)
                gravarLS('saldo', jogador1.saldoConta)
                mostraInfoJogador()
                $inputBanco.value = '';
            }
            break
    }
    
})

//inicia o tempo do jogo minunos horas e dias
function iniciarCronometro(){
    
    intervaloTempo = setInterval(function(){

        tempoJogo.segundos++;
        
        if(tempoJogo.segundos < 10){
            tempoJogo.segundos = '0'+tempoJogo.segundos;
        }
        if(tempoJogo.segundos < 60  && tempoJogo.minutos === 0){
            tempoJogo.minutos=0;
            tempoJogo.minutos = '0'+tempoJogo.minutos;
        }
        
        if(tempoJogo.segundos === 60){
            tempoJogo.minutos++;
            tempoJogo.segundos = '0'+0;
            if(tempoJogo.minutos < 10){
                tempoJogo.minutos = '0'+tempoJogo.minutos;
            }
        }

        if(tempoJogo.minutos === 60){
            tempoJogo.minutos = 0;
            tempoJogo.horas++;
            if(tempoJogo.horas < 10){
                tempoJogo.horas = '0'+tempoJogo.horas;
            }
        }

        if(tempoJogo.horas == 24){
            tempoJogo.horas = 0;
            tempoJogo.dias++
        }

        //Ganho de estamina por tempo
       if(tempoJogo.minutos % 5 == 0 && tempoJogo.segundos == 0 && jogador1.estamina < 100){
            jogador1.estamina++;
            gravarLS('estaminaJ', jogador1.estamina);
            mostraInfoJogador();
        }

        //Tempo referente ao rendimento no banco
        if(tempoJogo.horas % 1 == 0 && tempoJogo.minutos == 0 && tempoJogo.segundos == 0){
            jogador1.saldoConta += jogador1.rendimento;
            jogador1.saldoConta = parseInt(jogador1.saldoConta);
            console.log(`saldo: ${jogador1.saldoConta}`)
            gravarLS('saldo', jogador1.saldoConta);
            mostraInfoJogador(); 
        }

        //Ganhos diários do cabaré
        if(tempoJogo.horas % 6 == 0 && tempoJogo.minutos == 0 && tempoJogo.segundos == 0){
            if(cabareG1.pagamentoDia == null){
                return
            }else{
                cabareG1.ganhos = parseInt(cabareG1.ganhos)
                cabareG1.ganhos += (cabareG1.pagamentoDia);
                localStorage.setItem('meuCabare', JSON.stringify(cabareG1))
                mostraMeuCabare()
            } 
        }
        
        gravarLS('min', tempoJogo.minutos);
        gravarLS('horas', tempoJogo.horas);
        gravarLS('dias', tempoJogo.dias);
        
        $horas.innerHTML = `<i class="far fa-clock"></i> ${tempoJogo.horas} : ${tempoJogo.minutos}`;
        $dias.innerHTML = `<i class="far fa-calendar-alt"></i> Dia: ${tempoJogo.dias}` ;
    },100)  
}

//gera dois numeros aleatóris
function geraNAleatorio(max, min){
    let n1 = Math.floor(Math.random() * (max - min + 1) + min);
    return n1;
}

//cria as tabelas
function criaTabela($tag, coluna1, coluna2, coluna3, coluna4){
    let linha = $tag.insertRow();
    linha.insertCell(0).innerHTML = coluna1;
    linha.insertCell(1).innerHTML = coluna2;
    linha.insertCell(2).innerHTML = coluna3;
    linha.insertCell(3).innerHTML = coluna4;
}

//Gravar e recuperar dados no Local Storage
function gravarLS(key,valor){
    localStorage.setItem(key, valor)
}
function recuperaLS(key,valor){
    let valorBD = localStorage.getItem(key)
    if(valorBD == null){
        valor = valor
    }else{
        valor = valorBD
    }
    valor = parseFloat(valor);

    return valor;
}

//mostra o modal que apresenta o resultado dos roubos
let attTxt = 0;
function apaceModal(i){
    
    $modalRoubos.innerHTML = '';
    criaElementos('p', 'Yah! Mais fácil do que roubar bananas de um macaco!', $modalRoubos);
    let ul = criaElementos('ul',null,$modalRoubos);
    criaLi(`Você conseguiu $${roubosGrupo[i].valorTotal.toLocaleString('pt-BR')}`,ul);
    criaLi(`Sua inteligencia aumentou ${attTxt}`,ul);
    criaLi(`Sua força aumentou ${attTxt}`,ul);
    criaLi(`Seu carisma aumentou ${attTxt}`,ul);
    criaLi(`Sua resistencia aumentou ${attTxt}`,ul);
    
    $modalRoubos.className = 'modal-roubos-habilitado';
}

//cria os selects dos roubos
function criaSelectRoubos(){
    let i = 0
    $selectRoubos.innerHTML= '';
    roubosGrupo.forEach(function(rg){
        
        let option1 = document.createElement('option')
        option1.value = i;
        option1.text = `${rg.nome} - ${rg.powerNecessario}`;
        $selectRoubos.append(option1);
        i++;
    })
}

//faz os roubos 
let id = 0;
function efetuaRoubo(i){
    if(jogador1.powerRS >= roubosGrupo[i].powerNecessario){
        roubosGrupo[i].recompensa = geraNAleatorio(roubosGrupo[i].rMax, roubosGrupo[i].rMin);

        if(jogador1.estamina >= roubosGrupo[i].estaminaR){
            jogador1.estamina -= roubosGrupo[i].estaminaR;
            gravarLS('estaminaJ', jogador1.estamina)
        }else{
            $modalRoubos.innerHTML = `<p><i class="fas fa-syringe"></i> Falta estamina!</p>` 
            return
        }
        
        if(jogador1.estamina < 0){
            jogador1.estamina = 0;
        }
        
        if(jogador1.respeito >= cabareG1.espacoGanho){
            cabareG1.espacoTotal += 5;
            cabareG1.espacoGanho += (cabareG1.espacoGanho);
            mostraMeuCabare()
        }

        //missao
        jogador1.nRoubos++;
        gravarLS('RoubosRealizados', jogador1.nRoubos)
        if(arrMissoes[id] === undefined){
            jogador1.grana += roubosGrupo[i].valorTotal;
        }else{
            jogador1.grana += roubosGrupo[i].valorTotal;
            arrMissoes[id].criaMissao();
            mostraObjetivos(id);
            gravarLS('idMissao', id); 
        }
        gravarLS('bonusRecompensa', jogador1.bonusReconpensa);
        console.log(roubosGrupo[i].recompensa,jogador1.bonusReconpensa, roubosGrupo[i].valorTotal)
        gravarLS('grana', jogador1.grana);
        attTxt = roubosGrupo[i].atributosTotal;
        jogador1.atributosJ += attTxt;
        gravarLS('atributos', jogador1.atributosJ);

        jogador1.powerRS = calculaPR();
        gravarLS('powerRS', jogador1.powerRS);

        calculaRespeito($selectRoubos.value);
        gravarLS('respeito', jogador1.respeito);

        apaceModal($selectRoubos.value);
        mostraInfoJogador();
    }else{
        tempoJogo.penalidade = 30;
        $modalRoubos.className = 'modal-roubos-habilitado';
        $btnRoubar.disabled = true;
        penalidade = setInterval(()=>{
            tempoJogo.penalidade--
            if(tempoJogo.penalidade != 0){
                $modalRoubos.innerHTML = '';
                criaElementos('i',null,$modalRoubos,'fas fa-thumbs-down')
                criaElementos('p', 'Você foi preso otário!',$modalRoubos);
                criaElementos('div', `Tempo na Prisão: ${tempoJogo.penalidade}s`,$modalRoubos);
            }else{
                $btnRoubar.disabled = false;
                $modalRoubos.innerHTML = '';
                clearInterval(penalidade)
                criaElementos('i',null,$modalRoubos,'fas fa-bomb')
                criaElementos('p', 'Você está solto.',$modalRoubos);
            }
        },1000)
    }  
}

//calcula o poder de roubos
function calculaPR(){
    let bonusRS = 0;
    if(jogador1.arma.forca == undefined){
        bonusRS = 0;
    }else{
        jogador1.powerRS = parseInt(jogador1.powerRS);
        bonusRS = jogador1.arma.forca + (jogador1.powerRS * (jogador1.arma.pBonus));
    }

    let bonusColete = 0;
    if(jogador1.colete.resBonus == undefined){
        bonusColete = 0;
    }else{
        jogador1.colete.resBonus = parseInt(jogador1.colete.resBonus)
        bonusColete = jogador1.colete.resBonus;
    }

    let pr = ((jogador1.atributosJ*4)/4)*(70/100) + bonusRS + bonusColete;
    pr = pr + (.5/100);
    pr = pr.toFixed(0);
    return pr 
}

//faz o calculo do respeito
function calculaRespeito(i){
    let rr = roubosGrupo[i].respeitoR;
    rr = parseInt(rr);
    jogador1.respeito += rr;
}

//efetua a compra , a venda e equipa a arma
function compraArma(i){

    if(mochilaArmas.length == 0){
        if(jogador1.grana < mercadoArmas[i].preco){
            console.log('Falta din!!!')
        }else{
            mochilaArmas.push(mercadoArmas[i])
                
            jogador1.grana -= mercadoArmas[i].preco 
        }
    }else{
        for(let j in mochilaArmas){
            if(i == mochilaArmas[j].id){
                console.log('Já tem esta arma!')
                return
            }
        }
        if(jogador1.grana < mercadoArmas[i].preco){
            console.log('Falta din!!!')
        }else{
            jogador1.nArmas++;
            mochilaArmas.push(mercadoArmas[i])
            //localStorage.setItem(`arma${i}`, JSON.stringify(mercadoArmas[i]))
            jogador1.grana -= mercadoArmas[i].preco 
        }
    }
    gravarLS('grana', jogador1.grana);   
    mostraInfoJogador()
}
function vendeArma(i){
    //localStorage.removeItem(`arma${i}`)
    console.log(`arma${i}`)
    jogador1.nArmas--;
    jogador1.grana += (mochilaArmas[i].preco / 2)
    gravarLS('grana', jogador1.grana);
    mochilaArmas.splice(i,1)
    mostraInfoJogador()
}
function equipaArma(i){
    jogador1.arma = mochilaArmas[i]
    $equipamentos[0].innerHTML = jogador1.arma.nome
        
    localStorage.setItem('armaAtual', JSON.stringify(jogador1.arma))

    mostraInfoJogador()
}

//efetua a compra, a venda e equipa coletes
function comprarColete(i){
    if(mochilaColete.length == 0){
        if(jogador1.grana < mercadoColetes[i].preco){
            console.log('Falta din!!!')
        }else{
            mochilaColete.push(mercadoColetes[i])
                
            jogador1.grana -= mercadoColetes[i].preco 
        }
    }else{
        for(let j in mochilaColete){
            if(i == mochilaColete[j].id){
                console.log('Já tem este colete!')
                return
            }
        }
        if(jogador1.grana < mercadoColetes[i].preco){
            console.log('Falta din!!!')
        }else{
            mochilaColete.push(mercadoColetes[i])
                
            jogador1.grana -= mercadoColetes[i].preco 
        }
    }
    console.log(mochilaColete)
    gravarLS('grana', jogador1.grana);   
    mostraInfoJogador()
}
function vendeColete(i){
    jogador1.grana += (mochilaColete[i].preco / 2)
    gravarLS('grana', jogador1.grana);
    mochilaColete.splice(i,1)
    mostraInfoJogador()
}
function equipaColete(i){
    jogador1.colete = mochilaColete[i]
    $equipamentos[1].innerHTML = jogador1.colete.nome
        
    localStorage.setItem('coleteAtual', JSON.stringify(jogador1.colete))
    
    mochilaColete[i].resBonus = parseInt(mochilaColete[i].resBonus)
    console.log(mochilaColete[i].resBonus,jogador1.atributosJ)

    gravarLS('atributos', jogador1.atributosJ);
    mostraInfoJogador()
}

//recupera a arma e colete atual do local storage
function armaAtual(){
    let armaAtual = JSON.parse(localStorage.getItem('armaAtual'));
    
    if(armaAtual == null){
        jogador1.arma = '';
    }else{
       jogador1.arma = armaAtual;

        $equipamentos[0].innerHTML = jogador1.arma.nome;

        mochilaArmas.push(jogador1.arma); 
    } 
}
function coleteAtual(){
    let coleteAtual = JSON.parse(localStorage.getItem('coleteAtual'));

    if(coleteAtual == null){
        jogador1.colete = '';
    }else{
        jogador1.colete = coleteAtual;
        $equipamentos[1].innerHTML = jogador1.colete.nome;
        mochilaColete.push(jogador1.colete);
    }
}

//função da festa rave
function festaRave(e, p){
    if(jogador1.estamina == 100){
        jogador1.estamina = 100;
    }else{
        jogador1.estamina += e;
        if(jogador1.estamina >= 100){
            jogador1.estamina = 100;
        }
        jogador1.grana -= p;
        p +=  p*(p/(p/0.50))
        console.log(p)
        p = parseInt(p.toFixed(0))
        //gravarLS()
        console.log(p)
    }
    gravarLS('grana',jogador1.grana);
    gravarLS('estaminaJ', jogador1.estamina);
    mostraInfoJogador();
}

//mostra o select dos roubos na tela
function mostraSelect(i){
    $tabelaRoubos.innerHTML = '';

    criaTabela($tabelaRoubos, `Estamina requerida:`, `${roubosGrupo[i].estaminaR}%`,null,null);
    criaTabela($tabelaRoubos, `Power de roubo:`, roubosGrupo[i].powerNecessario,null,null);
    criaTabela($tabelaRoubos, `Recompensa:`, roubosGrupo[i].recompensaTxt,null,null);
    
    $tabelaRoubos.classList.add('visivel');
}

//mostra a as informaçoes das putas do select na tabebela
function meuCabareAtual(){
    let cabareAtual = JSON.parse(localStorage.getItem('meuCabare'));
    
    if(cabareAtual == null){
        cabareG1 = cabareG1;
    }else{
        cabareG1 = cabareAtual;
        cabareG1.ganhos = parseInt(cabareG1.ganhos)
        cabareG1.quantidade = parseInt(cabareG1.quantidade)
    }
    
}

function mostraSelectPutas(){
    $tabelaPutas.innerHTML ='';
    let i = 0
    putasGrupo.forEach((pg)=>{
        criaTabela($tabelaPutas, 
            `<div>${pg.nome}</div><img src="img/${pg.foto}" alt="${pg.nome}">`, 
            `$${pg.pagamentoDia}`, `$${pg.precoTxt}`, 
            `<input type="number" class="input-putas"><button onclick="contrataPuta(${i})">Contratar</button>`);
        i++
    })
    
}
mostraSelectPutas();
function mostraMeuCabare(){
    $tabelaMeuCabare.innerHTML = ''
   
    let linha = $tabelaMeuCabare.insertRow();

    linha.insertCell(0).innerHTML = 'Cabare G1';
    linha.insertCell(1).innerHTML = `$${cabareG1.pagamentoDia /** cabareG1.quantidade*/}`;
    linha.insertCell(2).innerHTML = `$${cabareG1.ganhosTxt}`;
    linha.insertCell(3).innerHTML = cabareG1.quantidade;
    linha.insertCell(4).innerHTML = `<input type="number" id="input-putas2"><button class="btn-cabare" onclick="demitePuta()">Demitir</button>`
    $infoCabare.innerHTML = `Ganhos não coletados: <span>$${cabareG1.ganhosTxt}</span> - Espaço: <span>${cabareG1.espacoOcupado}/${cabareG1.espacoTotal}</span>`
    
}
function pegaGranaCabare(){
    jogador1.grana += cabareG1.ganhos
    cabareG1.ganhos = 0;
    gravarLS('grana', jogador1.grana);
    mostraInfoJogador()
}

//let $inputDemitePuta = document.getElementById('input-putas2');
function demitePuta(){
    let $inputDemitePuta = document.getElementById('input-putas2');
    let valorDigitado2 = parseInt($inputDemitePuta.value);

    if(cabareG1.quantidade > 0 && valorDigitado2 <= cabareG1.quantidade && valorDigitado2 != ''){
        cabareG1.pagamentoDia -= ((cabareG1.pagamentoDia/cabareG1.quantidade) * valorDigitado2);
        cabareG1.pagamentoDia = cabareG1.pagamentoDia.toFixed(0)
        cabareG1.quantidade -= valorDigitado2;
        cabareG1.espacoOcupado -= valorDigitado2;
        cabareG1.pagamentoDia = parseInt(cabareG1.pagamentoDia);
        console.log(cabareG1.quantidade, cabareG1.pagamentoDia)
        localStorage.setItem('meuCabare', JSON.stringify(cabareG1))
    }else{
        console.log('esta zerado')
    }
    
    mostraInfoJogador();
    console.log($inputDemitePuta, valorDigitado2, cabareG1.quantidade)
    
}

//let $inputContrataPuta = document.querySelectorAll('.input-putas');
function contrataPuta(i){
    let $inputContrataPuta = document.querySelectorAll('.input-putas');

    let valorDigitado = parseInt($inputContrataPuta[i].value);

    if(jogador1.grana < (putasGrupo[i].preco*valorDigitado)){
        console.log('falta din')
    }else{
        if(cabareG1.quantidade <= cabareG1.espacoTotal && (valorDigitado+cabareG1.quantidade) <= (cabareG1.espacoTotal) && valorDigitado != ''){
            jogador1.grana -= (putasGrupo[i].preco * valorDigitado);
            cabareG1.pagamentoDia += (putasGrupo[i].pagamentoDia * valorDigitado);
            cabareG1.quantidade += valorDigitado;
            cabareG1.espacoOcupado += valorDigitado;
            
            putasGrupo[i].preco +=  (putasGrupo[i].preco * 0.10) * valorDigitado;
            putasGrupo[i].preco = parseInt(putasGrupo[i].preco.toFixed(0)) ;
            
            console.log(putasGrupo[i].preco, valorDigitado)
            gravarLS(`puta${i}`,putasGrupo[i].preco)

            localStorage.setItem('meuCabare', JSON.stringify(cabareG1))
            gravarLS('grana',jogador1.grana);

            mostraInfoJogador();
            mostraSelectPutas();
        }else{
            console.log(putasGrupo[i].preco, valorDigitado)
            console.log('cabaré cheio')
        }
    }
    mostraInfoJogador();
}

//missões do jogo
class Missoes{
    constructor(respeitoN, granaN, armaN, roubosN, recompensaM, putaGanha,putaNome, bonusM){
        this.respeitoN = respeitoN;
        this.granaN = granaN;
        this.armaN = armaN;
        this.roubosN = roubosN;
        this.recompensaM = recompensaM;
        this.putaGanha = putaGanha;
        this.putaNome = putaNome;
        this.bonusM = bonusM;
    }

    get novaMissao(){
         this.criaMissao()
    }

    criaMissao(){
        if(jogador1.respeito >= this.respeitoN && jogador1.grana >= this.granaN && jogador1.arma.nome === this.armaN && jogador1.nRoubos >= this.roubosN){
            jogador1.grana += this.recompensaM;
            cabareG1.pagamentoDia += this.putaGanha;
            cabareG1.espacoOcupado += 1;
            cabareG1.quantidade += 1;
            jogador1.bonusReconpensa += this.bonusM;
            jogador1.bonusReconpensa = parseFloat(jogador1.bonusReconpensa.toFixed(2))
            cabareG1.espacoTotal += 5;
            mostraModalMissoes(id);
            $modalMissoes.classList.add('modal-missoes-aberto')
            id++;
            localStorage.setItem('meuCabare', JSON.stringify(cabareG1))
            console.log(jogador1.bonusReconpensa)
        }
    }
}

let missao01 = new Missoes(200,50000,'Faca', 50, 10000, putaFeia.pagamentoDia, putaFeia.nome, 0.01);
let missao02 = new Missoes(800,350000, 'Serra-Eletrica', 150, 150000, putaFeia.pagamentoDia, putaFeia.nome, 0.01);
let missao03 = new Missoes(2000,1500000, 'Taurus 889 .38', 300, 400000, putaPobre.pagamentoDia, putaPobre.nome, 0.01);
let missao04 = new Missoes(4000,3000000,'Bereta 92X .9mm', 450, 800000, putaConic.pagamentoDia, putaConic.nome, 0.01);
let missao05 = new Missoes(8000,10000000,'Uzi', 1000, 3000000, puta315Norte.pagamentoDia, puta315Norte.nome, 0.01);
let arrMissoes = [missao01, missao02, missao03, missao04, missao05];
//console.log(missao01,missao01.criaMissao)

let criaElementosObjetivos = (txt1, txt2)=>{
    let div1 = document.createElement('div');
    div1.className = 'missoes-lista';
    $objetivos.appendChild(div1)

    let p1 = document.createElement('p');
    p1.textContent = txt1;
    div1.appendChild(p1);

    let p2 = document.createElement('p');
    p2.className = 'p2-obj';
    p2.textContent = txt2;
    div1.appendChild(p2);
}
let criaLi = (txt, ul)=>{
    let li1 = document.createElement('li');
    li1.textContent = txt;
    ul.appendChild(li1);
}
let mostraObjetivos = (i)=>{
    if(arrMissoes[i] === undefined){
        console.log('Não existe')
        return
    }else{
        $objetivos.innerHTML = '';
        criaElementos('h4', 'Objetivos:', $objetivos);

        criaElementosObjetivos(`Alcance ${arrMissoes[i].respeitoN} de respeito`, `${jogador1.respeito} / ${arrMissoes[i].respeitoN}`);
        criaElementosObjetivos(`Junte $${arrMissoes[i].granaN.toLocaleString('pt-BR')} de grana`,`${jogador1.grana.toLocaleString('pt-BR')} / ${arrMissoes[i].granaN.toLocaleString('pt-BR')}`)
        criaElementosObjetivos(`Compre um(a) ${arrMissoes[i].armaN}.`,`${jogador1.arma.nome} / ${arrMissoes[i].armaN}`)
        criaElementosObjetivos(`Faça ${arrMissoes[i].roubosN} roubos.`,`${jogador1.nRoubos} / ${arrMissoes[i].roubosN}`)
        
        criaElementos('h4', 'Recompensas:',$objetivos);

        let ul = criaElementos('ul', null, $objetivos);
        criaLi(`+$${arrMissoes[i].recompensaM.toLocaleString('pt-BR')} de grana`,ul);
        criaLi(`+1 ${arrMissoes[i].putaNome}`,ul);
        criaLi(`+${arrMissoes[i].bonusM*100}% bônus de recompensa nos roubos`,ul);
        criaLi(`+5 de espaço no cabaré`,ul);
        
        /*console.log(`100 de respeito: ${jogador1.respeito} / ${arrMissoes[i].respeitoN}`)
        console.log(`350.000 de respeito: ${jogador1.grana} / ${arrMissoes[i].granaN}`)
        console.log(`Compre uma Serra-Eletrica: ${jogador1.arma.nome} / ${arrMissoes[i].armaN}`)
        console.log(`Realize 10 Roubos: ${jogador1.nRoubos} / ${arrMissoes[i].roubosN}`)*/
    }
    
    
}

let criaElementos = (tag,txt,$dom,classe)=>{
    let elemento = document.createElement(tag);
    elemento.textContent = txt;
    elemento.className = classe;
    $dom.appendChild(elemento);
    return elemento
}
let mostraModalMissoes = (i)=>{
    $modalMissoes.innerHTML = '';

    criaElementos('h1', `Missão ${i+1} Completa`,$modalMissoes)
    criaElementos('h4', 'Recompensas:',$modalMissoes)
    let ul = criaElementos('ul',null,$modalMissoes)
    criaLi(`+$${arrMissoes[i].recompensaM.toLocaleString('pt-BR')} de grana`,ul);
    criaLi(`+1 ${arrMissoes[i].putaNome}`,ul);
    criaLi(`+${arrMissoes[i].bonusM*100}% bônus de recompensa nos roubos`,ul);
    criaLi(`+5 de espaço no cabaré`,ul);
    let btn = criaElementos('button','Fechar', $modalMissoes,'btn-modal')
    btn.onclick = function(){
        $modalMissoes.classList.remove('modal-missoes-aberto');
    }
}
mostraModalMissoes(id)

//mostra a tabela de armas do mercado
function mostraMercadoArmas(){
    let j = 0
    //let btn = criaElementos('button', 'Comprar',$tabelaMercado)
    $tabelaMercado.innerHTML = '';
    mercadoArmas.forEach((ma)=>{
        let b = ma.bonusArma//ma.forca + (jogador1.powerRS * (ma.pBonus));
        b = b.toFixed(0);

        criaTabela($tabelaMercado, ma.nome,
            `${ma.forca}+${jogador1.powerRS}*${ma.pBonus*100}% = ${b} Bônus`,
            ma.precoTxt,
            `<button onclick="compraArma(${j})">Compar</button>`);
        j++;
    })
}

function mostraMochilaArmas(){
    $tabelaArmasCompradas.innerHTML ='';
    for(let i in mochilaArmas){
        
        let bonus = mochilaArmas[i].forca + (jogador1.powerRS * (mochilaArmas[i].pBonus/100));
        bonus = bonus.toFixed(0);
        let valorVenda = (mochilaArmas[i].preco / 2).toLocaleString('pt-BR');

        criaTabela($tabelaArmasCompradas, mochilaArmas[i].nome,
            `${mochilaArmas[i].forca}+${jogador1.powerRS}*${mochilaArmas[i].pBonus*100}% = ${bonus} Bônus`,
            `$${valorVenda}`,
            `<button onclick="equipaArma(${i})">Equipar</button><button onclick="vendeArma(${i})">Vender</button>`);
        
    }
}

//mostra a tebela do mercado de coletes
function mostraMercadoColetes(){
    let i = 0
    $tabelaMercadoColetes.innerHTML = '';
    mercadoColetes.forEach((mc)=>{
        let bonusResistencia = jogador1.atributosJ * mc.resistencia;
        bonusResistencia= bonusResistencia.toFixed(0)

        criaTabela($tabelaMercadoColetes, mc.nome, `${jogador1.atributosJ}*${mc.resistencia*100}% = ${bonusResistencia} Bônus`, mc.precoTxt, `<button onclick="comprarColete(${i})">Compar</button>`);
        i++
    })
}



function mostraMochilaColetes(){
    $tabelaMochilaColete.innerHTML ='';
    for(let i in mochilaColete){
        
        mochilaColete[i].resBonus = jogador1.atributosJ * mochilaColete[i].resistencia;
        mochilaColete[i].resBonus= mochilaColete[i].resBonus.toFixed(0)
        let valorVenda = (mochilaColete[i].preco / 2).toLocaleString('pt-BR');

        criaTabela($tabelaMochilaColete, 
            `${mochilaColete[i].nome}`, 
            `${jogador1.atributosJ}*${mochilaColete[i].resistencia} = ${mochilaColete[i].resBonus} Bônus`,
            `$${valorVenda}`, 
            `<button onclick="equipaColete(${i})">Equipar</button><button onclick="vendeColete(${i})">Vender</button>`);
    }
}

//mostra as drogas da festa rave
function mostraDrogas(){
    $tabelaDrogas.innerHTML = '';
    festaRaveDrogas.forEach((frd)=>{
        criaTabela($tabelaDrogas, frd.nome, `${frd.estaminaRecuperada}%`, `$${frd.preco}`,
        `<button onclick="festaRave(${frd.estaminaRecuperada}, ${frd.preco})">Compar</button>`);
    })
}

function mochilaStorage(){
    for(let n = 0; n < mercadoArmas.length;n++){
        let arma = JSON.parse(localStorage.getItem(`arma${n}`));
         console.log(arma)
        if(arma === null){
          continue
        }else{
             if(arma){
                 mochilaArmas.push(arma)
                 console.log('deu certo')
             }else{
                 console.log('não achou nada',n,`arma${n}`)
             }
        } 
     }
}

//mostra e atualiza as informações do jogador na tela
criaSelectRoubos();
function mostraInfoJogador(){
    jogador1.respeito = recuperaLS('respeito', jogador1.respeito);
    jogador1.bonusReconpensa = recuperaLS('bonusRecompensa', jogador1.bonusReconpensa);
    jogador1.atributosJ = recuperaLS('atributos', jogador1.atributosJ);
    jogador1.grana = recuperaLS('grana',jogador1.grana);
    jogador1.powerRS = recuperaLS('powerRS', jogador1.powerRS);
    jogador1.saldoConta = recuperaLS('saldo',jogador1.saldoConta);
    jogador1.estamina = recuperaLS('estaminaJ', jogador1.estamina);
    jogador1.granaTxt = jogador1.grana.toLocaleString('pt-BR');
    cabareG1.ganhosTxt = cabareG1.ganhos.toLocaleString('pt-BR');

    //console.log(jogador1.bonusReconpensa)

    mostraMercadoArmas();
    mostraDrogas();
    mostraMercadoColetes();
   
    for(let j in putasGrupo){
        putasGrupo[j].preco = recuperaLS(`puta${j}`, putasGrupo[j].preco);
        putasGrupo[j].precoTxt = putasGrupo[j].preco.toLocaleString('pt-BR');
    }

    if(tempoJogo.comeco){
        tempoJogo.minutos = recuperaLS('min', tempoJogo.minutos);
        tempoJogo.horas = recuperaLS('horas', tempoJogo.horas);
        tempoJogo.dias = recuperaLS('dias', tempoJogo.dias);
        iniciarCronometro();
        armaAtual();
        coleteAtual();
        meuCabareAtual();
        tempoJogo.comeco = false;
    }

    id = recuperaLS('idMissao', id)
    jogador1.nRoubos = recuperaLS('RoubosRealizados',jogador1.nRoubos)
    mostraObjetivos(id)

    mostraMochilaArmas();
    mostraMochilaColetes();
    mostraMeuCabare();
    mostraSelectPutas();
    
    $nome.innerHTML = jogador1.nome;
    $respeito.innerHTML = jogador1.respeito;
    $bonusRecompensa.innerHTML = `${jogador1.bonusReconpensa*100}%`;
    $estamina.innerHTML = `${jogador1.estamina}%`;
    $barraEstamina.style.width = `${jogador1.estamina}%`;
    $valorSaldo.innerHTML = `$${jogador1.saldoContaTxt}`;
    for(let i = 0; i< $atributosJ.length; i++){
        switch(i){
            case 0:
                $atributosJ[i].innerHTML = jogador1.atributosJ;
                break
            case 1:
                $atributosJ[i].innerHTML = jogador1.atributosJ;
                break
            case 2:
                $atributosJ[i].innerHTML = jogador1.atributosJ;
                break
            case 3:
                $atributosJ[i].innerHTML = jogador1.atributosJ;
                break
            case 4:
                $atributosJ[i].innerHTML = `$${jogador1.granaTxt}`;
                break
            case 5:
                $atributosJ[i].innerHTML = jogador1.powerRS;
                break
        }
    }
}

