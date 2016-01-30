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
        if (/^((http|https|ftp):\/\/)*[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
            $http.post("/shortenUrl", { url: url }).success(function(data) {
                $scope.shortUrl = data.shortUrl;
                $scope.shortUrlHash = data.shortUrl.replace("firstord.er/", "");
                sessionStorage.shortUrl = data.shortUrl;
            });   
        }
        else {
            alert("Input must be a valid URL.");
        }
    };
});