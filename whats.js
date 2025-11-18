// =========================================================
//              MAPA DE DDD E CIDADES (BRASIL)
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
//              SELETORES GLOBAIS
// =========================================================
// Seletores de navegação/botões
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const parceiro = document.querySelector('#parceiro');
const parceira = document.querySelector('#parceira');
const downloadBtn = document.getElementById('download-app-btn');

// Seletores do formulário de monitoramento
const inputTelefone = document.getElementById('tel_phone');
const botaoMonitorar = document.querySelector('.btn-monitorar');
const MIN_DIGITOS_CELULAR = 11;

// Seletores Popups de 5s (Busca Rápida)
const loadingPopup = document.getElementById('loading-popup');
const loadingBarFill = document.querySelector('.loading-bar-fill');
const dataPopup = document.getElementById('data-popup');
const dataPopupContent = document.querySelector('.data-popup-content');

// Seletores Popups de 30s (Relatório Final)
const relatorioLoadingPopup = document.getElementById('relatorio-loading-popup');
const relatorioLoadingBarFill = document.querySelector('.relatorio-loading-bar-fill');
const relatorioLoadingCounter = document.getElementById('relatorio-loading-counter');

// Seletores Animação de Busca Rápida (Textos dinâmicos)
const outputFotos = document.getElementById('output-fotos');
const outputConversas = document.getElementById('output-conversas');
const outputArquivos = document.getElementById('output-arquivos');


// =========================================================
//          1. NAVEGAÇÃO E UTILS
// =========================================================
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

function obterCidadePeloDDD(telefoneFormatado) {
    const apenasNumeros = telefoneFormatado.replace(/\D/g, '');
    const ddd = apenasNumeros.substring(0, 2);
    return DDD_TO_CITY[ddd] || 'Localização Desconhecida';
}


// =========================================================
//          2. MÁSCARA E VALIDAÇÃO DO TELEFONE
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
    // Inicia o botão desabilitado na página inicial
    botaoMonitorar.disabled = true;
}


// =========================================================
//          3. GERAÇÃO DE NÚMEROS OCULTOS
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
        // Se não houver números, preenche com placeholder
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
//          4. FUNÇÕES DE POPUP E CARREGAMENTO
// =========================================================

// Função global para fechar o popup de dados (usada no onclick do HTML)
window.fecharPopupDados = function() {
    if (dataPopup) {
        dataPopup.style.display = 'none';
    }
}

