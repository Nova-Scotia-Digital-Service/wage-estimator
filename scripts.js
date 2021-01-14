// Requires a reference to JQuery before this script is referenced
// The following reference would work or a localized copy of the library (probably preferred)
// <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

// Pseudo Constants //
// Wage Amount Values
var WAGE_TIER_1_AMT = 0;
var WAGE_TIER_2_AMT = 0;
var WAGE_TIER_3_AMT = 0;
var WAGE_TIER_4_AMT = 0; //This variable is for the "old amount" that would show their previous amount
var WAGE_TIER_5_AMT = 0; //This variable is for the "old amount" that would show their previous amount


// Wage Rate Values
var WAGE_TIER_0_RATE = 0;
var WAGE_TIER_1_RATE = 0;
var WAGE_TIER_2_RATE = 0;
var WAGE_TIER_3_RATE = 0;
var WAGE_TIER_4_RATE = 0;// placeholder for the old rate



$(document).ready( function() { 

	// Reset all the sliders back to 0 on refresh 
	$(".slider").val(0);
	
 });

 
function calculateRegular() {

	// Update values for Regular Employment. Change these values if rates changes for regular employment
	WAGE_TIER_1_AMT = 250;
	WAGE_TIER_2_AMT = 500;
	WAGE_TIER_3_AMT = 750;
	WAGE_TIER_4_AMT = 150; // old cut off
	//WAGE_TIER_5_AMT = 151; // old starting point for reductions


	WAGE_TIER_0_RATE = 0.00;
	WAGE_TIER_1_RATE = 0.25;
	WAGE_TIER_2_RATE = 0.50;
	WAGE_TIER_3_RATE = 0.75;
	//WAGE_TIER_4_RATE = 0.70; // old reduction rate


	// Run Calculation
	calculateIAChequeAmt();
}


function calculateSupported() {

	// Update values for Supported Employment 
	WAGE_TIER_1_AMT = 350;
	WAGE_TIER_2_AMT = 500;
	WAGE_TIER_3_AMT = 750;
	WAGE_TIER_4_AMT = 300; // old cut off 
	//WAGE_TIER_5_AMT = 301; // old starting point for reductions

	WAGE_TIER_0_RATE = 0.00;
	WAGE_TIER_1_RATE = 0.25;
	WAGE_TIER_2_RATE = 0.50;
	WAGE_TIER_3_RATE = 0.75; 
	//WAGE_TIER_4_RATE = 0.70; // old reduction rate	
	
	// Run Calculation
	calculateIAChequeAmt();
}
	
	
function calculateIAChequeAmt() {
    
	// Variables
	var wages = parseFloat($("#wages").val());
	var incomeAssist = parseFloat($("#incomeAssist").val());
	var wageReduction = calculateWageReduction(wages, incomeAssist).toFixed(2);
	var oldReduction = calculateOldReduction(wages, incomeAssist).toFixed(2);


	// Update the current slider value (each time you drag the slider handle)
	$("#wagesTotal").text(wages);
	$("#incomeAssistTotal").text(incomeAssist);
	
	// Update Wage Reduction
	$("#totalReduction").text(wageReduction);
	
	// Formulate Reduced Wage Total
	$("#reducedWageTotal").text(incomeAssist - wageReduction + wages);

	//Show old take home pay
	//$("#oldReduction").text(oldReduction);
	
}


function calculateWageReduction(wages, incomeAssist) {
	
	// Variables
	var calcWageReduction = 0; 
	wages = parseFloat(wages);
	incomeAssist = parseFloat(incomeAssist);
	
	switch(true) { 
        case (wages <= WAGE_TIER_1_AMT): 
        	calcWageReduction = (wages * WAGE_TIER_0_RATE); 
        	break; 
        case (wages < WAGE_TIER_2_AMT):
			calcWageReduction = (
									((wages - WAGE_TIER_1_AMT) * WAGE_TIER_1_RATE) +
									(WAGE_TIER_1_AMT  * WAGE_TIER_0_RATE)
								);     
        	break; 
        case (wages < WAGE_TIER_3_AMT): 
        	calcWageReduction = (
									((wages - WAGE_TIER_2_AMT) * WAGE_TIER_2_RATE) + 
									((WAGE_TIER_2_AMT - WAGE_TIER_1_AMT) * WAGE_TIER_1_RATE) + 
									(WAGE_TIER_1_AMT  * WAGE_TIER_0_RATE)
								);    
        	break; 
        case (wages >= WAGE_TIER_3_AMT): 
        	calcWageReduction = (
									((wages - WAGE_TIER_3_AMT) * WAGE_TIER_3_RATE) + 
									((WAGE_TIER_3_AMT - WAGE_TIER_2_AMT) * WAGE_TIER_2_RATE) + 
									((WAGE_TIER_2_AMT - WAGE_TIER_1_AMT) * WAGE_TIER_1_RATE) + 
									(WAGE_TIER_1_AMT  * WAGE_TIER_0_RATE)
								); 
        	break; 
	} 
      
    return ((incomeAssist > calcWageReduction) ? calcWageReduction : incomeAssist); 
      
}

//Old Take Home Amount
function calculateOldReduction(wages, incomeAssist) {
	
	// Variables
	var calcWageReduction = 0; 
	wages = parseFloat(wages);
	incomeAssist = parseFloat(incomeAssist);
	
	switch(true) { 
        case (wages <= WAGE_TIER_4_AMT): 
        	calcWageReduction = (wages * WAGE_TIER_0_RATE); 
        	break; 
        case (wages >= WAGE_TIER_5_AMT):
			calcWageReduction = (
									((wages - WAGE_TIER_5_AMT) * WAGE_TIER_4_RATE) +
									(WAGE_TIER_4_AMT  * WAGE_TIER_0_RATE)
								);     
        	break; 

	} 
      
    return ((incomeAssist > calcWageReduction) ? calcWageReduction : incomeAssist); 
      
}