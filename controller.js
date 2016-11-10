var app = require('./server.js');
var db = app.get('db');

module.exports = {
	getAll: function(req, res) {
		db.read_products(function(err, products){
			//console.log(products)
			res.send(products);
		})
	},

	createCart: function(req,res){
		if(!req.session.cart) {
			req.session.cart = []
		}
		req.session.cart.push(req.body)
	},


}