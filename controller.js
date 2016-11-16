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

	showCart: function(req, res) {
		res.send(req.session.cart);
	},

	addItem: function(req, res) {
		var cart = req.session.cart;
			for (var i = 0; i < cart.length; i++) {
				if (cart[i].product_id === req.body.product_id) {
					cart[i].quantity++;
				}
			}
			res.send(cart);
	},

	removeItem: function(req, res) {
		var cart = req.session.cart;
		for(var i = 0; i < cart.length; i++) {
			if (cart[i].product_id === req.body.product_id) {
				cart[i].quantity--;
			}
		}
	},

	clearItem: function(req, res) {
		var cart = req.session.cart;
		cart.forEach(function (item, index) {
			if (item.product_id === Number(req.params.id)) {
				cart.splice(index, 1);
			}
		});
		res.send(cart);
	},

	updateCartItem: function (req, res) {
		var cart = req.session.cart;
			for (var i = 0; i < cart.length; i++) {
				if (cart[i].product_id === req.body.product_id) {
					cart[i] = req.body;
				}
			}
		res.send(cart);
	}

}
