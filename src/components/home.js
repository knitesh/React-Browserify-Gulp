'use strict';

var React = require('react');

var Home = React.createClass({
	render: function(){
		return(
			<div className= 'jumbotron'>
				<h1>Starter Template</h1>
				<p>React, browserify and Gulp 
				<i className='text-muted'>  -Kumar Nitesh</i>
				</p>
			</div>
		);
	}
});

module.exports = Home;