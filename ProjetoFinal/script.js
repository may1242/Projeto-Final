
// Projeto Final: Dedesa Cívil --> Gerador de Plano Familiar
// Alunos: Maria Luiza, Pablo, Everton, Murilo e Samuel


document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioPlano');
    formulario.addEventListener('submit', processarPlanoEmergencia);
});

/*** Função Principal para processar os dados e controlar a exibição na página.
 * @param {Event} event - Evento de envio do formulário */
function processarPlanoEmergencia(event) {
    // Previne o recarregamento automático do formulário
    event.preventDefault();

    // 1. Obtém os dados dcoocados no "gráfico"
    const numeroPessoas = parseInt(document.getElementById('numeroPessoas').value, 10);
    const tipoResidencia = document.getElementById('tipoResidencia').value;
    const possuiCriancas = document.getElementById('possuiCriancas').value;
    const possuiIdosos = document.getElementById('possuiIdosos').value;
    const principalRisco = document.getElementById('principalRisco').value;

    // Elementos de mensagem e resultado
    const divErro = document.getElementById('mensagemErro');
    const secaoResultado = document.getElementById('secaoResultado');

    // Limpa estado anterior de erro e resultado
    divErro.classList.add('esconde');
    divErro.textContent = '';

    // 2. Valida as entradas do usuário
    const mensagemValidacao = validarEntradas(numeroPessoas, tipoResidencia, possuiCriancas, possuiIdosos, principalRisco);
    if (mensagemValidacao !== '') {
        divErro.textContent = mensagemValidacao;
        divErro.classList.remove('esconde');
        secaoResultado.classList.add('esconde');
        return;
    }

    // 3. Aplica as regras do problema
    const planoGerado = gerarRegrasPlano(numeroPessoas, tipoResidencia, possuiCriancas, possuiIdosos, principalRisco);

    // 4. Exibe o resultado na página
    exibirResultadoNaTela(planoGerado);
}

/**
 * Realiza as validações básicas de preenchimento.
 */
function validarEntradas(numeroPessoas, tipoResidencia, possuiCriancas, possuiIdosos, principalRisco) {
    if (isNaN(numeroPessoas) || numeroPessoas <= 0) {
        return 'Por favor, informe um número válido e positivo de pessoas na residência.';
    }
    if (!tipoResidencia || !possuiCriancas || !possuiIdosos || !principalRisco) {
        return 'Por favor, preencha todos os campos do formulário para continuar.';
    }
    return '';
}

/**
 * Contém as regras condicionais (if/else ou switch) do sistema.
 */
function gerarRegrasPlano(numeroPessoas, tipoResidencia, possuiCriancas, possuiIdosos, principalRisco) {
    const plano = {
        resumo: 'Residência do tipo ${tipoResidencia.toUpperCase()} composta por ${numeroPessoas} pessoa(s). Principal risco mapeado: ${principalRisco.toUpperCase()}.',
        antes: [
            'Monte um kit de emergência contendo água, alimentos não perecíveis, lanterna, pilhas e itens de primeiros socorros.',
            'Mantenha documentos importantes em sacos plásticos impermeáveis e em local de fácil acesso.',
            'Cadastre seu celular para receber alertas oficiais da Defesa Civil enviando o CEP por SMS para 40199.'
        ],
        durante: [
            'Mantenha a calma e desligue os disjuntores de energia e o registro de gás caso seja necessário abandonar o local.',
            'Acompanhe rigorosamente os avisos e notícias emitidos pelos canais oficiais de comunicação.',
            'Não tente atravessar locais alagados ou de risco a pé ou com veículos.'
        ],
        orientacaoRisco: '',
        observacoesEspeciais: []
    };

    // Regras por Tipo de Risco
    switch (principalRisco) {
        case 'enchente':
            plano.orientacaoRisco = 'Evite o contato direto com a água de alagamentos (risco de contaminação). Em caso de elevação da água, vá para um local seguro predeterminado ou pavimento mais alto.';
            break;
        case 'deslizamento':
            plano.orientacaoRisco = 'Mantenha-se afastado de encostas e barrancos. Fique atento a sinais como inclinação de árvores/postes, rachaduras nas paredes ou águas barrentas descendo o morro.';
            break;
        case 'vendaval':
            plano.orientacaoRisco = 'Permaneça em local fechado e protegido. Mantenha distância de janelas, vidros, árvores, placas e estruturas frágeis que possam ser derrubadas pelo vento.';
            break;
        default:
            plano.orientacaoRisco = 'Mantenha-se em local seguro e acompanhe as instruções das autoridades locais.';
    }

    // Regra específica para Crianças
    if (possuiCriancas === 'sim') {
        plano.observacoesEspeciais.push('Orientações para Crianças: Mantenha as crianças acompanhadas o tempo todo sob a responsabilidade explícita de um adulto. Explique a situação de forma calma e mantenha cartões de identificação nos bolsos delas.');
    }

    // Regra específica para Idosos
    if (possuiIdosos === 'sim') {
        plano.observacoesEspeciais.push('Orientações para Idosos: Garanta apoio e auxílio especial durante a evacuação e deslocamentos. Separe com antecedência receitas médicas e medicamentos de uso contínuo no kit de emergência.');
    }

    return plano;
}

/**
 * Atualiza o DOM e torna visível o resultado gerado.
 */
function exibirResultadoNaTela(plano) {
    // Atualiza o resumo
    document.getElementById('textoResumoFamilia').textContent = plano.resumo;

    // Atualiza Recomendações do Risco
    document.getElementById('textoRecomendacaoRisco').textContent = plano.orientacaoRisco;

    // Atualiza "Antes da Emergência"
    const listaAntes = document.getElementById('listaAntesEmergencia');
    listaAntes.innerHTML = '';
    plano.antes.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaAntes.appendChild(li);
    });

    // Atualiza "Durante a Emergência"
    const listaDurante = document.getElementById('listaDuranteEmergencia');
    listaDurante.innerHTML = '';
    plano.durante.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaDurante.appendChild(li);
    });

    // Atualiza Observações para Crianças / Idosos
    const blocoEspecial = document.getElementById('blocoEspecial');
    const listaEspecial = document.getElementById('listaObservacoesEspeciais');
    listaEspecial.innerHTML = '';

    if (plano.observacoesEspeciais.length > 0) {
        blocoEspecial.classList.remove('esconde');
        plano.observacoesEspeciais.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listaEspecial.appendChild(li);
        });
    } else {
        blocoEspecial.classList.add('esconde');
    }

    // Torna a seção de resultado visível na página
    document.getElementById('secaoResultado').classList.remove('esconde');
}