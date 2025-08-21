const incomes = [];
const expenses = [];

const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
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

  updateBalance();
  clearInputs();
}

function addToList(transaction, listElement) {
  const li = document.createElement('li');
  const typeLabel = transaction.type === 'income' ? 'Inkomst' : 'Utgift';
  li.textContent = `${transaction.description} - ${transaction.amount} kr (${typeLabel})`;
  listElement.appendChild(li);
}

function updateBalance() {
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const total = incomeTotal - expenseTotal;
  balanceDisplay.textContent = total.toString();
}

function clearInputs() {
  descInput.value = '';
  amountInput.value = '';
  descInput.focus();
}

incomeBtn.addEventListener('click', () => createTransaction('income'));
expenseBtn.addEventListener('click', () => createTransaction('expense'));
