var app = angular.module("app", []);

app.controller('appController', function($scope, $http) {    
    $scope.clearShortUrl = function() {
        $scope.shortUrl = null;
        $scope.shortUrlHash = null;
    };
    
    $scope.processUrl = function(url) {
        $http.post("/shortenUrl", { url: url }).success(function(data) {
            $scope.shortUrl = data.shortUrl;
            $scope.shortUrlHash = data.shortUrl.replace("tyl.er/", "");
        });
    };
});