// =========================================================
//            MAPA DE DDD E CIDADES (BRASIL)
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
    // DDDs 6x: Centro-Oeste + Norte
    '61': 'Brasília', '62': 'Goiânia', '63': 'Palmas', '64': 'Rio Verde',
    '65': 'Cuiabá', '66': 'Rondonópolis', '67': 'Campo Grande',
    '68': 'Rio Branco', '69': 'Porto Velho',
    // DDDs 7x: Bahia (BA) e Sergipe (SE)
    '71': 'Salvador', '73': 'Itabuna', '74': 'Juazeiro', '75': 'Feira de Santana',
    '77': 'Vitória da Conquista', '79': 'Aracaju',
    // DDDs 8x: Nordeste
    '81': 'Recife', '82': 'Maceió', '83': 'João Pessoa', '84': 'Natal',
    '85': 'Fortaleza', '86': 'Teresina', '87': 'Petrolina',
    '88': 'Juazeiro do Norte', '89': 'Picos',
    // DDDs 9x: Norte
    '91': 'Belém', '92': 'Manaus', '93': 'Santarém', '94': 'Marabá',
    '95': 'Boa Vista', '96': 'Macapá', '97': 'Tefé',
    '98': 'São Luís', '99': 'Imperatriz',
};

// =========================================================
//             SELETORES INICIAIS
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
//                 1. NAVEGAÇÃO / MENU
// =========================================================
if (parceira) {
    parceira.addEventListener('click', () => {
        window.location.href = './parceiro.html';
    });
}

if (parceiro) {
    parceiro.addEventListener('click', () => {
        window.location.href = './parceiro.html';
    });
}

// =========================================================
//                 2. BOTÃO DE DOWNLOAD
// =========================================================
// (Seu código de download)

// =========================================================
//          3. MÁSCARA E EFEITO DO TELEFONE
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
//             FUNÇÕES DE UTILIDADE
// =========================================================

function obterCidadePeloDDD(telefoneFormatado) {
    const apenasNumeros = telefoneFormatado.replace(/\D/g, '');
    const ddd = apenasNumeros.substring(0, 2);
    return DDD_TO_CITY[ddd] || 'Localização Desconhecida';
}

// =========================================================
// **4. GERAÇÃO, MASCARAMENTO E ARMAZENAMENTO**
// =========================================================

