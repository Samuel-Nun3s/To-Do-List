// Array para armazenar as tarefas
var tarefas = [];

function salvalLocalStorage() { // Função para salvar as tarefas no LocalStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva a tarefa no LocalStorage
}

function carregarLocalStorage() { // Função para carregar as tarefas do LocalStorage
    const tarefas_salvas = localStorage.getItem('tarefas'); // Pega as tarefas salvas no LocalStorage

    if (tarefas_salvas) {
        tarefas = JSON.parse(tarefas_salvas);
        tarefas.forEach(tarefa => { 
            adicionarTarefaNoDOM(tarefa);
        })
    }
}

function adicionar() {
    var nome_tarefa = document.getElementById("tarefa").value.trim(); // Coleta o Nome da Tarefa
    var tarefa = document.getElementById("tarefa"); // Coleta a caixa de entrada Tarefa

    if (nome_tarefa.length === 0) { // Verificação para que o nome da tarefa não fique vazio
        window.alert("Nome Inexistente! Tente Novamente."); 
    } else {
        const tarefaObj = { // Objeto para armazenar as tarefas
            id: Date.now(), // ID único baseado no timestap
            nome: nome_tarefa,
            completada: false
        }

        tarefas.push(tarefaObj); // Adiciona o Objeto dentro do array
        salvalLocalStorage(); // Função para Salvar no LocalStorage
        adicionarTarefaNoDOM(tarefaObj); // Função para Adicionar tarefa no DOM

        tarefa.value = ""; // Limpa o campo de adição da tarefa
        tarefa.focus(); // Coloca o cursos novamente sobre a caixa de titulo, para que uma proxima tarefa possa ser registrada
    }
}

function adicionarTarefaNoDOM(tarefa) { // Função que adiciona as tareas ao DOM
    const todo_list = document.getElementById("todo-list"); // Coleta o elemento do DOM aonde as tarefas serão mostradas

    var div = document.createElement("div"); // Cria o elemento div da tarefa
    div.setAttribute("class", "todo-tarefas"); // Seta os atributos para que todas as divs fiquem no mesmo padrão
    div.setAttribute("data-id", tarefa.id); // Armazena o ID para referência futura

    var h3 = document.createElement("h3"); // Cria o titulo da tarefa
    h3.innerHTML = tarefa.nome; // Insere o nome Informado na tarefa
    if (tarefa.completada) { // Verifica se a tarefa esta completada
        h3.style.textDecoration = "line-through";
    }
        
    div.appendChild(h3); // Adiciona o elemento h3 a div da tarefa

    // Insere os Botões:
    insereBotoes("close", "cancel", div);
    insereBotoes("edit_square", "edit", div);
    insereBotoes("check", "confirm", div);
    
    todo_list.appendChild(div); // Adiciona a nova tarefa á lista de tarefas
}

function insereBotoes(simbolo, tipo, div) { // Função para inserir os Botões
    const span = document.createElement("span"); // Criando o elemento "span", para declarar o simbolo
    span.setAttribute("class", "material-symbols-outlined");

    const btn = document.createElement("button"); // Cria o botão aonde o simbolo será colocado
    btn.setAttribute("class", `btn ${tipo}`);

    span.innerHTML = simbolo; // Insere o simbolo no span
    div.appendChild(btn); // Insere o botão na div da tarefa
    btn.append(span); // Insere o span no botão
}

// Variaveis para trazer os dados para um escopo global
var titulo;
var taskId;

document.addEventListener("DOMContentLoaded", function() {
    carregarLocalStorage();

    var todoList = document.getElementById("todo-list"); // Coleta o local aonde as tarefas são mostradas
    
    // Delegação de eventos: ouve todos os cliques no contêiner `todo-list`
    todoList.addEventListener("click", function(event) {

            var task = event.target.closest(".todo-tarefas"); // Verifica qual tarefa foi clicada
            var tarefaId = parseInt(task.getAttribute("data-id")); // Extrai o ID da tarefa clicada
            var tarefaIndex = tarefas.findIndex(t => t.id === tarefaId); // Extrai index da tarefa clicada

        if (event.target.closest(".confirm")) {  // Verifica se foi clicado um botão de "check"
            var h3 = task.querySelector("h3"); // Coleta o h3 para a manipulação

            // Verifica se o h3 ja esta riscado ou nao
            if (h3.style.textDecoration === "line-through") { 
                h3.style.textDecoration = "none";
                tarefas[tarefaIndex].completada = false;
                salvalLocalStorage(); // Salva as alterações no LocalStorage
            } else {
                h3.style.textDecoration = "line-through";
                tarefas[tarefaIndex].completada = true;
                salvalLocalStorage(); // Salva as alterações no LocalStorage
            }

        } else if (event.target.closest(".cancel")) {
            tarefas.splice(tarefaIndex, 1); // Remove a tarefa clicada do array de tarefas
            salvalLocalStorage(); // Salva as alterações no LocalStorage
            task.remove(); // Remove a div tarefa
            
        } else if (event.target.closest(".edit")) { 
            h3 = task.querySelector("h3"); // Coleta o h3 para a manipulação

            taskId = tarefaIndex; // Passando o ID da tarefa para o escopo Global
            titulo = h3; // Passando o Titulo da tarefa para o escopo Global

            // Muda o display para o modo de edição
            document.getElementById("todo-list").style.display = "none";
            document.getElementById("todo-add").style.display = "none";
            document.getElementById("todo-edit").style.display = "block";
        }
    });
});

var tarefaEditando = null;

function cancelarEdit() { // Função que cancela a edição da tarefa
    // Muda o display para o modo de adição
    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
}

function editar() { // Função para editar o nome das tarefas
    var input = document.getElementById("edit").value.trim(); // Coleta o novo nome da tarefa
    if (input.length === 0) { // Verifica se o nome não esta vazio
        window.alert("O nome da tarefa não pode estar vazio.");
        return;
    }

    // Troca o nome da tarefa
    tarefas[taskId].nome = input; // Troca o nome da tarefa no array de tarefas 
    salvalLocalStorage(); // Salva as modificações no LocalStorage
    titulo.innerHTML = input; // Troca o nome da tarefa para o novo nome

    // Muda o display para o modo de adição
    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
    tarefaEditando = null;
}
