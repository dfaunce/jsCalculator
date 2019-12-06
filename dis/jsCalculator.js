$(function() {
  
  var Calculator = function() {
  
    var $main = $("#main");
    var $screen = $("#screen");
    var $entry = $("#entry");
    var $result = $("#result");
    var $calculator = $("#calculator");
    var $numbers = $("#numbers");
    var $functions = $("#functions");
    var $equals = $("#equals");
    
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
        var i = $.trim($(this).find("div").text()); 
        $entry.append(i);
        $entry.attr("data-eval", $entry.attr("data-eval") + i.toString());
      } 
      
      //Evaluate the entry
      evaluate();
    } 
    
    //Else if the "dot" or "decimal" was added
    else {
      var e = $.trim($result.text());
      $entry.text(e).attr({"data-eval": e, "data-hasdot": (e.indexOf(".") >= 0) ? "1" : "0"});
    }
      
  });
      
  //If a function button is clicked (ie: "Multiply", "Divide", "Subtract", "Add")
  $(".function").on("click", function() {
  
    //Clicking Animation
    toggleAnimation($(this), "functionFlash");
          
    if ($(this).attr("id") !== "backspace") {
      var i = $.trim($(this).find("div").text());      
      var d = $.trim($(this).attr("data-val"));
      $entry.append(i);      
      $entry.attr("data-eval", $entry.attr("data-eval") + d.toString()).attr("data-hasdot", "0");
    }   
    
    else {
          
            
      var t = $.trim($entry.text());
      var e = $.trim($entry.attr("data-eval"));
            
      t = (t.length > 0) ? t.slice(0, -1) : t;
      e = (e.length > 0) ? e.slice(0, -1) : e;
            
      if (t.length === 0) {
        $entry.attr({"data-hasdot": "0", "data-eval": ""}).empty();
        $result.empty();
        return;
      }
      
      var l = t.slice(-1);
      
      
      
      
      $entry.text(t).attr("data-eval", e);
      
      if (!isNaN(l)) {        
        evaluate();
      }
      else {
        $entry.attr("data-hasdot", "0");
      }
    }   
    
  });
    
  $("#clear").on("click", function() {
    $entry.attr({"data-hasdot": "0", "data-eval": ""}).text("");
    $result.text("");
  });
  
  function evaluate() {
    var t = $.trim($entry.attr("data-eval"));
    var e = eval(t);      
    if (e === Infinity || e === -Infinity || isNaN(e)) {
      $result.text("Unable to solve").addClass("error");
      $entry.addClass("error");
      return;      
    }
    else {
      $entry.removeClass("error");
      $result.removeClass("error");
    }  
    
    $result.text(e);
  }
  
  
};
  
  
  Calculator();
  
  
});
