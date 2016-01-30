var app = angular.module("app", []);

app.controller('appController', function($scope, $http) {    
    $scope.processLongUrl = function() {
        $scope.shortUrl = null;
        $scope.shortUrlHash = null;
        sessionStorage.removeItem('shortUrl');
    };
    
    if (sessionStorage.longUrl) {
        $scope.longUrl = sessionStorage.longUrl;
    }
    
    if (typeof sessionStorage.shortUrl) {   
        $scope.shortUrl = sessionStorage.shortUrl;
    }
    
    $scope.onShorten = function(url) {
        $http.post("/shortenUrl", { url: url }).success(function(data) {
            $scope.shortUrl = data.shortUrl;
            $scope.shortUrlHash = data.shortUrl.replace("firstord.er/", "");
            sessionStorage.shortUrl = data.shortUrl;
        });
    };
});