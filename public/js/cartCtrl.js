angular.module('pink')
	.controller('cartCtrl', function($scope, mainSrv){


	$scope.showCart = function() {
			mainSrv.showCart().then(function(response){
				$scope.cart= response;
			})
		}

	$scope.showCart();

	$scope.clearItem = function(item) {
		mainSrv.clearItem(item).then(function(response){
			$scope.cart = response;
		})
	}

	$scope.increaseQuantity = function (item) {
		item.quantity++;
		updateCartItem(item);
	}

	$scope.decreaseQuantity = function (item) {
		item.quantity--;
		if (item.quantity <= 0) {
			mainSrv.clearItem(item).then(function (response) {
				$scope.cart = response;
			});
		}
		updateCartItem(item);
	}

	function updateCartItem(item) {
		mainSrv.updateCartItem(item).then(function (response) {
			$scope.cart = response;
		});
	}
})
