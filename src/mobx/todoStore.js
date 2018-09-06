
import { decorate, observable} from 'mobx';
import { observer } from 'mobx-react';

class TodoStore {
	todos = [];

	get completedTodosCount() {
    return this.todos.filter(
			todo => todo.completed === true
		).length;
  }

	report() {
		if (this.todos.length === 0)
    {
      return "<none>";
    }
		return `Next todo: "${this.todos[0].task}". ` +
			     `Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

  addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
      assignee: null,
		});
	}
}

decorate(TodoStore, {
  todos: observable,
});

const todoStore = new TodoStore();

function setup() {

  todoStore.addTodo("read MobX tutorial");
  console.log(todoStore.report());

  todoStore.addTodo("try MobX");
  console.log(todoStore.report());

  todoStore.todos[0].completed = true;
  console.log(todoStore.report());

  todoStore.todos[1].task = "try MobX in own project";
  console.log(todoStore.report());

  todoStore.todos[0].task = "grok MobX tutorial";
  console.log(todoStore.report());
    
}

setup();

export default todoStore;
