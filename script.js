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
        const tarefaObj = {
            id: Date.now(), // ID único baseado no timestap
            nome: nome_tarefa,
            completada: false
        }

        tarefas.push(tarefaObj);
        salvalLocalStorage();
        adicionarTarefaNoDOM(tarefaObj);

        tarefa.value = ""; // Limpa o campo de adição da tarefa
        tarefa.focus(); // Coloca o cursos novamente sobre a caixa de titulo, para que uma proxima tarefa possa ser registrada
    }
}

function adicionarTarefaNoDOM(tarefa) {
    const todo_list = document.getElementById("todo-list");

    var div = document.createElement("div"); // Cria o elemento div da tarefa
    div.setAttribute("class", "todo-tarefas"); // Seta os atributos para que todas as divs fiquem no mesmo padrão
    div.setAttribute("data-id", tarefa.id); // Armazena o ID para referência futura

    var h3 = document.createElement("h3"); // Cria o titulo da tarefa
    h3.innerHTML = tarefa.nome; // Insere o nome Informado na tarefa
    if (tarefa.completada) {
        h3.style.textDecoration = "line-through";
    }
        
    div.appendChild(h3); // Adiciona o elemento h3 a div da tarefa
    
    // Insere os Botoes:
    for (var c = 1; c <= 3; c++) { 
        var span = document.createElement("span"); // Declara um span a cada looping para cada botao
        var btn = document.createElement("button"); // Declara um botao a cada looping para cada botao
        
        btn.setAttribute("class", "btn"); // Seta a classe do botao, para os estilos css
        span.setAttribute("class", "material-symbols-outlined"); // Seta a classe do span, para podermos usar os icones
        
        if (c == 1) {
            span.innerHTML = "close"; // Icone de X
            btn.setAttribute("class", "btn cancel");
        } else if (c == 2) {
            span.innerHTML = "edit_square"; // Icone de edição
            btn.setAttribute("class", "btn edit")
        } else if (c == 3) {
            span.innerHTML = "check"; // Icone de check
            btn.setAttribute("class", "btn confirm");
        }
        
        div.appendChild(btn); // Adiciona um novo botao a cada ciclo; 
        btn.append(span); // Adiciona o icone no botao a cada ciclo;
    }
    todo_list.appendChild(div); // Adiciona a nova tarefa á lista de tarefas
}

var titulo;
var taskId;

document.addEventListener("DOMContentLoaded", function() {
    carregarLocalStorage();

    var todoList = document.getElementById("todo-list");
    
    // Delegação de eventos: ouve todos os cliques no contêiner `todo-list`
    todoList.addEventListener("click", function(event) {

            var task = event.target.closest(".todo-tarefas");
            var tarefaId = parseInt(task.getAttribute("data-id"));
            var tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);

        if (event.target.closest(".confirm")) {  // Verifica se foi clicado um botão de "check"
            var h3 = task.querySelector("h3"); // Coleta o h3 para a manipulação

            if (h3.style.textDecoration === "line-through") { // Verifica se o h3 ja esta riscado ou nao
                h3.style.textDecoration = "none";
                tarefas[tarefaIndex].completada = false;
                salvalLocalStorage();
            } else {
                h3.style.textDecoration = "line-through";
                tarefas[tarefaIndex].completada = true;
                salvalLocalStorage();
            }

        } else if (event.target.closest(".cancel")) {
            tarefas.splice(tarefaIndex, 1);
            salvalLocalStorage();
            task.remove(); // remove a div tarefa
            
        } else if (event.target.closest(".edit")) { 
            h3 = task.querySelector("h3"); // Coleta o h3 para a manipulação

            taskId = tarefaIndex;
            titulo = h3;

            document.getElementById("todo-list").style.display = "none";
            document.getElementById("todo-add").style.display = "none";
            document.getElementById("todo-edit").style.display = "block";

        }
    });
});

var tarefaEditando = null;

function cancelarEdit() {
    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
}

function editar() {
    var input = document.getElementById("edit").value.trim();
    if (input.length === 0) {
        window.alert("O nome da tarefa não pode estar vazio.");
        return;
    }

    tarefas[taskId].nome = input;
    salvalLocalStorage();
    titulo.innerHTML = input;

    document.getElementById("todo-list").style.display = "block";
    document.getElementById("todo-add").style.display = "block";
    document.getElementById("todo-edit").style.display = "none";
    tarefaEditando = null;
    
}
