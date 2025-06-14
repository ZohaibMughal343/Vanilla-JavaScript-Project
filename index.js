// debugger;
document.getElementById('Add-form').style.display = "block";
document.getElementById('Edit-form').style.display = "none";
function localArray() {
    let key = localStorage.getItem("key");
    if (key) {
        return JSON.parse(key);
    } else {
        return [];
    }
}
let id_array = localArray();
let temp = id_array.pop();
var id = temp.id;

function add() {
    let arr = localArray();
    let input = document.getElementById('name').value;
    if (id == null) {
        id = -1;
    }
    if (input != '') {
        var Id_obj = ++id;
        temp = Id_obj;
    }
    let name = { id: Id_obj, name: input };
    if (input == '') {
        alertCall("Please Enter Value", "alert alert-danger");
    } else {
        alertCall("Item Add To The List", "alert alert-success");
        arr.push(name);
        localStorage.setItem("key", JSON.stringify(arr));
        display();
    }
}
document.getElementById('Add-form').style.display = "none";
document.getElementById('Edit-form').style.display = "block";
function display() {
    let textElement = document.getElementById('text');
    textElement.innerHTML = "";                                  //------ Very Conceptual point ----------
    let arrayToDisplay = JSON.parse(localStorage.getItem("key"));
    arrayToDisplay.forEach((value, index) => {
        let elements = `<li class='text-muted' id = '${value.id}'>${value.name}<i class="fas fa-edit" onclick="Edit(${index})"></i><i class="fa-solid fa-trash" onclick="Delete(${index})"></i></li>`
        let newElement = document.createElement(`ul`);
        newElement.innerHTML = elements;
        textElement.appendChild(newElement);
    });
    document.getElementById('Add-form').style.display = "block";
    document.getElementById('Edit-form').style.display = "none";
}
display();



function Delete(index) {
    alertCall("Item Removed", "alert alert-danger");
    let arrayToDelete = JSON.parse(localStorage.getItem("key"));
    arrayToDelete.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(arrayToDelete));
    display();
}


var updateIndex;
function Edit(index) {
    document.getElementById('Add-form').style.display = "none";
    document.getElementById('Edit-form').style.display = "block";
    let arrayToEdit = JSON.parse(localStorage.getItem("key"));
    document.getElementById("rename").value = arrayToEdit[index].name;
    updateIndex = index;
}
function update() {
    let input = document.getElementById('rename').value;
    let arrayToEdit = JSON.parse(localStorage.getItem("key"));
    if (input == '') {
        alertCall("Please Enter Update Value", "alert alert-danger");
    } else {
        arrayToEdit[updateIndex].name = input;
        alertCall("Item Updated", "alert alert-success");
        localStorage.setItem("key", JSON.stringify(arrayToEdit));
        display();
    }
}

function listClean() {
    localStorage.clear();
    alertCall("List Cleaned Successfully","alert alert-success");
    display();
}

function alertCall(Text, Class) {
    setTimeout(() => {
        document.querySelector('.alert').className = `${Class}`;
        document.querySelector('.alert').innerHTML = `${Text}`;
    }, 100);
    setTimeout(function () {
        document.querySelector('.alert').className = 'alert'
        document.querySelector('.alert').innerHTML = ""
    }, 1000);
    document.getElementById('name').value = '';
} 