angular.module('pink')
	.controller('productCtrl', function($scope, mainSrv){

	$scope.getProducts = function() {
		mainSrv.getProducts().then(function(response) {
			console.log('this is response in controller', response)
			$scope.products = response;
			console.log("this is $scope.products", $scope.products)
			return response;
		})
	}

	$scope.getProducts();

	$scope.addToCart = function(item) {
			mainSrv.createCart(item).then(function(response){
				console.log(response)
				return response.data
			})
		}



})