// Array para armazenar as tarefas
let tarefas = [];

// Função para salvar as tarefas no LocalStorage
function salvarLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar as tarefas do LocalStorage
function carregarLocalStorage() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefa => {
            adicionarTarefaNoDOM(tarefa);
        });
    }
}

// Função para adicionar uma nova tarefa
function adicionar() {
    const nome_tarefa = document.getElementById("tarefa").value.trim(); // Remove espaços em branco
    const tarefaInput = document.getElementById("tarefa");
    const todo_list = document.getElementById("todo-list");

    if (nome_tarefa.length === 0) { // Verificação para que o nome da tarefa não fique vazio
        window.alert("Nome Inexistente! Tente Novamente.");
    } else {
        const tarefaObj = {
            id: Date.now(), // ID único baseado no timestamp
            nome: nome_tarefa,
            completada: false
        };

        tarefas.push(tarefaObj);
        salvarLocalStorage();
        adicionarTarefaNoDOM(tarefaObj);

        tarefaInput.value = ""; // Limpa o input
        tarefaInput.focus(); // Foca novamente no input
    }
}

// Função para adicionar a tarefa no DOM
function adicionarTarefaNoDOM(tarefa) {
    const todo_list = document.getElementById("todo-list");

    const div = document.createElement("div");
    div.setAttribute("class", "todo-tarefas");
    div.setAttribute("data-id", tarefa.id); // Armazena o ID para referência futura

    const h3 = document.createElement("h3");
    h3.innerText = tarefa.nome;
    if (tarefa.completada) {
        h3.style.textDecoration = "line-through";
    }

    // Criação dos botões
    const btnCancel = criarBotao("close", "btn cancel");
    const btnEdit = criarBotao("edit_square", "btn edit");
    const btnConfirm = criarBotao("check", "btn confirm");

    // Adiciona os elementos à div
    div.appendChild(h3);
    div.appendChild(btnCancel);
    div.appendChild(btnEdit);
    div.appendChild(btnConfirm);

    // Adiciona a div à lista de tarefas
    todo_list.appendChild(div);
}

// Função auxiliar para criar botões
function criarBotao(icone, classe) {
    const btn = document.createElement("button");
    btn.setAttribute("class", classe);

    const span = document.createElement("span");
    span.setAttribute("class", "material-symbols-outlined");
    span.innerText = icone;

    btn.appendChild(span);
    return btn;
}

// Delegação de eventos para manipular ações nas tarefas
document.addEventListener("DOMContentLoaded", function() {
    carregarLocalStorage();

    const todoList = document.getElementById("todo-list");

    todoList.addEventListener("click", function(event) {
        const target = event.target;
        const botao = target.closest("button");
        if (!botao) return; // Se não for um botão, ignora

        const divTarefa = botao.closest(".todo-tarefas");
        const tarefaId = parseInt(divTarefa.getAttribute("data-id"));
        const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);

        if (botao.classList.contains("confirm")) { // Botão de confirmar (marcar como completada)
            const h3 = divTarefa.querySelector("h3");
            tarefas[tarefaIndex].completada = !tarefas[tarefaIndex].completada;
            salvarLocalStorage();
            h3.style.textDecoration = tarefas[tarefaIndex].completada ? "line-through" : "none";
        } else if (botao.classList.contains("cancel")) { // Botão de remover
            tarefas.splice(tarefaIndex, 1);
            salvarLocalStorage();
            divTarefa.remove();
        } else if (botao.classList.contains("edit")) { // Botão de editar
            const tarefa = tarefas[tarefaIndex];
            titulo = tarefa; // Guarda a referência da tarefa a ser editada

            document.getElementById("todo-list").style.display = "none";
            document.getElementById("todo-add").style.display = "none";
            document.getElementById("todo-edit").style.display = "block";
            document.getElementById("edit").value = tarefa.nome;
            document.getElementById("edit").focus();
        }
    });
});

// Funções para editar tarefas
let tarefaEditando = null;

function cancelarEdit() {
    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
    tarefaEditando = null;
}

function editar() {
    const input = document.getElementById("edit").value.trim();
    if (input.length === 0) {
        window.alert("O nome da tarefa não pode estar vazio.");
        return;
    }

    if (tarefaEditando !== null) {
        // Atualiza a tarefa no array
        const tarefaIndex = tarefas.findIndex(t => t.id === tarefaEditando.id);
        if (tarefaIndex !== -1) {
            tarefas[tarefaIndex].nome = input;
            salvarLocalStorage();

            // Atualiza o DOM
            const divTarefa = document.querySelector(`.todo-tarefas[data-id='${tarefaEditando.id}']`);
            if (divTarefa) {
                const h3 = divTarefa.querySelector("h3");
                h3.innerText = input;
            }
        }
    }

    // Reexibe a lista e esconde o formulário de edição
    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
    tarefaEditando = null;
}

// Atualiza a referência da tarefa que está sendo editada
document.getElementById("todo-list").addEventListener("click", function(event) {
    if (event.target.closest(".edit")) {
        const botao = event.target.closest("button");
        const divTarefa = botao.closest(".todo-tarefas");
        const tarefaId = parseInt(divTarefa.getAttribute("data-id"));
        tarefaEditando = tarefas.find(t => t.id === tarefaId);
    }
});