function gerarNumeroAleatorioNoveDigitos() {
    let numero = '9'; 
    for (let i = 0; i < 8; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    return numero;
}

function gerarTelefoneOculto(ddd) {
    if (ddd.length !== 2) {
        return "(xx) xxxxx-xxxx";
    }

    const numeroCompleto = gerarNumeroAleatorioNoveDigitos();
    const ultimosDigitos = numeroCompleto.substring(6);
    const parteOcultaPrefixo = 'xxxxx';
    const restanteOcultoSufixo = 'x';
    
    const telefoneOculto = `+55 (${ddd}) ${parteOcultaPrefixo}-${restanteOcultoSufixo}${ultimosDigitos}`;
    
    return telefoneOculto;
}

function salvarNumerosConversas(dddBase) {
    if (dddBase.length !== 2) return;

    const numerosParaSalvar = [];
    
    for (let i = 0; i < 4; i++) {
        const novoNumeroOculto = gerarTelefoneOculto(dddBase); 
        numerosParaSalvar.push(novoNumeroOculto);
    }

    localStorage.setItem('telefonesRelatorio', JSON.stringify(numerosParaSalvar));
}

function preencherNumerosNoRelatorio() {
    const numerosJSON = localStorage.getItem('telefonesRelatorio');
    
    if (!numerosJSON) {
        console.warn("Nenhum número de telefone encontrado no localStorage. Preenchendo com 'Não Encontrado'.");
        for (let i = 1; i <= 4; i++) {
             const h2Element = document.getElementById(`tel0${i}`);
             if(h2Element) h2Element.textContent = "(XX) XXXXX-XXXX";
        }
        return;
    }
    
    const numeros = JSON.parse(numerosJSON); 

    for (let i = 1; i <= 4; i++) {
        const idH2 = `tel0${i}`; 
        const h2Element = document.getElementById(idH2);
        
        if (h2Element && numeros[i - 1]) {
            h2Element.textContent = numeros[i - 1];
        }
    }
}


// =========================================================
//      5. FUNCIONALIDADE DE MONITORAMENTO (5s)
// =========================================================

function iniciarCarregamento(telefone) {
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
    
    if (dataPopup) {
        if (dataPopupContent) {
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
            
            setTimeout(() => {
                const btnRelatorioDinamico = document.getElementById('btn-relatorio-dinamico');
                
                if (btnRelatorioDinamico) {
                    btnRelatorioDinamico.addEventListener('click', () => {
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
//      6. ANIMAÇÕES DE BUSCA RÁPIDA (30s)
// =========================================================

function iniciarBuscaRapida() {
    const frasesArquivos = [
        "checando metadados...", "tentativa de conexão (1)...",
        "analisando cache do dispositivo...", "criptografia bypass: 85%",
        "localizando registro de chamadas...", "validando perfil de usuário...",
        "conectado à rede remota...", "buscando histórico de localização...",
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
//      7. NOVO CARREGAMENTO DE 30 SEGUNDOS (COM SALVAMENTO)
// =========================================================

function iniciarCarregamentoRelatorio() {
    // 1. Obter o DDD base e SALVAR os números aleatórios no localStorage
    if (inputTelefone) {
        const numeroDigitadoFormatado = inputTelefone.value;
        const apenasNumeros = numeroDigitadoFormatado.replace(/\D/g, ''); 
        const dddBase = apenasNumeros.substring(0, 2); 
        
        if (dddBase.length === 2) {
            salvarNumerosConversas(dddBase); 
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
                window.location.href = 'relatoio_parceiro.html'; // Redireciona
            }, 500);
        }
    }, 1000); 
}


// =========================================================
//             7. CONFIGURAÇÃO DE ROLAGEM DE MENSAGENS
//               (FÁCIL DE EDITAR AQUI)
// =========================================================

/**
 * 📢 EDIÇÃO FÁCIL: Configure aqui as mensagens e os tempos para cada parágrafo.
 * Você pode adicionar, remover ou editar as mensagens de cada array (lista).
 * Os tempos de pausa são aleatórios entre o MIN e o MAX definidos.
 */
const CONFIG_ROLAGEM = [
    {
        id: 'mensagem-rolante-01',
        mensagens: [
            "Mensagens suspeitas apagadas recuperadas", 
            "Fotos suspeitas apagadas recuperadas (3)",
            "Contatos bloqueados identificados"
        ],
        // O tempo de troca será aleatório entre 4.0 e 7.0 segundos
        pausaMinMs: 4000, 
        pausaMaxMs: 7000,
    },
    {
        id: 'mensagem-rolante-02',
        mensagens: [
            "Vídeos suspeitos apagados recuperados (1)", 
            "Áudios deletados recuperados com sucesso",
            "Localização enviada recentemente"
        ],
        // O tempo de troca será aleatório entre 3.5 e 5.5 segundos
        pausaMinMs: 3500, 
        pausaMaxMs: 5500,
    },
    {
        id: 'mensagem-rolante-03',
        mensagens: [
            "56 mensagens excluídas críticas recuperadas",
            "Arquivos ocultos encontrados em cache",
            "Atividade suspeita detectada"
        ],
        // O tempo de troca será aleatório entre 5.0 e 8.0 segundos
        pausaMinMs: 5000, 
        pausaMaxMs: 8000,
    },
    {
        id: 'mensagem-rolante-04',
        mensagens: [
            "Histórico de chamadas apagado recuperado",
            "Dados de backup comprometidos",
            "Mensagens recuperadas de grupos (4)"
        ],
        // O tempo de troca será aleatório entre 4.5 e 6.5 segundos
        pausaMinMs: 4500, 
        pausaMaxMs: 6500,
    },
];

const MAX_ATRASO_INICIAL_MS = 2000; // Atraso máximo (2.0s) para dessincronizar o início

/**
 * Inicia a rolagem de mensagens em um elemento com conteúdo, pausa e atraso iniciais variáveis.
 * @param {string} idElemento O ID do elemento SPAN.
 * @param {string[]} mensagensArray O array de mensagens exclusivo para este elemento.
 * @param {number} minMs O tempo mínimo de pausa (em ms).
 * @param {number} maxMs O tempo máximo de pausa (em ms).
 * @param {number} delayMs Atraso inicial em milissegundos para dessincronizar.
 */
function iniciarRolagemDeMensagens(idElemento, mensagensArray, minMs, maxMs, delayMs = 0) {
    const elemento = document.getElementById(idElemento);
    if (!elemento || mensagensArray.length === 0) return; 

    let indiceAtual = 0;
    
    // Calcula um tempo de pausa ALEATÓRIO no intervalo definido
    const TEMPO_PAUSA_ALEATORIO = Math.floor(
        Math.random() * (maxMs - minMs + 1)
    ) + minMs;

    function atualizarMensagem() {
        elemento.textContent = mensagensArray[indiceAtual];
        indiceAtual = (indiceAtual + 1) % mensagensArray.length;
    }

    // Cria um atraso inicial aleatório para dessincronizar
    setTimeout(() => {
        atualizarMensagem();
        
        // Define o intervalo de repetição com a pausa ALEATÓRIA
        setInterval(atualizarMensagem, TEMPO_PAUSA_ALEATORIO); 
    }, delayMs);
}


// =========================================================
//            8. LISTENERS INICIAIS E CHECAGEM DE PÁGINA
// =========================================================

// Ouve o clique no botão 'Monitorar' (Página Inicial)
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

// **INTEGRAÇÃO CRÍTICA DA ROLAGEM:**
// Chamada das funções na página de destino (Relatório)
if (document.title.includes('Relatório de Conversas') || 
    window.location.pathname.endsWith('relatorio_parceira.html')) {
    
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Preenche os números de telefone
        preencherNumerosNoRelatorio(); 
        
        // 2. INICIA A ROLAGEM DOS ELEMENTOS
        CONFIG_ROLAGEM.forEach(config => {
            iniciarRolagemDeMensagens(
                config.id, 
                config.mensagens, 
                config.pausaMinMs, 
                config.pausaMaxMs, 
                Math.random() * MAX_ATRASO_INICIAL_MS // Atraso inicial aleatório para dessincronizar
            );
        });
    });
}