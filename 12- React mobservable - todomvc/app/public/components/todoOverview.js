import React from 'react';
import {observer} from 'mobservable-react';
import * as ViewModel from '../stores/viewModel';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoModel, viewModel} = this.props;
		if (todoModel.todos.length === 0)
			return null;
		return ( <section className="main">
			 <input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoModel.activeTodoCount === 0}
			/>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewModel={viewModel}
					/>)
				)}
			</ul>
		</section>)
	}

	getVisibleTodos() {
		let todos = this.props.todoModel.todos
		let last = todos[todos.length -1]

		return todos.filter(todo => {
			switch (this.props.viewModel.todoFilter) {
				case ViewModel.ACTIVE_TODOS:
					return !todo.completed;
				case ViewModel.COMPLETED_TODOS:
					return todo.completed;
				case ViewModel.LAST_TODOS:
					return todo == last;
				default:
					return true;
			}
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoModel.toggleAll(checked);
	}
}


TodoOverview.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}
