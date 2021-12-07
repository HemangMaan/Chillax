document.addEventListener("keydown", function(inEvent){
    if (inEvent.keyCode == 40) { 
      window.scrollBy({ 
        top: 500, // negative value acceptable
        left: 0, 
        behavior: 'smooth' 
      });
    }
    if (inEvent.keyCode == 38) { 
      window.scrollBy({ 
        top: -300, // negative value acceptable
        left: 0, 
        behavior: 'smooth' 
      });
    }
  });