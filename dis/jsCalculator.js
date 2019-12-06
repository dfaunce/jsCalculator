$(function() {
  
  var Calculator = function() {
  
    var i, e, t, d;
    var $entry = $("#entry");
    var $result = $("#result");
    
    //Function to animate a button click
    function toggleAnimation($obj, clsName) {
      $obj.removeClass(clsName);
      setTimeout(function() {
        $obj.addClass(clsName);
      },1);
    }
      
    //If a ".num" (or Integer) or ".equals" (or "=") is clicked
    $(".num, .equals").on("click", function() {
      
      //Clicking Animation
      toggleAnimation($(this), "numFlash");
      
      //If this is a number (or decimal period)
      if (!$(this).hasClass("equals")) {
        
        //If this is the decimal period, check to make sure $entry doesn't already have a decimal
        if ($(this).hasClass("dot")) {
          
          //If no decimal, then append the decimal - else ignore it.
          if ($entry.attr("data-hasdot") == "0") {
            $entry.append(".").attr("data-hasdot", "1");
            $entry.attr("data-eval", $entry.attr("data-eval") + ".");
          }
        }
        
        //If this is purely an integer append the integer to $entry
        else {
          i = $.trim($(this).find("div").text()); 
          $entry.append(i);
          $entry.attr("data-eval", $entry.attr("data-eval") + i.toString());
        } 
        
        //Evaluate the entry
        evaluate();
      } 
      
      //Else if the "dot" or "decimal" was added
      else {
        e = $.trim($result.text());
        $entry.text(e).attr({"data-eval": e, "data-hasdot": (e.indexOf(".") >= 0) ? "1" : "0"});
      }
        
    });
        
    //If a function button is clicked (ie: "Multiply", "Divide", "Subtract", "Add")
    $(".function").on("click", function() {
    
      //Clicking Animation
      toggleAnimation($(this), "functionFlash");
            
      //If the key entered WAS NOT a backspace
      if ($(this).attr("id") !== "backspace") 
      {
        //Get the text
        i = $.trim($(this).find("div").text());  
        
        //Get the data attribute (ie:  Multiplication will display as "x" but it needs to be evaluated with the "*");
        d = $.trim($(this).attr("data-val"));

        //Append the text to the $entry
        $entry.append(i);      

        //Append the data attribute string to the data-eval attribute.
        //Set the "hasdot" switch to "OFF" (because we are accepting a new number)
        $entry.attr({"data-eval": $entry.attr("data-eval") + d.toString(), "data-hasdot": "0"});
      }   
      
      //Else we need to delete the last character
      else {          
            
        //Retrieve the $entry text (this shows the "x" as multiplication and division sign as division)
        t = $.trim($entry.text());

        //Retrieve the $entry data attribute "data-eval" this converts the symbols ("x" and [division] into characters that can be evaluated in javascript)
        e = $.trim($entry.attr("data-eval"));
              
        //If the entry contains anything, then remove the last character.
        t = (t.length > 0) ? t.slice(0, -1) : t;
        e = (e.length > 0) ? e.slice(0, -1) : e;
              
        //If the entry is empty, then reset the $entry text and data attributes. Also empty the $result text
        if (t.length === 0) {
          $entry.attr({"data-hasdot": "0", "data-eval": ""}).empty();
          $result.empty();
          return;
        }
        
        //Set the Entry text
        $entry.text(t).attr("data-eval", e);


        //If the last character from $entry IS A NUMBER, then evaluate it.
        // -- We don't want to evaluate an entry that ends in "+"
        if (!isNaN(t.slice(-1))) {        
          evaluate();
        }

        //Else, ignore the evalute function and set the "hasdot" switch to OFF (so it can accept a decimal)
        else {
          $entry.attr("data-hasdot", "0");
        }
      }   
      
    });
      
    //Clear the $entry and $result
    $("#clear").on("click", function() {
      $entry.attr({"data-hasdot": "0", "data-eval": ""}).text("");
      $result.text("");
    });
    

    //Primary evaluation function
    function evaluate() {

      //Retrieve the $entry data attribute "data-eval".
      // -- this data attribute converts the "x" into "*" and so forth so it can be evaluated.
      t = $.trim($entry.attr("data-eval"));

      //Evaluate it
      e = eval(t);      

      //If we have an unsolvable solution (ie:  9/0 = ???), then display the error in the result and return false
      if (e === Infinity || e === -Infinity || isNaN(e)) {
        $result.text("Unable to solve").addClass("error");
        $entry.addClass("error");
        return;      
      }

      //Else remove an indication of errors.
      else {
        $entry.removeClass("error");
        $result.removeClass("error");
      }  
      
      //Set the result
      $result.text(e);
    }
  
  
  };  
  
  //Initialize the object
  Calculator();  
  
});
