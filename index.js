let isAddList = document.getElementById("add-btn")
let addList = document.getElementById("add-input")
let sendBtn = document.getElementById("btn-send")
let inputTxt = document.getElementById("input-txt")
let list1 = document.getElementById("todolists")
let list2 = document.getElementById("donelists")
let lists = document.getElementsByClassName("list")

// hepler function
function generateUUID() {
    const hexDigits = '0123456789abcdef';
    let uuid = '';
  
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        uuid += '4';
      } else {
        uuid += hexDigits[Math.floor(Math.random() * 16)];
      }
    }
    return uuid;
}
 
function renderTodoList(){
    var currentList = JSON.parse(localStorage.getItem('todoList'))
    var tmp = ""
    var n =  0
    n = currentList !== null ? currentList.length : 0
    for(let i =0; i<n; i++){
      var msg = localStorage.getItem(currentList[i])
      tmp += `<li id=${currentList[i]} draggable="true" class="list">` + msg + "</li>"
    }
    list1.innerHTML = tmp
    lists = document.getElementsByClassName("list")
}

function renderDoneList(){
  var currentList = JSON.parse(localStorage.getItem('doneDustedList'))
  var tmp = ""
  var n =  0
  n = currentList !== null ? currentList.length : 0
  for(let i =0; i<n; i++){
    var msg = localStorage.getItem(currentList[i])
    tmp += `<li id=${currentList[i]} draggable="true" class="list">` + msg + "</li>"
  }
  list2.innerHTML = tmp
  lists = document.getElementsByClassName("list")
}

function handleInput(){
    addList.style = "display: grid;"
    isAddList.style = "display: none;"
}

function handleAddList() {
    var value = inputTxt.value
    var msgId = generateUUID()

    localStorage.setItem(msgId, value)
    var currentList = JSON.parse(localStorage.getItem('todoList'))
    
    if (!currentList) {
      currentList = []
    }
    currentList.push(msgId)
    localStorage.setItem('todoList', JSON.stringify(currentList))
    renderTodoList()
}


function render(){
  renderTodoList()
  renderDoneList()
}

render()

for(lst of lists){
  lst.addEventListener("dragstart", (e)=>{
    let selected = e.target

    list2.addEventListener("dragover", (e)=>{
      e.preventDefault()
    })

    list2.addEventListener("drop", (e)=>{
      e.preventDefault()
      if(selected){
        list2.appendChild(selected)
        var id = selected.getAttribute('id')
        var currentTodoList = JSON.parse(localStorage.getItem('todoList'))
        var currentList = JSON.parse(localStorage.getItem(('doneDustedList')))

        if(!currentTodoList){
          currentTodoList = []
        }

        currentTodoList = currentTodoList.filter((item) => item !== id);

        if(!currentList){
          currentList = []
        }
        currentList.push(id)
        localStorage.setItem('doneDustedList', JSON.stringify(currentList))
        localStorage.setItem('todoList', JSON.stringify(currentTodoList))
        selected = null
      }
    })

  })
}

for(lst of lists){
  lst.addEventListener("dragstart", (e)=>{
    let selected = e.target

    list1.addEventListener("dragover", (e)=>{
      e.preventDefault()
    })

    list1.addEventListener("drop", (e)=>{
      e.preventDefault()
      if(selected){
        list1.appendChild(selected)
        var id = selected.getAttribute('id')
        var currentTodoList = JSON.parse(localStorage.getItem('todoList'))
        var currentList = JSON.parse(localStorage.getItem(('doneDustedList')))

        console.log(id, currentList, currentTodoList)

        if(!currentTodoList){
          currentTodoList = []
        }

        if(!currentList){
          currentList = []
        }

        currentList = currentList.filter((item) => item !== id);

        currentTodoList.push(id)
        localStorage.setItem('doneDustedList', JSON.stringify(currentList))
        localStorage.setItem('todoList', JSON.stringify(currentTodoList))
        selected = null
      }
    })
  })
}

isAddList.addEventListener("click", handleInput)

sendBtn.addEventListener("click", handleAddList)
