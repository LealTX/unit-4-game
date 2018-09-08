$(document).ready(function () {

    //create the stats for the players
    var batman = {
        "name": "Batman",
        "health": 230,
        "base": 7,
        "attack": 7,
        "defense": 17,
    }

    var superman = {
        "name": "Superman",
        "health": 280,
        "base": 9,
        "attack": 9,
        "defense": 24,
    }

    var darkseid = {
        "name": "Darkseid",
        "health": 260,
        "base": 8,
        "attack": 8,
        "defense": 22,
    }

    var bane = {
        "name": "Bane",
        "health": 240,
        "base": 7,
        "attack": 7,
        "defense": 14,
    }

    //create the variables used in functions
    var clicks = 0;
    var playerSelected = false;
    var opponentSelected = false;
    var playerClass = {};
    var opponentClass = {};
    var gameOver = false;
    var opponentDefeated = 0;

    $(".resetBtn").addClass("d-none");

    //build your player
    function buildPlayer(selectedPlayer) {
        playerClass.name = selectedPlayer.name;
        playerClass.health = selectedPlayer.health;
        playerClass.base = selectedPlayer.base;
        playerClass.attack = selectedPlayer.attack;
        playerClass.defense = selectedPlayer.defense;
    }

    //build your opponent
    function buildOpponent(selectedOpponent) {
        opponentClass.name = selectedOpponent.name;
        opponentClass.health = selectedOpponent.health;
        opponentClass.base = selectedOpponent.base;
        opponentClass.attack = selectedOpponent.attack;
        opponentClass.defense = selectedOpponent.defense;
    }

    function hidePlayerText() {
        $(".pickPlayerDiv").addClass("d-none");
        $(".pickOpponentDiv").removeClass("d-none");
        $(".characterPool").children(".character-card").removeClass("start").addClass("availableOpponents");
        $(".middleSection").children(".middleSectionText").html("Available Opponents")
    }

    function hideOpponentText() {
        $(".pickOpponentDiv").addClass("d-none");
        $(".attackBtn").removeClass("d-none");
    }

    //when batman is selected as player/opponent
    $("#batman").on("click", function () {
        console.log(this);

        if (playerSelected == false) {
            playerSelected = true;
            buildPlayer(batman);
            console.log("My Player: " + playerClass.name);
            $("#batman").removeClass("start").addClass("playerSection");
            $("#playerSection").append(this);
            hidePlayerText();
        }
        else if (opponentSelected == false && playerSelected == true) {
            opponentSelected = true;
            hideOpponentText();
            $("#batman").removeClass("start").addClass("opponentSection");
            $("#batman").removeClass("availableOpponents").addClass("opponentSection");
            $("#opponentSection").append(this);
            buildOpponent(batman);
            console.log("My Opponent: " + opponentClass.name);
        }
    });

    //when superman is selected as player/opponent
    $("#superman").on("click", function () {
        console.log(this);

        if (playerSelected == false) {
            playerSelected = true;
            buildPlayer(superman);
            console.log("My Player: " + playerClass.name);
            $("#superman").removeClass("start").addClass("playerSection");
            $("#playerSection").append(this);
            hidePlayerText();
        }
        else if (opponentSelected == false && playerSelected == true) {
            opponentSelected = true;
            hideOpponentText();
            $("#superman").removeClass("start").addClass("opponentSection");
            $("#superman").removeClass("availableOpponents").addClass("opponentSection");
            $("#opponentSection").append(this);
            buildOpponent(superman);
            console.log("My Opponent: " + opponentClass.name);
        }
    });

    //when darkseid is selected as player/opponent
    $("#darkseid").on("click", function () {
        console.log(this);

        if (playerSelected == false) {
            playerSelected = true;
            buildPlayer(darkseid);
            console.log("My Player: " + playerClass.name);
            $("#darkseid").removeClass("start").addClass("playerSection");
            $("#playerSection").append(this);
            hidePlayerText();
        }
        else if (opponentSelected == false && playerSelected == true) {
            opponentSelected = true;
            hideOpponentText();
            $("#darkseid").removeClass("start").addClass("opponentSection");
            $("#darkseid").removeClass("availableOpponents").addClass("opponentSection");
            $("#opponentSection").append(this);
            buildOpponent(darkseid);
            console.log("My Opponent: " + opponentClass.name);
        }
    });

    //when bane is selected as player/opponent
    $("#bane").on("click", function () {
        console.log(this);

        if (playerSelected == false) {
            playerSelected = true;
            buildPlayer(bane);
            console.log("My Player: " + playerClass.name);
            $("#bane").removeClass("start").addClass("playerSection");
            $("#playerSection").append(this);
            hidePlayerText();
        }
        else if (opponentSelected == false && playerSelected == true) {
            opponentSelected = true;
            hideOpponentText();
            $("#bane").removeClass("start").addClass("opponentSection");
            $("#bane").removeClass("availableOpponents").addClass("opponentSection");
            $("#opponentSection").append(this);
            buildOpponent(bane);
            console.log("My Opponent: " + opponentClass.name);
        }
    });


    //function for the attack button
    $(".attackBtn").on("click", function () {
        console.log("My player: " + playerClass.name);
        console.log("My Opponent: " + opponentClass.name);

        //update player health
        playerClass.health = playerClass.health - opponentClass.defense;
        console.log("My Health: " + playerClass.health);
        $(".playerSection").children(".HP").html(playerClass.health);

        //update opponent health
        opponentClass.health = opponentClass.health - playerClass.attack;
        $(".opponentSection").children(".HP").html(opponentClass.health);
        console.log("Opponent Health: " + opponentClass.health);

        //update player attack
        playerClass.attack = playerClass.attack + playerClass.base;
        console.log("My player new attack: " + playerClass.attack);

        $(".messageBox").removeClass("d-none");
        $(".messageBox").children(".messageText").html("You have attacked " + opponentClass.name + " dealing " + playerClass.attack + " in damage. They have also countered reducing your health to " + playerClass.health + ".");


        //check if opponent is defeated 
        if (opponentClass.health <= 0) {
            opponentSelected = false;
            opponentDefeated++;
            $(".pickOpponentDiv").removeClass("d-none");
            $(".opponentSection").hide();
            $(".attackBtn").addClass("d-none");
            $(".messageBox").children(".messageText").html("You defeated "+opponentClass.name+". Select another opponent.");
        }

        if (playerClass.health <= 0) {
            $(".resetBtn").removeClass("d-none");
            $(".attackBtn").addClass("d-none");
            $(".messageBox").children(".messageText").html("You have been defeated by "+opponentClass.name+". Try Again!!")
        }

        if (opponentDefeated == 3){
            $(".pickOpponentDiv").removeClass("d-none");
            $(".pickOpponentDiv").children(".blink_text").html("No one's left you win!");
            $(".resetBtn").removeClass("d-none");
            $(".attackBtn").addClass("d-none");
            $(".messageBox").children(".messageText").html("You beat everyone!")
        }

    });

    $(".resetBtn").on("click", function () {
        location.reload();
    });


});