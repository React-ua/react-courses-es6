# A complete example of react application : todos mvc
An example of React application contributed by Mohamed JEBLI. In this tutorial, we are going to create a simple app to manage a todo list.
This demo uses a simple LocalStorage adapter to persist React models within your browser.


# Stores
Create two stores instances. One `viewModel` for the ui state and the other `todoModel` for the domain state.
```
// Enable the dev tools:
import 'mobservable-react-devtools';

var todoModel = new TodoModel('mobservable-react-todomvc');
var viewModel = new ViewModel();
```

## Domain objects : Todo Model
Each domain object should be expressed using its own class (or constructor function).
Define the model for our Todos. We’ll keep this simple.
```javascript
export class Todo {
	constructor(store, id, title, completed) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	toJson() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}
// to make fromJson methods a « public static field » using  « static » keyword:
	static fromJson(store, json) {
		return new Todo(store, json.id, json.title, json.completed);
	}
}

```


That is all we want. Just the text for the todo. the …  will automatically generate an id for each todo that we create also.

## Domain Stores : todoModel store


This store all the data ours todos application is about. This single domain store is responsible for a single concept in ours application. 
the responsibility of this store is:

- Instantiate domain objects. 
- Make sure domain objects know the store they belong to.
- Make sure there is only one instance of each of your domain objects. 
- The same todo should not be twice in your memory. 
- Provide backend integration. Store data when needed.
- Update existing instances if updates are received from the backend.
- Provide a stand-alone, universal, testable component of your application.

There should be only one instance of a store.
```
export class TodoModel {
	constructor(key) {
			this.key = key;
			this.todos= [];
			this.activeTodoCount= () =>
				this.todos.reduce(
					(sum, todo) => sum + (todo.completed ? 0 : 1),
					0
				);

			this.completedCount= () => this.todos.length - this.activeTodoCount

		this.readFromLocalStorage();
		this.subscribeLocalStorageToModel();
	}

	readFromLocalStorage(model) {
		this.todos = Utils.getDataFromLocalStore(this.key).map(
			data => Todo.fromJson(this, data)
		);
	}

	subscribeLocalStorageToModel(model) {
		autorun(() =>
			Utils.storeDataToLocalStore(this.key, this.todos.map(todo => todo.toJson()))
		);
	}

	addTodo (title) {
		this.todos.push(new Todo(this, Utils.uuid(), title, false));
	}

	toggleAll (checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}
}
```

## Stores for the user interface state
The ui-state-store is often very specific for your application and very simple as well.This store typically doesn’t have much logic in it, but will store a plethora of loosely coupled pieces of information about the ui. This is ideal as most applications will change the ui state often during the development process.

Things you will typically find in ui stores:
	- Session information
	- Information about how far you applications has loaded
	- Information that will not be stored in the backend
	- Information that affects the UI globally
	- Window dimensions
	- Accessibility information
	- Current language
	- Currently active theme
User interface state as soon as it effects multiple, further unrelated components:
	- Current selection
	- Visibility of toolbars, etc..
	- State of a wizard
	- State of a global overlay

It might very well be that these pieces of information start as internal state of a specific component (for example the visibility of a toolbar). But after a while you discover that you need this information somewhere else in your application. Instead of pushing state in such a case upwards in the component tree, like you would do in plain react apps, you just move that state to the ui-state-store.

Make sure this state is a singleton. For isomorphic applications you might also want to provide a stub implementation of this store with sane defaults so that all components render as expected. You might distribute the ui-state-store through your application by passing it as property through your component tree. You can also pass this store by using context or make it globally available as a module. For testing purposes, I recommend to just pass it through the component tree.

```
export const ALL_TODOS = ‘all’;
export const ACTIVE_TODOS = ‘active’;
export const COMPLETED_TODOS = ‘completed’;

export default class ViewModel {
	constructor() {
			 this.todoBeingEdited= null;
			 this.todoFilter = ALL_TODOS;
		});
	}
}
```

## Building the View
### Introduction

React is, in my opinion, the premier way to build big, fast Web apps with JavaScript. It’s scaled very well for Facebook and Instagram.

One of the many great parts of React is how it makes you think about apps as you build them. In this exercise we will walk through the thought process of building a todos app using React.

### Start with a mock

