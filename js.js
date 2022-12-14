// var dataListTodo = JSON.parse(localStorage.getItem("listTodos"));

// function rederListDataTodos(addlist) {
//   // let valueInput = document.getElementById("input_value").value;
//   // if (dataListTodo == null) {
//   //     let dataList = [];
//   //     dataList.push(valueInput);
//   //     localStorage.setItem("listTodos",JSON.stringify(dataList));
//   // } else {
//   //     dataList.push(valueInput);
//   //     localStorage.setItem("listTodos",JSON.stringify(dataList))
//   // }
//   let data = "";
//   for (let i = 0; i < addlist.length; i++) {
//     data += `
//         <tr>
//           <td>${i + 1}</td>
//           <td>${addlist[i]}</td>
//           <td>In progress</td>
//           <td>
//             <button class="edit-button" onclick="editItem(${i})">EDIT</button
//             ><button class="delete-button" onclick="deleteItem(${i})">DELETE</button
//             ><button class="finished-button">FiNISHED</button>
//           </td>
//         </tr>
//         `;
//   }
//   document.getElementById("push").innerHTML = data;
// }
// rederListDataTodos(dataListTodo);
// function add_save() {
//   let valueInput = document.getElementById("input_value");
//   // console.log(valueInput.value);
//   let dataAdd = JSON.parse(localStorage.getItem("listTodos"));
//   let keyId = JSON.parse(localStorage.getItem("keyid"))
//   // edit
//   if(keyId != null) {
//     dataAdd.splice(keyId,1,valueInput.value)
//     // rederListDataTodos(dataAdd);
//     localStorage.setItem("listTodos",JSON.stringify(dataAdd));
//     localStorage.removeItem("keyid")
//     rederListDataTodos(dataAdd);
//     document.getElementById("addSave").innerHTML = "SAVE"
//     valueInput.value = '';
//     return;
//   }

//   if (dataAdd == null) {
//     dataAdd = [];
//     // dataAdd.push(valueInput.value);
//     localStorage.setItem("listTodos", JSON.stringify(dataAdd));
//     // valueInput.value = "";
//   } else {
//     dataAdd.push(valueInput.value);
//     localStorage.setItem("listTodos", JSON.stringify(dataAdd));
//     // valueInput.value = "";
//   }
//   valueInput.value = "";
//   rederListDataTodos(dataAdd);
// }

// function deleteItem(id) {
//   // console.log("id",id);
//   let dataDelete = JSON.parse(localStorage.getItem("listTodos"));
//   dataDelete.splice(id, 1);
//   localStorage.setItem("listTodos", JSON.stringify(dataDelete));
//   rederListDataTodos(dataDelete);
// }

// function editItem(id) {
//   // console.log("id",id);
//     dataEdit = JSON.parse(localStorage.getItem("listTodos"));
//   document.getElementById("input_value").value = dataEdit[id];
//   document.getElementById("addSave").innerHTML = "Edit";
//   localStorage.setItem("keyid",JSON.stringify(id))

// }

var listProduct = JSON.parse(localStorage.getItem("list"));
// lưu lên local
function add_save() {
  let valueInput = document.getElementById("input_value");
  let listLocal = JSON.parse(localStorage.getItem("list"));
  let keyEdit = JSON.parse(localStorage.getItem("keyEdit"));
  if (keyEdit != null) {
    if (valueInput.value == "") {
      let error = document.getElementById("error");
      error.style.display = "block";
    } else {
      let obj = {
        todoItem: valueInput.value,
        statusItem: "In progress",
      };
      listLocal.splice(keyEdit, 1, obj);
      localStorage.setItem("list", JSON.stringify(listLocal));
      renderList(listLocal);
      localStorage.removeItem("keyEdit");
      document.getElementById("addSave").innerHTML = "SAVE"
      error.style.display = "none";
      valueInput.value = "";
      return;
    }
  }

  if (listLocal == null) {
    listLocal = [];
    if (valueInput.value == "") {
      let error = document.getElementById("error");
      error.style.display = "block";
    } else {
      let obj = {
        todoItem: valueInput.value,
        statusItem: "In progress",
      };
      listLocal.push(obj);
      localStorage.setItem("list", JSON.stringify(listLocal));
      let error = document.getElementById("error");
      error.style.display = "none";
    }
  } else {
    if (valueInput.value != "") {
      let obj = {
        todoItem: valueInput.value,
        statusItem: "In progress",
      };
      listLocal.push(obj);
      localStorage.setItem("list", JSON.stringify(listLocal));
      let error = document.getElementById("error");
      error.style.display = "none";
    } else {
      let error = document.getElementById("error");
      error.style.display = "block";
    }
  }
  // console.log(listLocal);
  valueInput.value = ""
  renderList(listLocal);
}

function renderList(list) {
  let data = "";
  for (let i = 0; i < list.length; i++) {
    data += `
     <tr>
          <td>${i + 1}</td>
          <td>${list[i].todoItem}</td>
          <td>${list[i].statusItem}</td>
          <td>
            <button class="edit-button" onclick="edit_item(${i})">EDIT</button
            ><button class="delete-button" onclick ="delete_item(${i})">DELETE</button
            ><button class="finished-button" onclick ="finished_item(${i})" >FiNISHED</button>
          </td>
        </tr>
    `;
  }

  document.getElementById("push").innerHTML = data;
}
renderList(listProduct);

function delete_item(id) {
  // console.log(id);
  let deleteItem = JSON.parse(localStorage.getItem("list"));
  // console.log(deleteItem);
  deleteItem.splice(id, 1);
  console.log(deleteItem);
  localStorage.setItem("list", JSON.stringify(deleteItem));
  renderList(deleteItem);
}

function edit_item(id) {
  let editItem = JSON.parse(localStorage.getItem("list"));
  // console.log(editItem);
  document.getElementById("input_value").value = editItem[id].todoItem;
  document.getElementById("addSave").innerHTML = "EDIT";
  localStorage.setItem("keyEdit", JSON.stringify(id));
}

let countFinishedItem = 0;
function finished_item(id) {
  // console.log(id);
  let finishedItem = JSON.parse(localStorage.getItem("list"))
  console.log(finishedItem[id].statusItem);
  countFinishedItem++;
  finishedItem[id].statusItem = "ok!"
  if(countFinishedItem == 2) {
    finishedItem[id].statusItem = "In progress"
    countFinishedItem = 0;
  }
  localStorage.setItem("list",JSON.stringify(finishedItem));
  renderList(finishedItem);
}


function search_item() {
  let list = []
  let value_input = document.getElementById("search").value.toUpperCase();
  let getLocal = JSON.parse(localStorage.getItem("list"))
  // console.log(getLocal);
  for (let i = 0; i < getLocal.length; i++) {
    if(getLocal[i].todoItem.toUpperCase().indexOf(value_input) != -1) {
      list.push(getLocal[i])
    } 
  }
  localStorage.setItem("search", JSON.stringify(list))
  // console.log(list);
  renderList(list)

}