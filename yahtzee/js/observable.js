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
    
       
        $(this).toggleClass("holdit");
        
        if ( currentDice.isVast === false) {
            currentDice.isVast = true;
        } else {
            currentDice.isVast = false;
        };
    })
    

})
var count = 1;
var totalscore;
var value = [] ;
var ones;
var twos;
var threes;
var fours;
var fives;
var sixes;
var yahtzee;
var three_of_a_kind;
var four_of_a_kind;
 var small_straight;
 var big_straight;
var full_house;
var chance;
var usedones = false;
var usedtwos = false;
var usedthrees = false;
var usedfours = false;
var usedfives = false;
var usedsixes=false;

var usedtok =  false;
var usedfok = false;
var usedss = false;
var usedbs = false;
var usedfh = false;
var usedchance = false;
var usedyahtzee = false;
var ingebruik;
var isClicked = false;
// Add event listener to button in dice
	$ ('.throw').on('click', function() {
        
        isClicked = false;
       
        value = [];


		yahtzeeModel.dices.forEach( function( dice ) {
            
            dice.throwIndividualDice();       
       
        
            
       value.push(dice.publish());
         
         
       
          
          
         
        
          
        });
       
        ingebruik = 0;
        var countones =0;
        var counttwos =0;
        var countthrees =0;
        var countfours =0;
        var countfives = 0;
        var countsixes = 0;


if(!usedones)
{
    ones=0;
    for (i=0;i<5;i++)
    {
        if(value[i] ==1)
        {
            countones +=1;
            ones +=1;

        }
        if(countones ==0)
        {
            ones= 0;
            document.getElementById("ones").innerHTML = " ";
        }
        else
        {
            ingebruik +=1;
            document.getElementById("ones").innerHTML = ones;
        }
    }
}
else
{
    document.getElementById("ones").innerHTML =ones;
               
}

if (!usedtwos)
{
    twos =0;
    for (i=0;i<5;i++)
    {
         if(value[i] ==2)
           {
               counttwos +=1;
               twos +=2;
                
           }
              if( counttwos ==0)
              {
                  twos =0;
                  document.getElementById("twos").innerHTML =" ";
              }
              else
              {
                  ingebruik +=1;
              document.getElementById("twos").innerHTML = twos;
              }
    }
}
else
{
    document.getElementById("twos").innerHTML = twos;
}
if (!usedthrees)
{
    threes =0;
    for (i=0;i<5;i++)
    {
         if(value[i] ==3)
           {
               countthrees +=1;
               threes +=3;
              
           }
                
               if(countthrees ==0)
               {
                   threes =0;
                   document.getElementById("threes").innerHTML=" ";
                   
               }
              else
              {
                  ingebruik +=1;
              document.getElementById("threes").innerHTML = threes;
              }
    }
}
else
{
    document.getElementById("threes").innerHTML = threes;
}
if (!usedfours)
{
    fours =0;
    for (i=0;i<5;i++)
    {
         if(value[i] ==4)
           {
               countfours +=1;
               fours +=4;
                
           }
              if(countfours ==0)
              {
                  fours =0;
                  document.getElementById("fours").innerHTML = " ";
              }
              else
              {
                  ingebruik +=1;
              document.getElementById("fours").innerHTML = fours;
              }
    }
}
else
{
    document.getElementById("fours").innerHTML = fours;
}
if (!usedfives)
{
    fives =0;
    for (i=0;i<5;i++)
    {
         if(value[i] ==5)
           {
               countfives +=1;
               fives +=5;
                
           }
              if (countfives ==0)
              {
                  fives=0;
                  document.getElementById("fives").innerHTML = " ";
              }
              else
              {
                  ingebruik +=1;
              document.getElementById("fives").innerHTML = fives;
              }
    }
}
else
{
    document.getElementById("fives").innerHTML = fives;
}
if (!usedsixes)
{
    sixes =0;
    for (i=0;i<5;i++)
    {
         if(value[i] ==6)
           {
               countsixes +=1;
               sixes +=6;
                
           }
              if(countsixes ==0)
              {
                  sixes =0;
                  document.getElementById("sixes").innerHTML =" ";
              }
              else
              {
                  ingebruik +=1;
              document.getElementById("sixes").innerHTML = sixes;
              }
    }
}
else
{
    document.getElementById("sixes").innerHTML = sixes;
}
   

        
        value.length=5;
    

        value = value.sort();


if(!usedyahtzee)
{
     yahtzee = 0;
     var isyahtzee = false;
        for (var i = 1;i<=6;i++)
        {
            var count = 0;
            for(var j =0;j<5;j++)
            {

                if (value[j]== i)
                {

                    count++;
                }
                if (count >4 )
                {



                   isyahtzee= true;
                    
                }


            }

        }

        if(isyahtzee)
        {
            yahtzee = 50;
        }
        
        if (yahtzee ==0)
        {
            document.getElementById("yahtzee").innerHTML=" ";

        }
        else
        {
            ingebruik +=1;
            document.getElementById("yahtzee").innerHTML=yahtzee;

        }
}
else
{
 document.getElementById("yahtzee").innerHTML=yahtzee;   
}


        
if(!usedtok)
{
       three_of_a_kind=0;
        var threeofakind = false;

        for (var i = 1;i<=6;i++)
        {
            var count = 0;
            for(var j =0;j<5;j++)
            {

                if (value[j]== i)
                {

                    count++;
                }
                if (count >2 )
                {



                    threeofakind = true;
                  
                }


            }

        }

        if(threeofakind)
        {
            for(var k =0;k<5;k++)
            {
                three_of_a_kind+=value[k];
            }
        }
        
        if (three_of_a_kind == 0)
        {
            document.getElementById("threeofakind").innerHTML= "";
        }
        else
        {
            ingebruik +=1;
            document.getElementById("threeofakind").innerHTML=three_of_a_kind;
        }
}
else
{
    document.getElementById("threeofakind").innerHTML=three_of_a_kind;
}
if(!usedfok)
{
    four_of_a_kind = 0;
        var fourofakind = false;
        for (var i = 1;i<=6;i++)
        {
            var count = 0;
            for(var j =0;j<5;j++)
            {

                if (value[j]== i)
                {

                    count++;
                }
                if (count >3 )
                {



                    fourofakind= true;
                    
                }


            }

        }

        if(fourofakind)
        {
            for(var k =0;k<5;k++)
            {
                four_of_a_kind+=value[k];
            }
        }
        
        if (four_of_a_kind ==0)
        {
            document.getElementById("fourofakind").innerHTML=" ";

        }
        else
        {
            ingebruik +=1;
            document.getElementById("fourofakind").innerHTML=four_of_a_kind;

        }
}
else
{
    document.getElementById("fourofakind").innerHTML=four_of_a_kind;
}
if (!usedchance)
{
      chance =0;
        for(var j =0;j<5;j++)
            {
                chance += value[j];


            }

        
        if (chance ==0)
        {
           document.getElementById("chance").innerHTML=" "; 
        }
        else
        {
            ingebruik +=1;
            document.getElementById("chance").innerHTML=chance;
        }
}
else
{
    document.getElementById("chance").innerHTML=chance;
}
        
if(!usedss)
{
     small_straight=0; if(/1234|2345|3456/.test(value.join("").replace(/(.)\1/,"$1")))
        {
            
            small_straight=30;
            
        }
        if (small_straight ==0)
        {
            document.getElementById("smalls").innerHTML=" ";
        }
        else
        {
            ingebruik +=1;
            document.getElementById("smalls").innerHTML=small_straight;
        }

}
else
{
    document.getElementById("smalls").innerHTML=small_straight;
}
      
if (!usedbs)
{
     big_straight=0; 
        if(/12345|23456/.test(value.join("").replace(/(.)\1/,"$1")))
        {
            
            big_straight=40;
        }
        if (big_straight ==0)
        {
            document.getElementById("larges").innerHTML=" ";
        }
        else
        {
            ingebruik +=1;
            document.getElementById("larges").innerHTML= big_straight;
        }
}
else
{
    document.getElementById("larges").innerHTML= big_straight;    
}

      
if(!usedfh)
{
    full_house = 0;
      
        if( (((value[0] == value[1]) && (value[1] == value[2])) && // Three of a Kind
            (value[3] == value[4]) && // Two of a Kind
            (value[2] != value[3])) ||
            ((value[0] == value[1]) && // Two of a Kind
            ((value[2] == value[3]) && (value[3] == value[4])) && // Three of a Kind
            (value[1] != value[2])) )
        {
            full_house = 25;
           
            
        }
        if (full_house ==0)
        {
            document.getElementById("fullh").innerHTML=" ";
        }
        else
        {
            ingebruik +=1;
            document.getElementById("fullh").innerHTML=full_house;
        }
}
else
{
    document.getElementById("fullh").innerHTML=full_house;
}
   console.log(ingebruik);
if(ingebruik==0)
{
    document.getElementById("ones").innerHTML =ones;
document.getElementById("twos").innerHTML = twos;
document.getElementById("threes").innerHTML = threes;
document.getElementById("fours").innerHTML = fours;
document.getElementById("fives").innerHTML = fives;
document.getElementById("sixes").innerHTML = sixes;
document.getElementById("yahtzee").innerHTML=yahtzee; 
document.getElementById("threeofakind").innerHTML=three_of_a_kind;
document.getElementById("fourofakind").innerHTML=four_of_a_kind;
document.getElementById("chance").innerHTML=chance;
    document.getElementById("smalls").innerHTML=small_straight;
    document.getElementById("larges").innerHTML= big_straight;  
    document.getElementById("fullh").innerHTML=full_house;
}
        

 
    

	});