Imagine that we already have a JSON API for todos and a mock from our designer. The mock looks like this:
![Imgur](http://i.imgur.com/QtQMrVt.png)

### Break the UI into a component hierarchy

The first thing you’ll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. But how do you know what should be its own component? Just use the same techniques for deciding if you should create a new function or object. One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing it should be decomposed into smaller subcomponents.

![](https://i.imgur.com/ADAX9du.png)

### Build a static version

Now that you have your component hierarchy it’s time to start implementing your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It’s easiest to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We’ll see why.

To build a static version of your app that renders your data model you’ll want to build components that reuse other components and pass data using `props`. `props` are a way of passing data from parent to child. If you’re familiar with the concept of `state`, `don’t use state at all` to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app you don’t need it.

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `TodoOverview`) or with the ones lower in it (`TodoItem`). In simpler examples it’s usually easier to go top-down and on larger projects it’s easier to go bottom-up and write tests as you build.

#### Build the top level component using ES6

We are using ES2015(ES6) syntax in these example. Here is what a really basic React component looks like.

```js
import React from ‘react’

export default class MyComponent extends React.Component {
	render() {
		return (
			<div>
			
			</div>
		);
	}
}
```

Let’s build top-down. Build the top level component; `TodoApp`.
```
export default class TodoApp extends React.Component {
	render() {
		const {todoModel, viewModel} = this.props;
		return (
			<div>
				<header className=« header »>
					<h1>todos</h1>
					<TodoEntry todoModel={todoModel} />
				</header>
				<TodoOverview todoModel={todoModel} viewModel={viewModel} />
				<TodoFooter todoModel={todoModel} viewModel={viewModel} />
			</div>
		);
	}

	componentDidMount() {
		// For our router
	}
}

TodoApp.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}

```
Simply refer to the React docs if you need help executing this step; `http://facebook.github.io/react/docs/getting-started.html`
#### Build the sub-components
Then, you are going to need to create the sub-components. 
`TodoEntry`
```
export default class TodoEntry extends React.Component {
	render() {
		return (<input
			className=« new-todo »
			placeholder=« What needs to be done? »
		/>);
	}
}

TodoEntry.propTypes = {
	todoModel: React.PropTypes.object.isRequired
}
```
and `TodoOverview`
```
const todos = {
			id: 1,
			title: ‘Learn react’,
			completed: false
}
export default class TodoOverview extends React.Component {
	render() {
		const {todoModel, viewModel} = this.props;
		if (todoModel.todos.length === 0)
			return null;
		return ( <section className=« main »>
			 <input
				className=« toggle-all »
				type=« checkbox »
				/>
			<ul className=« todo-list »>
				{todos.map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewModel={viewModel}
					/>)
				)}
			</ul>
		</section>)
	}
}


TodoOverview.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}
```

Let’s finish our static version by adding the `TodoItem` and `TodoFooter`.

In this the top component  `TodoOverview` todos data is passed to properties of `TodoItem`. You can access them via `this.props.todo` on `TodoItem`. 

```
export default class TodoItem extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {viewModel, todo} = this.props;
		return (
			<li>
				<div className=« view »>
					<input
						className=« toggle »
						type=« checkbox »
					/>
					<label>
						{todo.title}
					</label>
					<button className=« destroy »/>
				</div>
				<input
					className=« edit »
				/>
			</li>
		);
	}

}

TodoItem.propTypes = {
	todo: React.PropTypes.object.isRequired,
	viewModel: React.PropTypes.object.isRequired
}

```

### make your UI interactive : first by state 

To make your UI interactive you need to be able to trigger changes to your underlying data model. React makes this easy with `state`.

To build your app correctly you first need to think of the minimal set of mutable state that your app needs. The key here is DRY: Don’t Repeat Yourself. Figure out what the absolute minimal representation of the state of your application needs to be and compute everything else you need on-demand.

Go through each piece of data in our application and figure out which one is state by asking three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it change over time? If not, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it’s not state.

OK, so we’ve identified what the minimal set of app state is. Next we need to identify which component mutates, or owns, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. This is often the most challenging part for newcomers to understand, so follow these steps to figure it out:

For each piece of state in your application:

* Identify every component that renders something based on that state.
* Find a common owner component (a single component above all the components that need the state in the hierarchy).
* Either the common owner or another component higher up in the hierarchy should own the state.
* If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.


For this example `title`of `TodoItem` match this conditions.
```
export default class TodoItem extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {editText: props.todo.title};
	}

	render() {
		//…
		// …
				<input
					className=« edit »
					value={this.state.editText}
				/>
	//… 
	}

```
### make your UI interactive : second by events handlers

> Go to final code

### make my app reactive
![Mobservable + React](https://i.imgur.com/c77Z2Xd.png)
We will use a `mobservable` library. 

`mobservable` enables your data structures to become observable.
Next to that it can make your functions (or [React components](https://github.com/mweststrate/mobservable-react)) reactive, so that they re-evaluate whenever relevant data is altered.
It’s like Excel for JavaScript: any data structure can be turned into a ‘data cell’, and every function or user interface component can be turned into a ‘formula’ that updates automatically.
Mobservable is unopiniated about which data structures to use;
it can work with mutable objects, arrays, (cyclic) references, classes etc.
So that your actions, stores and user interface can remain KISS.

#### The first function : Observable

Mobservable can be summarised in two functions that will fundamentally simplify the way you write React applications.
Let’s start by add a function that observe pour data model:

```javascript
export class TodoModel {
	constructor(key) {
		observable({
			key,
			todos: [],
			activeTodoCount: () =>
				this.todos.reduce(
					(sum, todo) => sum + (todo.completed ? 0 : 1),
					0
				)
			,
			completedCount: () => this.todos.length - this.activeTodoCount
		});

//…
```
observable is to Mobservable as $ is to jQuery. Making data observable starts with this function. If data is observable, views that depend on that data will update automatically.

observable provides overloads for different kinds of data. Probably you will only use the version that takes objects, but these are other variations.


In this example the `TodoModel` data structure is made observable.
Mobservable will automatically track all relations between _observable data_ and _observing functions (or components)_ so that the minimum amount of observers is updated to keep all observers fresh.


#### the second function : observer

The observer function / decorator can be used to turn ReactJS components into reactive components. It wraps the component’s render function in mobservable.autorun to make sure that any data that is used during the rendering of a component forces a rerendering upon change. It is available through the separate mobservable-react package.

```javascript
@observer
export default class TodoItem extends React.Component {
//…
}
```
So here we are, simple, straightforward reactive components that will render whenever needed. These components have some interesting characteristics:

* They only subscribe to the data structures that where actively used during the last render. This means that you cannot under-subscribe or over-subscribe. You can even use data in your rendering that will only be available at later moment in time. This is ideal for asynchronously loading data.
* You are not required to declare what data a component will use. Instead, dependencies are determined at runtime and tracked in a very fine-grained manner.
* Usually reactive components have no state. But you are still free to use state.
* `@observer` implements `shouldComponentUpdate` so that children are not re-rendered unnecessary.
* Reactive components sideways load data; parent components won’t re-render unnecessarily even when child components will.
* `@observer` does not depend on React’s context system.


Its as simple as that. In the example above the `` will automatically update each time the property `` is altered.
The actual interesting thing about this approach are the things that are *not* in the code:
#### the router
We will use for routing `Director` : Routing is the process of determining what code to run when a URL is requested.

```javascript
	componentDidMount() {
		var viewModel = this.props.viewModel;
		var router = Router({
			‘/‘: function() { viewModel.todoFilter = ViewModel.ALL_TODOS; },
			‘/active’: function() { viewModel.todoFilter = ViewModel.ACTIVE_TODOS; },
			‘/completed’: function() { viewModel.todoFilter = ViewModel.COMPLETED_TODOS; }
		});
 // Instantiate the router.
		router.init(‘/‘);
	}
```
the first element to define is the constructor like this `var router = Router(routes);`.
the Routing table is an object literal that contains nested route definitions. A potentially nested set of key/value pairs. The keys in the object literal represent each potential part of the URL. The values in the object literal contain references to the functions that should be associated with them.

All the function are updating the todoFilter in viewModel.

# ressources
https://www.playframework.com/documentation/2.0.4/ScalaTodoList

http://backbonejs.org/docs/todos.html
https://www.meteor.com/tutorials/react/creating-an-app
http://www.mockaroo.com/

* [Mobservable on Github](https://github.com/mweststrate/mobservable)

* [Mobservable talk on Reactive2015](https://www.youtube.com/watch?v=FEwLwiizlk0)
