angular.module('pink', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/views/home.html',
		controller: 'mainCtrl'
	})

	.state('products', {
		url: '/products',
		templateUrl: '/views/products.html',
		controller: 'productCtrl',
		resolve: {
			products: function (mainSrv) {
			return mainSrv.getProducts();
			},
			cart: function (mainSrv) {
				return mainSrv.showCart();
			}
		}
	})

	.state('cart', {
		url: '/cart',
		templateUrl: '/views/cart.html',
		controller: 'cartCtrl'
	})

	.state('checkout', {
		url: '/checkout',
		templateUrl: '/views/checkout.html',
		controller: 'checkoutCtrl'
	})

	.state('payment', {
		url: '/payment',
		templateUrl: '/views/payment.html',
		controller: 'paymentCtrl'
	})

	.state('contact', {
		url:'/contact',
		templateUrl: '/views/contact.html',
		controller: 'contactCtrl'
	})

	$urlRouterProvider.otherwise('/');

})
