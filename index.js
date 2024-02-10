let knapsackCapacity = 0;
let currentWeight = 0;
let knapsackItems = [];

// Define items that can be selected
const items = [
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Silver', weight: 5, value: 50 },
    { name: 'Food', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Block', weight: 5, value: 50 },
    { name: 'Cement', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Silver', weight: 5, value: 50 },
    { name: 'Food', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Block', weight: 5, value: 50 },
    { name: 'Cement', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Silver', weight: 5, value: 50 },
    { name: 'Food', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Block', weight: 5, value: 50 },
    { name: 'Cement', weight: 15, value: 200 },
    { name: 'Gold', weight: 10, value: 100 },
    { name: 'Silver', weight: 5, value: 50 }
  
];

// Knapsack function that returns the items selected based on weight
function knapsack(maxWeight, items) {
    let weight = 0;
    let value = 0;
    const selectedItems = [];

    items.sort((a, b) => b.value / b.weight - a.value / a.weight);

    for (let i = 0; i < items.length; i++) {
        if (weight + items[i].weight <= maxWeight) {
            weight += items[i].weight;
            value += items[i].value;
            selectedItems.push(items[i]);
        }
    }

    return {
        capacity: maxWeight,
        items: selectedItems,
        weight: weight,
        value: value
    };
}

// Update knapsack state function
function updateKnapsackState() {
    const knapsackStateDiv = document.getElementById('knapsack-state');
    knapsackStateDiv.textContent = `Current Weight: ${currentWeight} / Maximum Weight: ${knapsackCapacity}`;
    
    if (currentWeight <= knapsackCapacity) {
        knapsackStateDiv.style.color = 'green';
    } else {
        knapsackStateDiv.style.color = 'red';
    }
}

document.getElementById('done-btn').addEventListener('click', function() {
    const result = knapsack(knapsackCapacity, knapsackItems);
    
    const finalKnapsackStateDiv = document.getElementById('final-knapsack-state');
    finalKnapsackStateDiv.textContent = JSON.stringify(result);
});

// Populate items list
const itemsList = document.getElementById('items-list');
items.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.textContent = `${item.name} - Weight: ${item.weight} - Value: ${item.value}`;
    
    itemElement.addEventListener('click', () => {
        if (knapsackCapacity === 0) {
            alert('Please enter a Maximum Weight first!');
            return;
        }
        
        if (currentWeight + item.weight <= knapsackCapacity) {
            currentWeight += item.weight;
            knapsackItems.push(item);
            updateKnapsackState();
        }
    });
    
    itemsList.appendChild(itemElement);
});

// Input field for maximum weight
document.getElementById('max-weight').addEventListener('change', function() {
    knapsackCapacity = parseInt(this.value, 10);
    updateKnapsackState();
});