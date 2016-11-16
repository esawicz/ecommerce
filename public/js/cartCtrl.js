angular.module('pink')
	.controller('cartCtrl', function($scope, mainSrv){


	$scope.showCart = function() {
		mainSrv.showCart().then(function(response){
			$scope.cart = response;
			calcPriceInfo();
		});
	}

	$scope.showCart();

	$scope.clearItem = function(item) {
		mainSrv.clearItem(item).then(function(response){
			$scope.cart = response;
		});
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
			calcPriceInfo();
		});
	}

	function calcSubTotal() {
		var total = 0;
		for (var i = 0; i < $scope.cart.length; i++) {
			total += $scope.cart[i].price * $scope.cart[i].quantity
		}
		$scope.subTotal = Math.round(total* 100) / 100;
	}

	function calcTax() {
		var tax = $scope.subTotal * .07;
	 	$scope.tax = Math.round(tax * 100)/100;
 }

 function calcTotal() {
	 var total = $scope.subTotal + $scope.tax;
	 $scope.total = Math.round(total * 100)/100;
 }

 function calcPriceInfo() {
	 calcSubTotal();
	 calcTax();
	 calcTotal();
 }



});
