// Tutorial: JSX
// Let's address the elephant in the room first. You will be writing XML with your React code.

// JSX is a preprocessor step that adds XML syntax to JavaScript. You can definitely use React without JSX but JSX makes React a lot more elegant.

// Just like XML, JSX tags have a tag name, attributes, and children. If an attribute value is enclosed in quotes, the value is a string. Otherwise, wrap the value in braces and the value is the enclosed JavaScript expression.

// If want to learn more about JSX, check out the official JSX documentation :  http://facebook.github.io/react/docs/jsx-in-depth.html

//found in knownTags
<div></div>

//!found in knownTags
<APP></APP>


//self closing tags
<div />

//multiple nodes == returning multiple functions :(
<div></div>
<a></a>

//single node == returning single function :)
<div>
    <a></a>
</div>

//first argument == component props,functions, etc.
<div>
    <a href="#"></a>
</div>

//additional arguments == children
<div>
    <a href="#">{this.props.children}</a>
</div>

//React will not render unknown attributes
//to the browser without data-*
<div notrendered="x" data-rendered="x">
    <a href="#">this.props.children</a>
</div>

//interpreted
<div notrendered="x" data-rendered="x">
    <a href="#" onClick={this.update}>
    {/* this is a comment */}
    this.props.children
    </a>
</div>

//if else is no good in JSX syntax, use a ternary expression
<div notrendered="x" data-rendered="x">
    <a href="#" onClick={this.update}>
        {this.props.children}
        {i>1 ? 'More than one' : 'One'}
        {i>1 && 'More than one'}
        {/* this is a comment */}
    </a>
</div>


//inline styles
var myStyle={
    backgroundColor:'#000',
    height:10 //no need for 'px'
}
<div style={myStyle} notrendered="x" data-rendered="x">
    <a href="#" onClick={this.update}>
        {this.props.children}
        {i>1 ? 'More than one' : 'One'}
        {i>1 && 'More than one'}
        {/* this is a comment */}
    </a>
</div>
