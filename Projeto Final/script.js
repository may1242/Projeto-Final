// Função para sair da tela inicial e mostrar a tela com o formulário
function mostrarFormulario() {
    // Esconde a tela de apresentação
    document.getElementById('apresentacao').style.display = 'none';
    // Mostra a tela de configuração (formulário)
    document.getElementById('configuracao').style.display = 'block';
    // Garante que a tela de resultado continue escondida
    document.getElementById('resultado').style.display = 'none';
}

// Função para cancelar e voltar à tela inicial
function voltarParaApresentacao() {
    // Esconde o formulário
    document.getElementById('configuracao').style.display = 'none';
    // Esconde a tela de resultado (caso esteja aberta)
    document.getElementById('resultado').style.display = 'none';
    // Mostra novamente a tela de apresentação
    document.getElementById('apresentacao').style.display = 'block';
    // Limpa todos os campos preenchidos no formulário
    document.getElementById('formPlano').reset(); 
}

// Função principal executada ao enviar o formulário
function gerarPlanoFamiliar(event) {
    // Evita que a página seja recarregada automaticamente (comportamento padrão de formulários)
    event.preventDefault();

    // Captura os valores que o usuário digitou ou selecionou no formulário
    let numPessoas = document.getElementById('numPessoas').value;
    let tipoResidencia = document.getElementById('tipoResidencia').value;
    let possuiCriancas = document.getElementById('possuiCriancas').value;
    let possuiIdosos = document.getElementById('possuiIdosos').value;
    let riscoPrincipal = document.getElementById('riscoPrincipal').value;

    // Validação de segurança: verifica se o número de pessoas é zero ou negativo
    if (numPessoas <= 0) {
        alert("O número de pessoas deve ser maior que zero.");
        return; // Interrompe a função aqui se o número for inválido
    }

    // Monta uma frase dinâmica com o tipo de residência e número de pessoas
    let textoResumo = `Residência tipo ${tipoResidencia} com ${numPessoas} pessoa(s).`;
    // Insere essa frase montada na tela de resultado
    document.getElementById('resumoFamilia').textContent = textoResumo;

    // Variável para guardar o texto de orientação do risco escolhido
    let textoRisco = "";
    // Coloca o nome do risco (ex: "Enchente") como um título na tela de resultado
    document.getElementById('tituloRisco').textContent = riscoPrincipal;

    // Avalia qual foi o risco selecionado e define as instruções adequadas
    if (riscoPrincipal === "Enchente") {
        textoRisco = "Oriente sua família sobre as áreas alagadas da região. Busque um local seguro e alto. Acompanhe as informações oficiais de medição do rio.";
    } else if (riscoPrincipal === "Deslizamento") {
        textoRisco = "Oriente o afastamento imediato de encostas e áreas de risco. Fique atento a rachaduras no terreno ou paredes.";
    } else if (riscoPrincipal === "Vendaval") {
        textoRisco = "Oriente a permanência em local protegido. Mantenham-se afastados de árvores, janelas e estruturas frágeis que possam ceder.";
    }
    // Insere o texto da instrução na tela
    document.getElementById('recomendacaoRisco').textContent = textoRisco;

    // Seleciona os elementos HTML relacionados aos alertas de crianças e idosos
    let divAlertas = document.getElementById('alertasEspeciais'); // Caixa geral dos alertas
    let pCrianca = document.getElementById('alertaCrianca');      // Parágrafo das crianças
    let pIdoso = document.getElementById('alertaIdoso');          // Parágrafo dos idosos
    
    // Variável que servirá como um "sinal" para saber se a caixa geral precisa ser mostrada
    let mostrarAlertas = false;

    // Verifica se o usuário marcou que possui crianças
    if (possuiCriancas === "Sim") {
        // Preenche a instrução específica para crianças
        pCrianca.textContent = "Crianças: Garanta acompanhamento e responsabilidade contínua. Mantenha-as calmas e explique a situação de forma simples.";
        pCrianca.style.display = "block"; // Torna o parágrafo visível
        mostrarAlertas = true;            // Sinaliza que há pelo menos um alerta a ser exibido
    } else {
        pCrianca.style.display = "none";  // Esconde o parágrafo se não houver crianças
    }

    // Verifica se o usuário marcou que possui idosos
    if (possuiIdosos === "Sim") {
        // Preenche a instrução específica para idosos
        pIdoso.textContent = "Idosos: Adicione uma orientação específica de apoio físico para deslocamento. Garanta que os medicamentos de uso contínuo estejam no kit de emergência.";
        pIdoso.style.display = "block"; // Torna o parágrafo visível
        mostrarAlertas = true;          // Sinaliza que há pelo menos um alerta a ser exibido
    } else {
        pIdoso.style.display = "none";  // Esconde o parágrafo se não houver idosos
    }

    // Se houver crianças OU idosos, mostra a caixa geral de alertas
    if (mostrarAlertas) {
        divAlertas.style.display = "block";
    } else {
        // Se não houver nenhum dos dois, mantém a caixa geral escondida
        divAlertas.style.display = "none";
    }

    // Esconde o formulário
    document.getElementById('configuracao').style.display = 'none';
    // Mostra a tela final com o Plano Familiar gerado
    document.getElementById('resultado').style.display = 'block';
}