var scoresheet = document.getElementsByClassName("scoresheeta");
$('.scoresheeta').click(function lockscore(e)
{
    e.preventDefault();
    if(!isClicked)
    {
    
    var target = e.currentTarget;
    var targetid = target.getAttribute("id");
    target.classList.toggle("redtext");
    console.log('click');
    if(targetid =="one")
    {usedones=true;}
    if(targetid=="two")
    {usedtwos=true;}
    if(targetid =="three")
    {usedthrees=true;}
    if(targetid=="four")
    {usedfours=true;}
    if(targetid =="five")
    {usedfives = true ;}
    if(targetid=="six")
    {usedsixes=true;}
    if(targetid=="tok")
    {usedtok = true;}
    if(targetid=="fok")
    {usedfok=true;}
    if(targetid=="fh")
    {usedfh=true;}
    if(targetid=="ss")
    {usedss=true;}
    if(targetid=="bs")
    {usedbs=true;}
    if(targetid=="chan")
    {usedchance=true;}
    if(targetid=="yah")
    {usedyahtzee=true;}
        yahtzeeModel.dices.forEach(function(dice){ 
            dice.publish(null);
            dice.isVast=false;
        
        })
    
        isClicked=true;
        count = 1;
        document.getElementById('roll').disabled=false;
       
    }
    
  sumAndBonus();
    TotalScore();

})
var sum;
var bonus =0;
function sumAndBonus(){
		
		//sum
        
        

  		if (usedones && usedtwos && usedthrees && usedfours && usedfives && usedsixes) 
  		{
        	sum = ones + twos + threes + fours + fives + sixes;
            document.getElementById("sum").innerHTML=sum;
    	}
        
        //bonus
        
     

        if(sum > 63)
        {
        	bonus = 35;
        	
            document.getElementById("bonus").innerHTML=bonus;
        }
  }

function TotalScore()
{
    var totalscore =0;
    if( usedones && usedtwos && usedthrees && usedfours && usedfives && usedsixes && usedtok  && usedfok && usedss && usedbs && usedfh && usedchance && usedyahtzee )
    {
        totalscore = ones + twos + threes + fours + fives + sixes + sum + bonus + yahtzee + three_of_a_kind + four_of_a_kind + small_straight+ big_straight + full_house + chance;
        document.getElementById("total").innerHTML=totalscore;
        
    }
    console.log(totalscore);
    console.log("total score");
}

function throwcount(){
    console.log(count);
    count ++;
    var knop = document.getElementById('roll');
    if (count > 3) {
        document.getElementById('roll').disabled=true;
    }
    else
    {
        document.getElementById('roll').disabled=false;
    }
}


$('#replay').click(function(){
    window.location.reload();
})
function help(){
    alert(document.getElementById('rules').innerHTML);
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
