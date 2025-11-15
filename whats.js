// =========================================================
//            MAPA DE DDD E CIDADES (BRASIL)
// =========================================================
const DDD_TO_CITY = {
    // DDDs 1x: São Paulo (SP)
    '11': 'São Paulo', '12': 'São José dos Campos', '13': 'Santos',
    '14': 'Bauru', '15': 'Sorocaba', '16': 'Ribeirão Preto',
    '17': 'São José do Rio Preto', '18': 'Presidente Prudente', '19': 'Campinas',

    // DDDs 2x: Rio de Janeiro (RJ) e Espírito Santo (ES)
    '21': 'Rio de Janeiro', '22': 'Campos dos Goytacazes', '24': 'Volta Redonda',
    '27': 'Vitória', '28': 'Cachoeiro de Itapemirim',

    // DDDs 3x: Minas Gerais (MG)
    '31': 'Belo Horizonte', '32': 'Juiz de Fora', '33': 'Governador Valadares',
    '34': 'Uberlândia', '35': 'Poços de Caldas', '37': 'Divinópolis',
    '38': 'Montes Claros',

    // DDDs 4x: Paraná (PR) e Santa Catarina (SC)
    '41': 'Curitiba', '42': 'Ponta Grossa', '43': 'Londrina',
    '44': 'Maringá', '45': 'Cascavel', '46': 'Francisco Beltrão',
    '47': 'Joinville', '48': 'Florianópolis', '49': 'Chapecó',

    // DDDs 5x: Rio Grande do Sul (RS)
    '51': 'Porto Alegre', '53': 'Pelotas', '54': 'Caxias do Sul', '55': 'Santa Maria',

    // DDDs 6x: Centro-Oeste (DF, GO, MT, MS) + Norte (AC, RO, TO)
    '61': 'Brasília', '62': 'Goiânia', '63': 'Palmas', '64': 'Rio Verde',
    '65': 'Cuiabá', '66': 'Rondonópolis', '67': 'Campo Grande',
    '68': 'Rio Branco', '69': 'Porto Velho',

    // DDDs 7x: Bahia (BA) e Sergipe (SE)
    '71': 'Salvador', '73': 'Itabuna', '74': 'Juazeiro', '75': 'Feira de Santana',
    '77': 'Vitória da Conquista', '79': 'Aracaju',

    // DDDs 8x: Pernambuco (PE), Ceará (CE), Alagoas (AL), Paraíba (PB), Rio Grande do Norte (RN), Piauí (PI)
    '81': 'Recife', '82': 'Maceió', '83': 'João Pessoa', '84': 'Natal',
    '85': 'Fortaleza', '86': 'Teresina', '87': 'Petrolina',
    '88': 'Juazeiro do Norte', '89': 'Picos',

    // DDDs 9x: Pará (PA), Amazonas (AM), Maranhão (MA), Amapá (AP), Roraima (RR)
    '91': 'Belém', '92': 'Manaus', '93': 'Santarém', '94': 'Marabá',
    '95': 'Boa Vista', '96': 'Macapá', '97': 'Tefé',
    '98': 'São Luís', '99': 'Imperatriz',
};

// =========================================================
//             SELETORES INICIAIS
// =========================================================
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksList = document.querySelectorAll('.nav-links a');
const downloadBtn = document.getElementById('download-app-btn');
const parceiro = document.querySelector('#parceiro');
const parceira = document.querySelector('#parceira');

const inputTelefone = document.getElementById('tel_phone');
const botaoMonitorar = document.querySelector('.btn-monitorar');
const MIN_DIGITOS_CELULAR = 11;

// Seletores Popups de 5s
const loadingPopup = document.getElementById('loading-popup');
const loadingBarFill = document.querySelector('.loading-bar-fill');
const dataPopup = document.getElementById('data-popup');
const dataPopupContent = document.querySelector('.data-popup-content');

// Seletores Popups de 30s
const relatorioLoadingPopup = document.getElementById('relatorio-loading-popup');
const relatorioLoadingBarFill = document.querySelector('.relatorio-loading-bar-fill');
const relatorioLoadingCounter = document.getElementById('relatorio-loading-counter');

// Seletores Animação de Busca Rápida
const outputFotos = document.getElementById('output-fotos');
const outputConversas = document.getElementById('output-conversas');
const outputArquivos = document.getElementById('output-arquivos');


// =========================================================
//                 1. NAVEGAÇÃO / MENU
// =========================================================
// ... (seu código de navegação) ...

if (parceira) {
    parceira.addEventListener('click', () => {
        window.location.href = './parceira.html';
    });
}

if (parceiro) {
    parceiro.addEventListener('click', () => {
        window.location.href = './parceiro.html';
    });
}

// =========================================================
//                 2. BOTÃO DE DOWNLOAD
// =========================================================
// ... (seu código de download) ...

