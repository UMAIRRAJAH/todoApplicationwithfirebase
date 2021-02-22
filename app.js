var list = document.getElementById("list_of_todos");

// console.log(firebase);

firebase.database().ref('todos').on('child_added', function (data){
      // console.log(data.val());
      var li = document.createElement("li");
      var liText = document.createTextNode(data.val().value);
      li.appendChild(liText);

      // edit buttton
      var editBtn = document.createElement("button");
      var editBtnText = document.createTextNode("Edit Todo")
      editBtn.appendChild(editBtnText)
      editBtn.setAttribute("class", "edt_btn");
      editBtn.setAttribute('id',data.val().key)
      editBtn.setAttribute("onclick","editTodo(this)");
      li.appendChild(editBtn)

      // delete button
      var delTodo = document.createElement("button");
      var delTodoText = document.createTextNode("Delete Todo")
      delTodo.appendChild(delTodoText);
      delTodo.setAttribute("class","delTodoBtn");
      delTodo.setAttribute('id',data.val().key);
      delTodo.setAttribute("onclick","dellTodo(this)");
      li.appendChild(delTodo);

      list.appendChild(li);
})

function addTodo() {
      var tododata = document.getElementById("todo_data");

      var dataBase = firebase.database().ref('todos');
      var key = dataBase.push().key;

      var todoObj = {
            value: tododata.value,
            key: key

      }

      dataBase.child(key).set(todoObj)

      // console.log(keys);



      tododata.value = ""
}




function editTodo(e){
      
      console.log(e.id)
      var editYourTodo = prompt("Enter Edited Task",e.parentNode.firstChild.nodeValue)
      var editedTodo = {
            value: editYourTodo,
            key : e.id
      }
      firebase.database().ref('todos').child(e.id).set(editedTodo);
      // console.log(editedTodo)
      e.parentNode.firstChild.nodeValue = editYourTodo;
}

function dellTodo(e){
      // console.log(e.id)
      firebase.database().ref('todos').child(e.id).remove()
      e.parentNode.remove ();
}


function deleteAll() {
      list.innerHTML =""
}