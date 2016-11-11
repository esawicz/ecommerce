var app = require('./server.js');
var db = app.get('db');

module.exports = {
	getAll: function(req, res) {
		db.read_products(function(err, products){
			//console.log(products)
			res.send(products);
		})
	},

	createCart: function(req, res) {
		if(!req.session.cart) {
			req.session.cart = []
		}
		req.session.cart.push(req.body)
		res.send(req.session.cart);
	},

	deleteItem: function(req, res) {
		req.session.cart.forEach(function (item, index) {
			if (item.product_id === req.body.product_id) {
				req.sesssion.cart.splice(index, 1);
			}
		})

		res.send(req.session.cart);
	}

}