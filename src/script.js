const incomes = [];
const expenses = [];

// DOM-element
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const transactionList = document.getElementById('transactionList');
const balanceDisplay = document.getElementById('balance');


function createTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Fyll i en giltig beskrivning och ett positivt belopp.");
    return;
  }

  const transaction = {
    description,
    amount,
    type
  };


  if (type === 'income') {
    incomes.push(transaction);
    addToList(transaction, incomeList);
  } else {
    expenses.push(transaction);
    addToList(transaction, expenseList);
  }

  addToTransactionList(transaction);
  updateBalance();
  clearInputs();
}

// Funktion: Lägg till en transaktion i en lista (inkomst/utgift)
function addToList(transaction, listElement) {
  const li = document.createElement('li');
  li.textContent = `${transaction.description}: ${transaction.amount} kr`;
  listElement.appendChild(li);
}

// Funktion: Lägg till transaktionen i den övergripande transaktionslistan
function addToTransactionList(transaction) {
  const li = document.createElement('li');
  li.textContent = `${transaction.type === 'income' ? 'Inkomst' : 'Utgift'} - ${transaction.description}: ${transaction.amount} kr`;
  transactionList.appendChild(li);
}

// Funktion: Uppdatera saldot
function updateBalance() {
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const total = incomeTotal - expenseTotal;

  balanceDisplay.textContent = total;
}

// Funktion: Rensa inputfält
function clearInputs() {
  descInput.value = '';
  amountInput.value = '';
  descInput.focus();
}

// Eventlyssnare för knapparna
incomeBtn.addEventListener('click', () => createTransaction('income'));
expenseBtn.addEventListener('click', () => createTransaction('expense'));

