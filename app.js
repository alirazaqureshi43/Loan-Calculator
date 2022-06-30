// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //  hide results
   document.getElementById('results').style.display = 'none';
  // Show Loader
   document.getElementById('loading').style.display = 'block';

  setTimeout(calResults,1000);
  e.preventDefault();
});


// Calculate 
function calResults(){

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // compute monthly
  const x = Math.pow(1+calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);

     //  Showresults
   document.getElementById('results').style.display = 'block';
   //hide Loader
    document.getElementById('loading').style.display = 'none';

  } else
  {
    // alert('Check your Numbers');
    showError('Check Your Numbers');
  }
}

function showError(error){

   //  hide results
   document.getElementById('results').style.display = 'none';
   //hide Loader
    document.getElementById('loading').style.display = 'none';

  // creat element
  const errorDiv = document.createElement('div');

  // get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // giving class
  errorDiv.className = 'alert alert-danger';

  // add text
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above
  card.insertBefore(errorDiv,heading);

  // clear after 3 sec
  setTimeout(clearError,3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}