// =========================================================
//          3. MÁSCARA E EFEITO DO TELEFONE
// =========================================================

function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, '');

    if (valor.length > MIN_DIGITOS_CELULAR) {
        valor = valor.substring(0, MIN_DIGITOS_CELULAR);
    }

    if (valor.length > 2) {
        valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    }

    if (valor.length > 10) {
        valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
    } else if (valor.length > 9) {
        valor = valor.replace(/(\d{4})(\d{4})$/, '$1-$2');
    }

    input.value = valor;

    if (valor.length === 15) {
        botaoMonitorar.classList.add('piscar');
        botaoMonitorar.disabled = false;
    } else {
        botaoMonitorar.classList.remove('piscar');
        botaoMonitorar.disabled = true;
    }
}

if (inputTelefone && botaoMonitorar) {
    inputTelefone.addEventListener('input', () => {
        formatarTelefone(inputTelefone);
    });
    botaoMonitorar.disabled = true;
}


// =========================================================
//             FUNÇÕES DE UTILIDADE
// =========================================================

function obterCidadePeloDDD(telefoneFormatado) {
    const apenasNumeros = telefoneFormatado.replace(/\D/g, '');
    const ddd = apenasNumeros.substring(0, 2);
    return DDD_TO_CITY[ddd] || 'Localização Desconhecida';
}

// =========================================================
// **4. GERAÇÃO, MASCARAMENTO E ARMAZENAMENTO (NOVO)**
// =========================================================

/**
 * Gera um número de celular brasileiro aleatório (9 dígitos, sem DDD).
 */
