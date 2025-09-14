
let budgetValue = 0;          
let totalExpensesValue = 0;   
let expenseEntries = [
  ['groceries', 33],
  ['restaurants', 50],
  ['transport', 12],
  ['home', 70],
  ['subscriptions', 14],
  ['groceries', 28],
  ['subscriptions', 12],
];
let balanceColor = 'green';

const CATEGORIES = ['groceries', 'restaurants', 'transport', 'home', 'subscriptions'];


function recalcTotalExpenses() {
  let sum = 0;
  for (const entry of expenseEntries) {
    const amount = Number(entry[1]);
    if (!Number.isNaN(amount)) sum += amount;
    //console.log(sum)
  }
  totalExpensesValue = sum;
}
recalcTotalExpenses(); 

function calculateAverageExpense() {
  const count = expenseEntries.length;
  if (count === 0) return 0;
  return totalExpensesValue / count;
}

function calculateBalance() {
  return budgetValue - totalExpensesValue;
}

function updateBalanceColor() {
  const balance = calculateBalance();

  if (balance < 0) {
    balanceColor = 'red';
    return balanceColor;
  }

  if (budgetValue > 0) {
    const threshold = budgetValue * 0.25;
    balanceColor = balance < threshold ? 'orange' : 'green';
  } else {
       balanceColor = 'green';
  }
  return balanceColor;
}
updateBalanceColor();


function calculateCategoryExpenses(categoryName) {
  let sum = 0;
  for (const [cat, amount] of expenseEntries) {
    if (cat === categoryName) {
      const n = Number(amount);
      if (!Number.isNaN(n)) sum += n;
    }
  }
  return sum;
}

function calculateLargestCategory() {
  let maxCat = CATEGORIES[0] || '';
  let maxVal = -Infinity;

  for (const cat of CATEGORIES) {
    const total = calculateCategoryExpenses(cat);
    if (total > maxVal) {
      maxVal = total;
      maxCat = cat;
    }
  }
  return maxCat;
}

function addExpenseEntry(entry) {
  if (!Array.isArray(entry) || entry.length !== 2) return;

  const [category, rawAmount] = entry;
  const amount = Number(rawAmount);

  if (!CATEGORIES.includes(category)) return;
  if (Number.isNaN(amount) || amount <= 0) return;

  expenseEntries.push([category, amount]);
  totalExpensesValue += amount; 
  updateBalanceColor();
}


