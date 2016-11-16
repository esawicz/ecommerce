angular.module('pink')
	.controller('productCtrl', function($scope, mainSrv, products, cart){

		$scope.products = products;
		$scope.cart = cart;
		if ($scope.cart) checkIfItemInCart();

	$scope.addToCart = function(item) {
	 	item.added = true;
		mainSrv.createCart(item).then(function(response){
			$scope.cart = response;
		});
	}

	function checkIfItemInCart() {
		$scope.cart.forEach(function (cartItem) {
			$scope.products.forEach(function (product) {
				if (cartItem.product_id === product.product_id) {
					product.added = true;
				}
			})
		})
	}

})