function abrirPopupDados(telefone) {
    const numeroParaExibir = telefone || 'Número não fornecido';
    const cidadeAtual = obterCidadePeloDDD(telefone);
    
    if (dataPopup) {
        if (dataPopupContent) {
            // Conteúdo do popup de 5s (Dados)
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

function iniciarCarregamento(telefone) {
    if (loadingPopup && loadingBarFill && dataPopup) {
        dataPopup.style.display = 'none';
        loadingPopup.style.display = 'flex';
        
        loadingBarFill.style.transition = 'none';
        loadingBarFill.style.width = '0%';
        loadingBarFill.offsetWidth; // Recalcula o layout para resetar
        
        loadingBarFill.style.transition = 'width 5s linear';
        loadingBarFill.style.width = '100%';
        
        setTimeout(() => {
            loadingPopup.style.display = 'none';
            abrirPopupDados(telefone);
        }, 5000);
    }
}

/**
 * FUNÇÃO MODIFICADA PARA TER CONTAGEM PROGRESSIVA BASEADA NA PORCENTAGEM DE TEMPO
 */
function iniciarBuscaRapida() {
    const frasesArquivos = [
        "checando metadados...", "tentativa de conexão (1)...",
        "analisando cache do dispositivo...", "criptografia bypass: 85%",
        "localizando registro de chamadas...", "validando perfil de usuário...",
        "conectado à rede remota...", "buscando histórico de localização...",
        "varredura de aplicativos concluída."
    ];

    let fraseIndex = 0;
    const maxConversas = 5;
    const maxFotos = 12; 

    const TEMPO_TOTAL_MS = 30000; // Tempo total do relatorio (30 segundos)
    const INTERVALO_MS = 50; 
    let tempoDecorridoMs = 0; // Novo contador de tempo

    // --- Configurações de Gatilhos (Suas Especificações) ---
    // Conversas: 1 em 25%, 2 em 50%, 5 em 85%
    const CONVERSAS_GATILHOS = [
        { percent: 0, count: 0 }, 
        { percent: 25, count: 1 }, 
        { percent: 50, count: 2 }, 
        { percent: 85, count: maxConversas } 
    ];
    // Fotos: 12 em 75%
    const FOTOS_GATILHOS = [
        { percent: 0, count: 0 }, 
        { percent: 20, count: 4 }, // Ponto intermediário 1
        { percent: 45, count: 8 }, // Ponto intermediário 2
        { percent: 75, count: maxFotos } 
    ];


    // Função auxiliar para calcular a contagem com base em gatilhos percentuais (interpolação)
    function calcularContagem(gatilhos, maximo, percentagemAtual) {
        let count = 0;
        
        // Se já passou do último gatilho, garante o máximo
        if (percentagemAtual >= gatilhos[gatilhos.length - 1].percent) {
            return maximo;
        }

        // Procura o intervalo (anterior e atual) que a percentagem está
        for (let i = 1; i < gatilhos.length; i++) {
            const prevGatilho = gatilhos[i - 1];
            const currentGatilho = gatilhos[i];

            if (percentagemAtual < currentGatilho.percent) {
                const rangePercent = currentGatilho.percent - prevGatilho.percent;
                const rangeCount = currentGatilho.count - prevGatilho.count;

                const percentInRange = percentagemAtual - prevGatilho.percent;
                
                if (rangePercent > 0) {
                    // Interpolação Linear
                    const interp = (percentInRange / rangePercent) * rangeCount;
                    count = prevGatilho.count + interp;
                } else {
                    // Se o range for 0 (gatilhos no mesmo ponto), usa a contagem do gatilho anterior
                    count = prevGatilho.count;
                }
                break;
            }
            // Se a porcentagem atual é exatamente igual ou maior que o gatilho atual, 
            // a contagem já deve ser pelo menos a deste gatilho
            count = currentGatilho.count;
        }
        
        return Math.min(maximo, Math.floor(count));
    }

    const intervalBusca = setInterval(() => {
        tempoDecorridoMs += INTERVALO_MS;
        // Limita a 100% mesmo se o tempo passar ligeiramente dos 30s
        const percentagemDecorrida = Math.min(100, (tempoDecorridoMs / TEMPO_TOTAL_MS) * 100);

        // --- 1. Busca de Conversas (Contagem Gradual) ---
        const countConversas = calcularContagem(CONVERSAS_GATILHOS, maxConversas, percentagemDecorrida);
        
        if (outputConversas) {
            outputConversas.textContent = `${countConversas} conversa${countConversas !== 1 ? 's' : ''} suspeita${countConversas !== 1 ? 's' : ''}`;
        }

        // --- 2. Busca de Fotos (Contagem Gradual) ---
        const countFotos = calcularContagem(FOTOS_GATILHOS, maxFotos, percentagemDecorrida);
        
        if (outputFotos) {
            outputFotos.textContent = `${countFotos} foto${countFotos !== 1 ? 's' : ''} suspeita${countFotos !== 1 ? 's' : ''} encontrada${countFotos !== 1 ? 's' : ''}`;
        }
        
        // --- 3. Busca de Arquivos (Frases) ---
        if (fraseIndex % 10 === 0) {
             outputArquivos.textContent = frasesArquivos[fraseIndex % frasesArquivos.length];
        }
        fraseIndex++;

        if (tempoDecorridoMs >= TEMPO_TOTAL_MS) {
            // Garante que a contagem máxima seja exibida ao final do intervalo de 30s
            clearInterval(intervalBusca); 
            if (outputFotos) outputFotos.textContent = `Busca de Fotos CONCLUÍDA (${maxFotos} encontradas)`;
            if (outputConversas) outputConversas.textContent = `Busca de Conversas CONCLUÍDA (${maxConversas} encontradas)`;
            if (outputArquivos) outputArquivos.textContent = `Busca de Arquivos CONCLUÍDA.`;
        }

    }, INTERVALO_MS);
}


function iniciarCarregamentoRelatorio() {
    // 1. Obter o DDD base e SALVAR os números aleatórios no localStorage
    if (inputTelefone) {
        const numeroDigitadoFormatado = inputTelefone.value;
        const apenasNumeros = numeroDigitadoFormatado.replace(/\D/g, ''); 
        const dddBase = apenasNumeros.substring(0, 2); 
        
        if (dddBase.length === 2) {
            salvarNumerosConversas(dddBase); 
        } else {
             // Caso não tenha conseguido o DDD
        }
    } 
    
    // 2. Iniciar animação e contagem
    fecharPopupDados();

    if (!relatorioLoadingPopup || !relatorioLoadingBarFill || !relatorioLoadingCounter) {
        return;
    }

    relatorioLoadingPopup.style.display = 'flex';
    iniciarBuscaRapida(); // Inicia a animação de texto (AGORA com a contagem progressiva)

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
            
            // 3. Redirecionar
            setTimeout(() => {
                relatorioLoadingPopup.style.display = 'none';
                window.location.href = 'relatorio_parceira.html'; // Redireciona
            }, 500);
        }
    }, 1000); 
}


// =========================================================
//          5. CONFIGURAÇÃO DE ROLAGEM DE MENSAGENS
// =========================================================

/**
 * 📢 EDIÇÃO FÁCIL: Configure aqui as mensagens e os tempos para cada parágrafo.
 */
const CONFIG_ROLAGEM = [
    {
        id: 'mensagem-rolante-01',
        mensagens: [
            "Mensagens suspeitas apagadas recuperadas", 
            "Fotos suspeitas apagadas recuperadas (3)",
            "Contatos bloqueados identificados"
        ],
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
        pausaMinMs: 4500, 
        pausaMaxMs: 6500,
    },
];

