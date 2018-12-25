document.addEventListener("DOMContentLoaded", function() {


    //Todo Class
    class Todo {
        constructor(title, description, id){
            this.title = title,
            this.description = description,
            this.id = id
        }
    }
    // UI Class 
    class UI {
        static displayTodo (){
            let todoList = [{title:'sss',description:'aaa',id:1},{title:'eee',description:'fff',id:2}]
            todoList.forEach((todo)=> UI.addToTodoList(todo))
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
        let id = document.querySelector('#todo-id').value
        let todo = new Todo(title, description, id) 
        UI.addToTodoList(todo)
    })
    // Event Delete todo
    let toDoListDom = document.querySelector('.todos-list')
    toDoListDom.addEventListener('click',(e)=>{
        UI.deleteTodo(e.target)
    })
});