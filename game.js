$(function ( ) {
  tryDig = function(targetCell)
  {
    var targetObj = board.dig(targetCell);
    if (targetObj) {
      successDigs = successDigs + 1;
      if (targetObj.name == "Temple") {
          $("#cell"+targetCell).html("T");
          $("#youFound").val("Temple");

      } else if (targetObj.name == "Palace") {
          $("#cell"+targetCell).html("P");
          $("#youFound").val("Palace");

      }  else if (targetObj.name == "Forum") {
          $("#cell"+targetCell).html("F");
          $("#youFound").val("Forum");

      }  else if (targetObj.name == "House") {
          $("#cell"+targetCell).html("H");
          $("#youFound").val("House");

      }  else if (targetObj.name == "Hut") {
          $("#cell"+targetCell).html("h");
          $("#youFound").val("Hut");
      }
      if (targetObj.size == targetObj.successes) {
           $("#fullyExcavated").html(targetObj.name + 
           " has been fully excavated").css("color","green");
           excavatedCount = excavatedCount + 1;
      }
    }
    else {
      $("#youFound").val("Nothing");
      $("#cell"+targetCell).html("X").css("color","red");
    }
  }

  board = new GameBoard( );
  board.setBoard( );

  var clickCount = 0
  var successDigs = 0
  var excavatedCount= 0
  var rating = 0

   $(".square").click(function( ){
      tryDig($(this).attr("id").substr(4,5));
      clickCount = clickCount + 1;

      $("#digTries").val(clickCount);
      $("#successfulDigs").val(successDigs);
      $("#excavatedRuins").val(excavatedCount);
      $("#playerPerformance").html(successDigs / clickCount * 100 + "%")
      $("#winner").html("You win! Your player performance rating is")

       if (excavatedCount >= 5)  {
           $("#playerPerformance").show("asdf");
           $("#winner").show("I don't know why writing in the quotes enables a cool fade effect");
        } // I couldn't figure out the slideDown method :(
          // But I did get a cool fade effect with the show method. Typing anything in quotes
          // enables a different effect for the show method. I don't know why.

    });
});
