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
	},

	createOrder: function (req, res) {
		console.log(4444444, req.body)
		var user = req.body.user;
		var order = req.body.order;
		var cart = order.cart;

		var userObj = {
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
			ship_address_1: user.address1,
			ship_address_2: user.address2,
			ship_city: user.shipCity,
			ship_state: user.shipState,
			ship_zip: user.zipcode
		}

		db.customers.insert(userObj, function (err, customer) {
			// console.log(11111111, err);
			// console.log(22222222, customer);

			var obj = {
				customer_id: customer.id,
				total: order.total
			}

			db.orders.insert(obj, function (err, order){
				console.log(3456789, order)
				cart.forEach(function (product) {
					db.order_products.insert({order_id: order.id, product_id: product.product_id, quantity: product.quantity})
				})

			})

		});
	}

}
