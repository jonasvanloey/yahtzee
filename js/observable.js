// https://www.joezimjs.com/javascript/javascript-design-patterns-observer/

function Observable() {
	
	// Create reference to this by renaming this, so you can still use this inside functions
	var _self = this;

	// members that will collect necessary data
	_self.data;
    _self.subscribers = []

    // Public methods
	_self.methods = {

		// Triggered when data is set (using publish method)
	    subscribe: function(callback) {
	        // In most situations, you would check to see if the
	        // callback already exists within the subscribers array,
	        // but for the sake of keeping us on track and because
	        // this isn't necessarily included, we'll leave it out.
	        // Just add the callback to the subscribers list
	        _self.subscribers.push(callback);
	    },

	    unsubscribe: function(callback) {
	        var i = 0,
	            len = _self.subscribers.length;
	        // Iterate through the array and if the callback is
	        // found, remove it.
	        for (; i < len; i++) {
	            if (_self.subscribers[i] === callback) {
	                _self.subscribers.splice(i, 1);
	                // Once we've found it, we don't need to
	                // continue, so just return.
	                return;
	            }
	        }
	    },

	    // Used to set and retrieve current value
	    publish: function( data ) {

	    	if (typeof data !== 'undefined') {

		    	_self.data = data;
		        // Iterate over the subscribers array and call each of
		        // the callback functions.
		        for (var subscriberKey = 0; subscriberKey < _self.subscribers.length; ++subscriberKey) {
		            _self.subscribers[ subscriberKey ](data);
		        }
	    	} else {
	    		return _self.data
	    	}
	    }
	}

	return _self.methods
};

// Create an object that will contain all the data for the yahtzee project
var yahtzeeModel = {
	'score'	: 	new Observable(),
	'dices'	:	[]
}

// Score functionality
// Score subscriptions, get executed when score changes
yahtzeeModel.score.subscribe(function updateScore() {

	// Add newly published score to HTML
    $('.score-value').html( yahtzeeModel.score.publish() ); 

})

// Function that calculates entire score
// Executed when dice value changes
function evaluateScore( ) {

	// Set total score to 0
	var score = 0;

	// Loop over all dices in the yahtzeeModel
	yahtzeeModel.dices.forEach( function( value ) {

		// When a new dice is created, it hasn't got a value yet
		// Check if the dice has a value, if so add value to the score
		if ( typeof value.publish() !== 'undefined' ) {
			score += value.publish();
		}
	})

	// Publish the score
	yahtzeeModel.score.publish( score );


}


// Dice functionality
// Loop over all dices found in HTML
$('.dice').each( function(){

	// Create new Dice observable
	var newDice = createNewDice( $( this ) );

	// Add dice to model
	yahtzeeModel.dices.push( newDice );

	// Get key of lastly added dice
	var lastlyAddedDiceKey = yahtzeeModel.dices.length - 1
	
	// Retrieve lastly added dice from model
	var currentDice = yahtzeeModel.dices[ lastlyAddedDiceKey ];
    currentDice.isVast = false;
    currentDice.element = $(this);
    
    currentDice.throwIndividualDice = function() {
        
        if ( !currentDice.isVast )
        {
        // Generate number between 1-6
        var randomNumber = Math.floor( Math.random() * 6  ) + 1

        // Update dice value
        currentDice.publish( randomNumber );
        
        }
    }
    
    $( this ).find('.hold').on('click', function() {
    
        console.log("test");
        $(this).toggleClass("holdit");
        
        if ( currentDice.isVast === false) {
            currentDice.isVast = true;
        } else {
            currentDice.isVast = false;
        };
    })
    

})
var value = [] ;

var ones;
var twos;
var threes;
var fours;
var fives;
var sixes;

// Add event listener to button in dice
	$ ('.throw').on('click', function() {
       
        value = [];


		yahtzeeModel.dices.forEach( function( dice ) {
            
            dice.throwIndividualDice();       
       
        
            
       value.push(dice.publish());
          console.log(value);
         
       
          
          
          
        
          
        });
        ones=0;
        twos=0;
        threes=0;
        fours=0;
        fives=0;
        sixes=0;
          
            
           
           
          for (i=0;i<=5;i++)
          {
           while(value[1] == value[i])
           {
               var yahtzee= 50;
               i++;
               
               
           }
          console.log(yahtzee);
        
          }
          
           for (i=0;i<5;i++)
          {
           if(value[i] ==1)
           {
               ones +=1;
           }
            if(value[i] ==2)
           {
               twos +=2;
           }
              if(value[i] ==3)
           {
               threes +=3;
           }
              if(value[i] ==4)
           {
               fours +=4;
           }
              if(value[i] ==5)
           {
               fives +=5;
           }
              if(value[i] ==6)
           {
               sixes +=6;
           }
        
          }
         console.log(ones);
         console.log(twos);
         console.log(threes);
         console.log(fours);
         console.log(fives);
         console.log(sixes);
        value.length=5;

        //kleine straat
        console.log(value);

        value = value.sort();
        var small_straight;

        if(/1234|2345|3456/.test(value.join("").replace(/(.)\1/,"$1")))
        {
            console.log('kleine straat');
            small_straight=30;
        }

        //grote straat
        var big_straight;
        if(/12345|23456/.test(value.join("").replace(/(.)\1/,"$1")))
        {
            console.log('grote straat');
            big_straight=40;
        }
        //full house
        var full_house;
        if(/123456/.test(value.join("").replace(/(.)\1/,"$1")))
        {
            console.log('full house');
            full_house=50;
        }


        console.log(value);

		
	});

	function sumAndBonus(){
		
		//sum
        
        var sum = ones + twos + threes + fours + fives + sixes;

  		if (ones>0 && twos>0 && threes>0 && fours>0 && fives>0 && sixes>0) 
  		{
        	console.log(sum);
    	}
        
        //bonus
        
        var bonus;

        if(sum > 63)
        {
        	bonus = 35;
        	console.log(bonus);
        }
    }




// Functionality used to make creation of die easier
// @container jQuery object
function createNewDice( container ) {

	// Create new observable
	var dice = new Observable();

	// Add subscription to observable
	dice.subscribe(function( data ){
		// Recalculate score when dice is cast
		dice.subscribe( evaluateScore );
		// Update dice HTM value
		container.find( '.dice-value' ).html( data )
	});

	// Return observable
	return dice;
}

var count = 1;
var countFunc = function(){	
    	console.log(count)
    	count ++;
    	if (count > 4) {
    		$('.throw').off('click');
    	}
}






    
 


