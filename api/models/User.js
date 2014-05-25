/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
		  
	connection: 'mongodb',
	tableName:'user',

	attributes: {

		name: 'string'
		education: 'string',
		email: 'string',
		job:'string',
		sex:'string',
		friends: 'string',


		elements:{
			collection: 'element',
			via: 'owner'
		},

		lists:{
			collection: 'list',
			via: 'owner'
		}

  }
};

