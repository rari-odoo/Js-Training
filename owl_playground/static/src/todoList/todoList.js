/** @odoo-module */

import { Component , useState} from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    static template = "owl_playground.todoList";
 
    setup(){
      //   this.todoList = useState([ 
      //   { id: 1, description: "Buy milk", done: false},
      //   { id: 2, description: "Buy eggs", done: true},
      //   { id: 3, description: "Buy avocado", done: true},
      // ]);
      // this.todos = useState([])
      this.nextId = 1;
      this.todoList = useState([]);
      useAutofocus("InputTodos");
    }

    addTodo(ev){

      if (ev.keyCode === 13 && ev.target.value != ''){
          this.todoList.push({ id:this.nextId++, description : ev.target.value , done:false});
          ev.target.value ='';
      }
  }

   toggleDone(todoId){
    console.log(todoId);
      const todo = this.todoList.find((todo) => todo.id === todoId );
      if(todo){
        todo.done = !todo.done;
    } 
   }

   removeTodo(todoId){
     const todoIndex = this.todoList.findIndex((todo) => todo.id === todoId);
     if(todoIndex >= 0){
      //remove the element at index from todolist
        this.todoList.splice(todoIndex, 1);
     }
   }
}
TodoList.components = { Todo };