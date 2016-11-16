angular.module('pink').service('mainSrv', function($http){

	this.getProducts = function() {
		return $http({
			method: 'GET',
			url: '/api/products',
		}).then(function(response) {
			// console.log('this is the response', response)
			return response.data;
		});
	}

	this.createCart = function(item) {
		item.quantity =1;
		return $http({
			method: 'POST',
			url: '/api/cart',
			data: item
		});
	},

	this.showCart = function() {
		return $http({
			method: 'GET',
			url: '/api/cart',
		}).then(function (response) {
			return response.data;
		});
	},

	this.clearItem = function(item) {
		console.log(22222, item)
		return $http({
			method: 'DELETE',
			url: '/api/cart/' + item.product_id
		}).then(function (response) {
			return response.data;
		});
	}

	this.updateCartItem = function (item) {
		return $http({
			method: 'PUT',
			url: '/api/cart',
			data: item
		}).then(function (response) {
			return response.data;
		});
	}

})
