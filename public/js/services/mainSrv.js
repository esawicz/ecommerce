angular.module('pink').service('mainSrv', function($http){
	
	this.getProducts = function() {
		return $http({
			method: 'GET',
			url: '/api/products',
		}).then(function(response) {
			// console.log('this is the response', response)
			return response.data;
		});
	},

	this.createCart = function(item) {
		return $http({
			method: 'POST',
			url: '/api/cart',
			data: item
		});
	}

	this.deleteItem = function(item) {
		return $http({
			method: 'DELETE',
			url: '/api/cart',
			data:item
		});
	}

})