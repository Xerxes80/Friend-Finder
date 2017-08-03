var friendData = require('../data/friends.js');

module.exports = function(app){

    app.get('/api/friends', function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {

        var newFriend = req.body;

        for (var i = 0; i < newFriend.scores.length; i++){
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }

        var differencesArray = [];

        for(var i = 0; i < friendData.length; i++){
            var comparedFriend = friendData[i];
            var totalDifference = 0;

            for (var j = 0; j < comparedFriend.scores.length; j++){
                var theScoreDifference = Math.abs(comparedFriend.scores[j] - newFriend.scores[j]);
                totalDifference += theScoreDifference;
            }
            differencesArray[i] = totalDifference;

        }
        var bestMatchNum = differencesArray[0];
        var bestMatchIndex = 0;

        for(var i = 0; i < differencesArray.length; i++){
            if(differencesArray[i] < bestMatchNum){
                bestMatchNum = differencesArray[i];
                bestMatchIndex = i;
            }
        }

        friendData.push(newFriend);
        res.json(friendData[bestMatchIndex]);

    })
    
}