const MAX_ATRASO_INICIAL_MS = 2000; 

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
//          6. LISTENERS INICIAIS E BLOCO PRINCIPAL
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

// BLOCO PRINCIPAL PARA FUNCIONALIDADES DA PÁGINA DE RELATÓRIO
// Ele só roda se o título da página ou o caminho indicar que é a página de relatório.
if (document.title.includes('Relatório de Conversas') || 
    window.location.pathname.endsWith('relatorio_parceira.html')) {
    
    document.addEventListener('DOMContentLoaded', () => {
        
        // --- A. Funcionalidades do Relatório (Existentes) ---
        preencherNumerosNoRelatorio(); 
        
        CONFIG_ROLAGEM.forEach(config => {
            iniciarRolagemDeMensagens(
                config.id, 
                config.mensagens, 
                config.pausaMinMs, 
                config.pausaMaxMs, 
                Math.random() * MAX_ATRASO_INICIAL_MS
            );
        });
        
        // --- B. Funcionalidade do Modal de Desbloqueio (Nova) ---
        const conversas = document.querySelectorAll('.conversas_recuperadas');
        const modal = document.getElementById('modal-desbloqueio');
        const fecharBtn = document.querySelector('.modal-close-btn');

        // 1. Abrir o modal ao clicar em qualquer div de conversa
        conversas.forEach(conversa => {
            conversa.addEventListener('click', () => {
                if (modal) {
                    modal.style.display = 'flex';
                }
            });
        });

        // 2. Fechar o modal ao clicar no 'X'
        if (fecharBtn) {
            fecharBtn.addEventListener('click', () => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // 3. Fechar o modal ao clicar fora (no overlay)
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });
}

// --- Configuração das Imagens Personalizadas ---
const caminhos_imagens_popups = {
    // Para o id="conversas01" -> abre 
       'modal01': [
        './imagens_fechadas/imagens-whats-dele/print-whats05.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats01.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats03.jpg',
    ],
    // Para o id="conversas02" -> abre modal02
    'modal02': [
        './imagens_fechadas/imagens-whats-dele/print-whats04.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats06.jpg',
        './imagens_conversas_popups/conversa02_img3.jpg'
    ],
    // Para o id="conversas03" -> abre modal03
    'modal03': [
        './imagens_fechadas/imagens-whats-dele/print-whats13.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats08.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats09.jpg',
    ],
    // Para o id="conversas04" -> abre modal04
    'modal04': [
        './imagens_fechadas/imagens-whats-dele/print-whats08.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats09.jpg',
        './imagens_fechadas/imagens-whats-dele/print-whats13.jpg',
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos que abrem o modal
    const botoes_abrir = document.querySelectorAll('.conversas_recuperadas_botao');
    
    // 2. Adiciona o listener de clique para abrir
    botoes_abrir.forEach(botao => {
        botao.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                // Preenche as imagens antes de abrir
                preencherImagens(modalId);
                
                // Exibe o modal
                modal.style.display = 'block';
            }
        });
    });

    // 3. Função para preencher as imagens do modal
    function preencherImagens(modalId) {
        const caminhos = caminhos_imagens_popups[modalId];
        const modal = document.getElementById(modalId);
        
        if (caminhos && modal) {
            const imgElements = modal.querySelectorAll('.img-whatsapp');
            
            imgElements.forEach((img, index) => {
                if (caminhos[index]) {
                    img.src = caminhos[index]; // Define o caminho da imagem
                    img.alt = `Conversa ${index + 1} do ${modalId}`; 
                }
            });
        }
    }

    // 4. Lógica para fechar o modal (clique no X ou fora do conteúdo)
    
    // Fecha ao clicar no 'X'
    const botoes_fechar = document.querySelectorAll('.fechar-modal');
    botoes_fechar.forEach(span => {
        span.addEventListener('click', function() {
            // Volta para o elemento pai com a classe .modal-popap
            const modal = this.closest('.modal-popap');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Fecha ao clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-popap')) {
            event.target.style.display = 'none';
        }
    });

    // --- Mantenha aqui o restante do seu código JS (como as mensagens rolantes, se houver) ---
    // ...
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para o novo botão principal ---
    const botaoPrincipal = document.getElementById('abrir-modal-principal');
    const modalPrincipal = document.getElementById('modal-liberacao-principal');
    
    // Abrir o modal principal
    if (botaoPrincipal && modalPrincipal) {
        botaoPrincipal.addEventListener('click', () => {
            modalPrincipal.style.display = 'block';
        });
    }

    // --- Lógica para fechar o novo modal principal (reutilizando a classe .fechar-modal) ---
    
    // Fecha ao clicar no 'X'
    const botoes_fechar = document.querySelectorAll('.fechar-modal');
    botoes_fechar.forEach(span => {
        span.addEventListener('click', function() {
            // Isso fecha o modal principal e os modais de conversa, se abertos.
            const modal = this.closest('.modal-popap');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Fecha ao clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-popap')) {
            event.target.style.display = 'none';
        }
    });

    // --- Mantenha aqui o restante do seu código JS (lógica dos 4 modais de conversa e mensagens rolantes) ---
    // ...
});