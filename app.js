var list = document.getElementById('list');
firebase.database().ref('todos').on('child_added',function(data){
var li = document.createElement('li');
var liText = document.createTextNode(data.val().value)
li.appendChild(liText);
/* if (item.value === "") {
alert("Please Write!");
}
else{
list.appendChild(li);
var deleteall = document.getElementById('deleteall');
deleteall.style.display ='block'
}
item.value = ""*/
// edit btn
var editbtn = document.createElement('button');
var editText = document.createTextNode("Edit");
editbtn.appendChild(editText);
editbtn.setAttribute('id',data.val().key)
editbtn.setAttribute('onclick', "editItem(this)")
editbtn.className = 'editbtn'
li.appendChild(editbtn)
//delete btn
var deletebtn = document.createElement('button');
var deleteText = document.createTextNode("Delete");
deletebtn.setAttribute('id',data.val().key)
deletebtn.setAttribute('onclick', "deleteItem(this)")
deletebtn.appendChild(deleteText);
deletebtn.className = 'delbtn'
li.appendChild(deletebtn)
list.appendChild(li)
})

function addItem() {
var item = document.getElementById('todo-item');
var database = firebase.database().ref('todos')
var key = database.push().key;
var todo = {
value: item.value,
key: key
}
database.child(key).set(todo)
item.value = ""
}

function deleteItem(e) {
firebase.database().ref('todos').child(e.id).remove()
e.parentNode.remove()
}
function editItem(e) {
var val = prompt("Enter new value",e.parentNode.firstChild.nodeValue);
var editTodo = {
value: val,
key: e.id
}
firebase.database().ref('todos').child(e.id).set(editTodo)
e.parentNode.firstChild.nodeValue = val;
}
function delAll() {
firebase.database().ref('todos').remove();
list.innerHTML = ""
var deleteall = document.getElementById('deleteall');
deleteall.style.display = 'none'
}