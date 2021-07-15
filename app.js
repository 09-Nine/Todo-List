const temp = $(".todo").clone()[0];


$("#adding button").click(() => {
    let value = $("#adding input").val();
    addTodo(value);
    save();
});
$("#container").on("click", ".del", removeTodo);
$("#container").on("click", ".edit", changeTodo);

function addTodo(value) {
    if (value) {
        const contain = $("#container");
        const todo = $(temp).clone();
        $(todo).children("h2").text(value);
        contain.append(todo);
        $("#adding input").val("");
    }
}

function removeTodo() {
    $(this).parent().parent().remove();
    save();
}

function changeTodo(){
    $("button").prop('disabled', true); // Disable all the buttons
    $("input").prop('disabled', true);
    const contain = $(this).parent().parent();
    textPast = contain.children("h2").text();
    contain.children("h2").remove();
    contain.prepend($("<div>", {"class" : "changeTodo"}));
    $(".changeTodo").append($("<input>").val(textPast));
    $(".changeTodo").append($("<button>").text("ADD"));
    $(".changeTodo input").focus();
    $("#container").on("click", ".changeTodo button", function(){
        let value = $(".changeTodo input").val();
        const parent = $(this).parent().parent();
        $(this).parent().remove();
        parent.prepend($("<h2>").text(value));
        $("button").prop('disabled', false); // Enable all the button
        $("input").prop('disabled', false);
    });
    save();
}

function save(){
    const data = [];
    for (let i of $("h2")){
        // data[$("h2").index(i)] = $(i).text();
        data.push($(i).text());
    }
    localStorage.setItem("data", JSON.stringify(data));
}

function load(){
    const data = JSON.parse(localStorage.getItem("data"));
    $(".todo").remove();
    for (let h of data){
        addTodo(h);
    }
}

window.onload = load;