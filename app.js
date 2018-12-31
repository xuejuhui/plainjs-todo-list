document.addEventListener("DOMContentLoaded", function() {


    //Todo Class
    class Todo {
        constructor(title, description, id){
            this.title = title,
            this.description = description,
            this.id = id
        }
    }
    //Storage Class
    class Storage {
        static getTodo (){
            let toDoList
            if(localStorage.getItem('toDoList') === null ){
                toDoList = []
            }else {
                toDoList = JSON.parse(localStorage.getItem('toDoList'))
            }
            return toDoList 
        }
        static addTodo (todo){
            let items = Storage.getTodo()
            items.push(todo)
            localStorage.setItem('toDoList',JSON.stringify(items))
        }
        static removeTodo (id){
            let items = Storage.getTodo()
            let newItems = items.filter((item)=> item.id!=(id));
            localStorage.setItem('toDoList',JSON.stringify(newItems))     
        }
    }
    // UI Class 
    class UI {
        static displayTodo (){
            let items = Storage.getTodo()
            items.forEach((todo)=> UI.addToTodoList(todo))
        }
        static addToTodoList(todo){
            let toDoListDom = document.querySelector('.todos-list')
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.id}</td>
            <td><a href='#' class='delete'>X</a></td>
            `
            toDoListDom.appendChild(row)
        }
        static deleteTodo(e){
            if(e.className=='delete'){
                e.parentElement.parentElement.remove()
            }
        }
    }
    // Event Display Todo
    UI.displayTodo()
    // Event Add todo
    let toDoForm = document.querySelector('#todo-form')
    toDoForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let id = document.querySelector('#todo-id').value * (Math.random() * (1000 - 0) + 0 )
        // console.log(id)
        // if(id==NaN){
        //     console.log('hi')
        //     id = Math.random() * (Math.random() * (1000 - 0) + 0 )
        // }

        let todo = new Todo(title, description, id) 
        UI.addToTodoList(todo)
        Storage.addTodo(todo)
    })
    // Event Delete todo
    let toDoListDom = document.querySelector('.todos-list')
    toDoListDom.addEventListener('click',(e)=>{
        UI.deleteTodo(e.target)
        Storage.removeTodo(e.target.parentElement.previousElementSibling.textContent)
    })
});