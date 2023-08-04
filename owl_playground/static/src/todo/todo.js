/** @odoo-module **/

import { Component } from "@odoo/owl";

export  class Todo extends Component {
    static template = "owl_playground.todo";
     
    onClick(ev){
        this.props.toggleDone(this.props.id);
    }

    onRemoveTodo(){
        this.props.removeTodo(this.props.id);
    }

}    
Todo.props = {
        id : Number,
        description : String,
        done : Boolean,
        toggleDone : Function,
        removeTodo : Function,
};
