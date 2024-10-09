function adicionar() {
    var nome_tarefa = document.getElementById("tarefa").value; // Coleta o Nome da Tarefa
    var tarefa = document.getElementById("tarefa"); // Coleta a caixa de entrada Tarefa
    var todo_list = document.getElementById("todo-list"); // Coleta a div aonde as tarefas sao mostradas

    if (nome_tarefa.length == 0) { // Verificação para que o nome da tarefa não fique vazio
        window.alert("Nome Inexistente! Tente Novamente."); 
    } else {
        // Insere a div e o Titulo:
        var div = document.createElement("div"); // Cria o elemento div da tarefa
        var h3 = document.createElement("h3"); // Cria o titulo da tarefa

        div.setAttribute("class", "todo-tarefas"); // Seta os atributos para que todas as divs fiquem no mesmo padrão
        h3.setAttribute("class", "");
        todo_list.append(div); // Adiciona a nova tarefa á lista de tarefas
        div.append(h3); // Adiciona o elemento h3 a div da tarefa
        h3.innerHTML = nome_tarefa; // Insere o nome Informado na tarefa

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

        tarefa.value = ""; // Limpa o campo de adição da tarefa
        tarefa.focus(); // Coloca o cursos novamente sobre a caixa de titulo, para que uma proxima tarefa possa ser registrada

    }
}

document.addEventListener("DOMContentLoaded", function() {
    var todoList = document.getElementById("todo-list");

    // Delegação de eventos: ouve todos os cliques no contêiner `todo-list`
    todoList.addEventListener("click", function(event) {
        if (event.target.closest(".confirm")) {  // Verifica se foi clicado um botão de "check"
            var task = event.target.closest(".todo-tarefas").querySelector("h3"); // Coleta o h3 para a manipulação

            if (task.style.textDecoration === "line-through") { // Verifica se o h3 ja esta riscado ou nao
                task.style.textDecoration = "none";
            } else {
                task.style.textDecoration = "line-through";
            }
        } else if (event.target.closest(".cancel")) {
            task = event.target.closest(".todo-tarefas").querySelector("h3"); // Coleta o h3 para a manipulação
            var div = task.parentNode;
            div.remove(); // remove a div tarefa

        } else if (event.target.closest(".edit")) { 
            task = event.target.closest(".todo-tarefas").querySelector("h3"); // Coleta o h3 para a manipulação
            titulo = task;
            var todo_list = document.getElementById("todo-list");
            var todo_add = document.getElementById("todo-add");
            var todo_edit = document.getElementById("todo-edit");

            todo_list.style.display = "none";
            todo_add.style.display = "none"; // Troca o menu de tarefas, para o menu de edição
            todo_edit.style.display = "block";

        }
    });
});

function cancelarEdit() {
    var todo_list = document.getElementById("todo-list");
    var todo_add = document.getElementById("todo-add");
    var todo_edit = document.getElementById("todo-edit");

    todo_list.style.display = "block";
    todo_add.style.display = "block";
    todo_edit.style.display = "none";
}

var titulo;

function editar() {
    var input = document.getElementById("edit").value;
    titulo.innerHTML = input;

    var todo_list = document.getElementById("todo-list");
    var todo_add = document.getElementById("todo-add");
    var todo_edit = document.getElementById("todo-edit");

    todo_list.style.display = "block";
    todo_add.style.display = "block";
    todo_edit.style.display = "none";
}