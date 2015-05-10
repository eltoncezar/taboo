'use strict';

/* Controllers */

var tabooControllers = angular.module('tabooControllers', []);

tabooControllers.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.words = [];
    $scope.usedWords = [];

    $scope.getWords = function () {
        $http.get('js/words.json').success(function (data) {
            $scope.words = shuffle(data);
            $scope.words = data;
        });
    };

    $scope.newGame = function () {
        $scope.getWords();

        $scope.game = {
            teams: [],
            currentTeam: 0,
            duration: 5,
            roundPoints: 0
        };

        $scope.game.teams.push({
            name: 'Time 1',
            points: 0
        });

        $scope.game.teams.push({
            name: 'Time 2',
            points: 0
        });
    };

    $scope.nextWord = function () {
        var word = $scope.words.pop();

        if (word) {
            $scope.usedWords.push(word);
            return word;
        } else {
            $scope.words = shuffle($scope.usedWords);
            $scope.nextWord();
        }
    };

    $scope.newGame();

    //+ Jonas Raoni Soares Silva
    //@ http:jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
}]);

tabooControllers.controller('menuCtrl', ['$scope', function ($scope) {
    $scope.startGame = function () {
        window.location.href = '#/gameParams';
    };
}]);

tabooControllers.controller('gameParamsCtrl', ['$scope', function ($scope) {
    $scope.upTime = function () {
        $scope.game.teams.push({
            name: 'Time ' + $scope.teams.length + 1,
            points: 0
        });
    };

    $scope.downTime = function () {
        $scope.game.teams.pop();
    };

    $scope.upDuration = function () {
        $scope.game.duration = $scope.game.duration + 15;
    };

    $scope.downDuration = function () {
        if ($scope.game.duration <= 0) {
            $scope.game.duration = 0;
        } else {
            $scope.game.duration = $scope.game.duration - 15;
        }
    };

    $scope.startGame = function () {
        window.location.href = '#/game';
    };
}]);

tabooControllers.controller('gameCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.startGame = function () {
        $scope.currentTeam = $scope.game.teams[$scope.game.currentTeam];
        $scope.selectedWord = $scope.nextWord();

        startTimer($scope.game.duration);
    };

    $scope.endGame = function () {
        window.location.href = '#/endGame';
    };

    $scope.next = function () {
        $scope.selectedWord = $scope.nextWord();
        $scope.game.roundPoints++;
    }

    $scope.skip = function () {
        $scope.selectedWord = $scope.nextWord();
    }

    $scope.back = function () {
        window.location.href = '#/phones';
    }

    function startTimer(time) {
        $scope.count = time;

        $scope.onTimeout = function () {
            $scope.count--;
            if ($scope.count > 0) {
                mytimeout = $timeout($scope.onTimeout, 1000);
            } else {
                //$scope.endGame();
            }
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);
    }

    $scope.startGame();
}]);

tabooControllers.controller('endGameCtrl', ['$scope', function ($scope) {
    $scope.currentTeam = $scope.game.teams[$scope.game.currentTeam];
    $scope.game.teams[$scope.game.currentTeam].points = $scope.game.teams[$scope.game.currentTeam].points + $scope.game.roundPoints;

    $scope.nextRound = function () {
        $scope.game.roundPoints = 0;
        $scope.game.currentTeam++;

        if ($scope.game.currentTeam > $scope.game.teams.length - 1) {
            $scope.game.currentTeam = 0;
        };

        window.location.href = '#/game';
    }
}]);
