/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'mongodb',
  attributes: {
  	element_id:'string',
  	element_content:'string',
  	owner:{
  		model: 'user'
  	}
  }
};