function gerarNumeroAleatorioNoveDigitos() {
    let numero = '9'; // Começa sempre com '9'
    for (let i = 0; i < 8; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    return numero;
}

/**
 * Gera um telefone completo aleatório e o formata com a máscara de ocultação.
 * Formato: (DD) xxxxx-xDDD (onde DDD são os 3 últimos dígitos)
 * @param {string} ddd O DDD desejado (ex: '11').
 * @returns {string} O número de telefone formatado e oculto (ex: '(11) xxxxx-x321').
 */
function gerarTelefoneOculto(ddd) {
    if (ddd.length !== 2) {
        return "(xx) xxxxx-xxxx";
    }

    // Gera o número de 9 dígitos (ex: '987654321')
    const numeroCompleto = gerarNumeroAleatorioNoveDigitos();
    
    // Captura os 3 últimos dígitos: '321'
    const ultimosDigitos = numeroCompleto.substring(6);
    
    // Constrói a máscara: 'xxxxx' para o prefixo, 'x' para o sufixo inicial
    const parteOcultaPrefixo = 'xxxxx';
    const restanteOcultoSufixo = 'x';
    
    // Ex: (11) xxxxx-x321
    const telefoneOculto = `+55 (${ddd}) ${parteOcultaPrefixo}-${restanteOcultoSufixo}${ultimosDigitos}`;
    
    return telefoneOculto;
}

/**
 * Gera 4 números de telefone ocultos e os salva no localStorage antes de redirecionar.
 * @param {string} dddBase O DDD base (ex: '11') a ser usado na geração.
 */
function salvarNumerosConversas(dddBase) {
    if (dddBase.length !== 2) return;

    const numerosParaSalvar = [];
    
    // Gera 4 números aleatórios para os H2's tel01 a tel04
    for (let i = 0; i < 4; i++) {
        const novoNumeroOculto = gerarTelefoneOculto(dddBase); 
        numerosParaSalvar.push(novoNumeroOculto);
    }

    // Salva o array como string JSON.
    localStorage.setItem('telefonesRelatorio', JSON.stringify(numerosParaSalvar));
}

/**
 * Recupera os números de telefone salvos do localStorage e preenche
 * os elementos <h2> na página de relatório (relatorio_parceira.html).
 */
function preencherNumerosNoRelatorio() {
    // 1. Recupera a string JSON salva
    const numerosJSON = localStorage.getItem('telefonesRelatorio');
    
    if (!numerosJSON) {
        console.warn("Nenhum número de telefone encontrado no localStorage. Preenchendo com 'Não Encontrado'.");
        // Preenche com um valor padrão se não encontrar
        for (let i = 1; i <= 4; i++) {
             const h2Element = document.getElementById(`tel0${i}`);
             if(h2Element) h2Element.textContent = "(XX) XXXXX-XXXX";
        }
        return;
    }
    
    // 2. Converte a string JSON de volta para um array de números
    const numeros = JSON.parse(numerosJSON); 

    // 3. Itera sobre os IDs dos elementos H2 e preenche
    for (let i = 1; i <= 4; i++) {
        const idH2 = `tel0${i}`; 
        const h2Element = document.getElementById(idH2);
        
        // Preenche se o elemento existir E se houver um número no array
        if (h2Element && numeros[i - 1]) {
            h2Element.textContent = numeros[i - 1];
        }
    }
}


// =========================================================
//      5. FUNCIONALIDADE DE MONITORAMENTO (5s)
// =========================================================

function iniciarCarregamento(telefone) {
    // ... (seu código de iniciarCarregamento) ...
    if (loadingPopup && loadingBarFill && dataPopup) {
        dataPopup.style.display = 'none';
        loadingPopup.style.display = 'flex';
        
        loadingBarFill.style.transition = 'none';
        loadingBarFill.style.width = '0%';
        loadingBarFill.offsetWidth;
        
        loadingBarFill.style.transition = 'width 5s linear';
        loadingBarFill.style.width = '100%';
        
        setTimeout(() => {
            loadingPopup.style.display = 'none';
            abrirPopupDados(telefone);
        }, 5000);
    }
}


function abrirPopupDados(telefone) {
    const numeroParaExibir = telefone || 'Número não fornecido';
    const cidadeAtual = obterCidadePeloDDD(telefone);
    
    // Removida a chamada de 'preencherNumerosConversas()' daqui,
    // pois agora os números são gerados e salvos *antes* do redirecionamento
    // na função 'iniciarCarregamentoRelatorio()'.
    
    if (dataPopup) {
        if (dataPopupContent) {
            // Conteúdo injetado (o mesmo que você forneceu)
            dataPopupContent.innerHTML = `
                <p>Aqui vai vir os dados.</p>
                <button class="btn-fechar-popup" onclick="fecharPopupDados()">Fechar</button>
                 <div class="container-perfil-whatsapp">
                     <img src="./imagem/icone-whatsapp02.png" alt="" class="img-01">
                     <div class="status-perfil">
                     <h2 class="perfil-whatsapp">Perfil Whatsapp</h2>
                     <h3 class="numero-whatsap">${numeroParaExibir}</h3>
                     <p class="status-online">
                     <span class="online-dot"></span> online a poucos minutos </p>
                     </div>
                 </div>
                 <div class="traco"></div>
                     <div class="content-local">
                          <div class="localizacao">
                          <div class="cidade_localizacao">
                          <img src="./imagem/icon-celular.png" class="img_map_celular">
                          <p id="cidade_atual" class="localizacao_atual">Conectado em:</p>
                          <h3 class="h3_cidade">${cidadeAtual}</h3>
                          </div>
                          <div class="cidade_localizacao">
                          <img src="./imagem/icone_map.png" class="img_map_celular">
                          <p id="cidade_atual" class="localizacao_atual">Status:</p>
                          <h3 class="h3_cidade">Ativo</h3>
                          </div>
                          </div>
                     </div>
                 <button id="btn-relatorio-dinamico" class="btn_relatorio">Ver Conversas</button>
             `;
            
            // Anexa o listener ao botão recém-criado
            setTimeout(() => {
                const btnRelatorioDinamico = document.getElementById('btn-relatorio-dinamico');
                
                if (btnRelatorioDinamico) {
                    btnRelatorioDinamico.addEventListener('click', () => {
                        // Chama a função de carregamento de 30s
                        iniciarCarregamentoRelatorio();
                    });
                }
            }, 10);
            
        }
        dataPopup.style.display = 'flex';
    }
}

function fecharPopupDados() {
    if (dataPopup) {
        dataPopup.style.display = 'none';
    }
}

// =========================================================
//      6. ANIMAÇÕES DE BUSCA RÁPIDA (30s)
// =========================================================
// ... (seu código de iniciarBuscaRapida) ...

function iniciarBuscaRapida() {
    const frasesArquivos = [
        "checando metadados...",
        "tentativa de conexão (1)...",
        "analisando cache do dispositivo...",
        "criptografia bypass: 85%",
        "localizando registro de chamadas...",
        "validando perfil de usuário...",
        "conectado à rede remota...",
        "buscando histórico de localização...",
        "varredura de aplicativos concluída."
    ];

    let countFotos = 0;
    let countConversas = 0;
    let fraseIndex = 0;

    const maxConversas = 503;
    const maxFotos = 58; 

    const FOTOS_LENTAS_MAX = 50;
    const TEMPO_LENTO_MS = 20000;
    const INTERVALO_MS = 50; 

    const INCREMENTO_LENTO_FOTOS = FOTOS_LENTAS_MAX / (TEMPO_LENTO_MS / INTERVALO_MS);
    
    const intervalBusca = setInterval(() => {
        // --- 1. Busca de Fotos ---
        if (countFotos < maxFotos) {
            
            if (countFotos < FOTOS_LENTAS_MAX) {
                countFotos = Math.min(FOTOS_LENTAS_MAX, countFotos + INCREMENTO_LENTO_FOTOS);
                outputFotos.textContent = `${Math.floor(countFotos)} foto${Math.floor(countFotos) !== 1 ? 's' : ''} suspeita${Math.floor(countFotos) !== 1 ? 's' : ''} encontrada${Math.floor(countFotos) !== 1 ? 's' : ''}`;
            } else if (countFotos < maxFotos) {
                countFotos = Math.min(maxFotos, countFotos + 1);
                outputFotos.textContent = `${countFotos} foto${countFotos !== 1 ? 's' : ''} suspeita${countFotos !== 1 ? 's' : ''} encontrada${countFotos !== 1 ? 's' : ''}`;
            }

        }

        // --- 2. Busca de Conversas ---
        if (countConversas < maxConversas) {
            const increment = Math.ceil(maxConversas / 600);
            countConversas = Math.min(maxConversas, countConversas + increment);
            outputConversas.textContent = `${countConversas} conversa${countConversas > 1 ? 's' : ''} suspeita${countConversas > 1 ? 's' : ''}`;
        }

        // --- 3. Busca de Arquivos (Frases) ---
        if (fraseIndex % 10 === 0) {
              outputArquivos.textContent = frasesArquivos[fraseIndex % frasesArquivos.length];
        }
        fraseIndex++;

    }, INTERVALO_MS);

    // Interrompe a busca rápida no final do carregamento de 30 segundos
    setTimeout(() => {
        clearInterval(intervalBusca);
        outputFotos.textContent = `Busca de Fotos CONCLUÍDA (${maxFotos} encontradas)`;
        outputConversas.textContent = `Busca de Conversas CONCLUÍDA (${maxConversas} encontradas)`;
        outputArquivos.textContent = `Busca de Arquivos CONCLUÍDA.`;
    }, 30000);
}


// =========================================================
//      7. NOVO CARREGAMENTO DE 30 SEGUNDOS (COM SALVAMENTO)
// =========================================================

function iniciarCarregamentoRelatorio() {
    // 1. Obter o DDD base e SALVAR os números aleatórios no localStorage
    // Este passo deve ser feito ANTES do redirecionamento.
    if (inputTelefone) {
        const numeroDigitadoFormatado = inputTelefone.value;
        const apenasNumeros = numeroDigitadoFormatado.replace(/\D/g, ''); 
        const dddBase = apenasNumeros.substring(0, 2); 
        
        if (dddBase.length === 2) {
            salvarNumerosConversas(dddBase); // Salva os números gerados
        } else {
            console.error("Não foi possível obter o DDD. Os números de relatório podem estar incompletos.");
        }
    } else {
         console.warn("Elemento inputTelefone não encontrado. Não foi possível obter o DDD para geração.");
    }
    
    // 2. Iniciar animação e contagem
    fecharPopupDados();

    if (!relatorioLoadingPopup || !relatorioLoadingBarFill || !relatorioLoadingCounter) {
        console.error("Elementos do pop-up de relatório não encontrados.");
        return;
    }

    relatorioLoadingPopup.style.display = 'flex';
    iniciarBuscaRapida();

    relatorioLoadingBarFill.style.transition = 'none';
    relatorioLoadingBarFill.style.width = '0%';
    relatorioLoadingBarFill.offsetWidth;
    
    let count = 0;
    relatorioLoadingCounter.textContent = `Carregando: ${count}s`;

    const intervalId = setInterval(() => {
        count++;
        relatorioLoadingCounter.textContent = `Carregando: ${count}s`;

        const progress = (count / 30) * 100;
        
        relatorioLoadingBarFill.style.transition = 'width 1s linear';
        relatorioLoadingBarFill.style.width = `${progress}%`;

        if (count >= 30) {
            clearInterval(intervalId); 
            
            // 3. Redirecionar para a página que irá ler os dados
            setTimeout(() => {
                relatorioLoadingPopup.style.display = 'none';
                window.location.href = 'relatorio_parceira.html'; // Redireciona
            }, 500);
        }
    }, 1000); 
}

// =========================================================
//            8. LISTENERS INICIAIS E CHECAGEM DE PÁGINA
// =========================================================

// Ouve o clique no botão 'Monitorar'
if (botaoMonitorar) {
    botaoMonitorar.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (inputTelefone && inputTelefone.value.length === 15) {
            const numeroDigitado = inputTelefone.value;
            iniciarCarregamento(numeroDigitado);
        } else {
            alert('Por favor, digite o número de celular completo (DDD + 9 dígitos).');
        }
    });
}

// **NOVO:** Chamada da função na página de destino
// Esta parte do código será executada se o script for carregado na página do relatório
if (document.title.includes('Relatorio completo do Whatsapp') || 
    window.location.pathname.endsWith('relatorio_parceira.html')) {
    
    document.addEventListener('DOMContentLoaded', preencherNumerosNoRelatorio);
}