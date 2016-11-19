angular.module('pink')
	.controller('checkoutCtrl', function($scope, mainSrv){
    showCart();


    $scope.states = [ 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
      'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
      'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
      'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

    function showCart() {
  		mainSrv.showCart().then(function(response){
  			$scope.cart = response;
        calcPriceInfo();
      });
    }

    $scope.placeOrder= function(user) {
      var order = {
        cart: $scope.cart,
        total: $scope.total
      }
      //console.log(5678, user)s
      mainSrv.placeOrder(user, order);
      // console.log(1234, cart)
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

  })
