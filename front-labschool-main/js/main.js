const url = "http://localhost:3000/api"; // Base URL da API

// Função para buscar as turmas associadas ao professor autenticado
function getTurmasProfessor() {
    axios.get(`${url}/professor/turmas`)
        .then(response => {
            const turmas = response.data.result;

            let html = "<option disabled selected>Selecione uma turma</option>";

            for (let turma of turmas) {
                html += `<option value="${turma.id}">${turma.nome} - ${turma.codigo}</option>`;
            }
            document.getElementById('select-turma').innerHTML = html;
        })
        .catch(err => console.error("Erro ao buscar turmas:", err));
}

// Função para buscar as atividades relacionadas à turma selecionada
function getAtividadesTurma(turmaId) {
    axios.get(`${url}/turma/${turmaId}/atividades`)
        .then(response => {
            const atividades = response.data.result;

            let html = "";
            for (let atividade of atividades) {
                html += `
                <tr>
                    <th scope="row">${atividade.id}</th>
                    <td>${atividade.nome}</td>
                    <td>${atividade.descricao}</td>
                    <td>${atividade.data_entrega}</td>
                    <td>${atividade.peso}</td>
                    <td><button class="btn btn-success" onclick="editarAtividade(${atividade.id})">Editar</button></td>
                    <td><button class="btn btn-danger" onclick="excluirAtividade(${atividade.id})">Excluir</button></td>
                </tr>`;
            }
            document.getElementById('table-atividades').innerHTML = html;
        })
        .catch(err => console.error("Erro ao buscar atividades:", err));
}

// Função para salvar uma nova turma
function saveTurma() {
    const nomeTurma = document.getElementById('inputNomeTurma').value;
    const codigoTurma = document.getElementById('inputCodigoTurma').value;
    const periodoLetivo = document.getElementById('inputPeriodo').value;

    const data = {
        nome: nomeTurma,
        codigo: codigoTurma,
        periodo_letivo: periodoLetivo
    };

    axios.post(`${url}/turma`, data)
        .then(response => {
            alert("Turma registrada com sucesso!");
            getTurmasProfessor(); // Atualiza a lista de turmas
        })
        .catch(err => console.error("Erro ao salvar turma:", err));
}

// Função para salvar uma nova atividade para uma turma
function saveAtividade() {
    const nomeAtividade = document.getElementById('inputNomeAtividade').value;
    const descricaoAtividade = document.getElementById('inputDescricao').value;
    const dataEntrega = document.getElementById('inputDataEntrega').value;
    const pesoAtividade = document.getElementById('inputPeso').value;

    const turmaId = document.getElementById('select-turma').value;

    const data = {
        nome: nomeAtividade,
        descricao: descricaoAtividade,
        data_entrega: dataEntrega,
        peso: pesoAtividade,
        turma_id: turmaId
    };

    axios.post(`${url}/turma/${turmaId}/atividade`, data)
        .then(response => {
            alert("Atividade registrada com sucesso!");
            getAtividadesTurma(turmaId); // Atualiza a lista de atividades
        })
        .catch(err => console.error("Erro ao salvar atividade:", err));
}

// Função para excluir uma atividade
function excluirAtividade(atividadeId) {
    const turmaId = document.getElementById('select-turma').value;

    axios.delete(`${url}/atividade/${atividadeId}`)
        .then(response => {
            alert("Atividade excluída com sucesso!");
            getAtividadesTurma(turmaId); // Atualiza a lista de atividades
        })
        .catch(err => console.error("Erro ao excluir atividade:", err));
}

// Função para editar uma atividade (incompleta, depende do backend)
function editarAtividade(atividadeId) {
    // Aqui você pode redirecionar para uma página de edição de atividade
    // ou abrir um modal para editar os dados diretamente
    alert(`Função de edição de atividade ainda não implementada para a atividade ID: ${atividadeId}`);
}

// Função que inicializa as funções na página
function init() {
    getTurmasProfessor();

    // Adiciona listener para buscar atividades quando uma turma for selecionada
    document.getElementById('select-turma').addEventListener('change', (event) => {
        const turmaId = event.target.value;
        getAtividadesTurma(turmaId);
    });
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', init);
