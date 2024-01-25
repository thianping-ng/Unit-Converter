let conversionFactor;

fetch("conversionFactors.json")
.then(response => response.json())
.then(data => {
    conversionFactor = data;
})
.catch(error =>{
    console.error('Error fetching conversion factors:', error);
});

const categoryDropdown = document.getElementById("category"),
fromDropdown = document.getElementById("from-unit"),
toDropdown = document.getElementById("to-unit"),
result = document.getElementById("result");

categoryDropdown.addEventListener("click", ()=>{
    populateDropdown(categoryDropdown, Object.keys(conversionFactor));
})

fromDropdown.addEventListener("click", ()=>{
    const selectedCategory = categoryDropdown.querySelector(".selected").textContent;
    if(selectedCategory){
        populateDropdown(fromDropdown, Object.keys(conversionFactor[selectedCategory]));
    }
});

toDropdown.addEventListener("click", ()=>{
    const selectedCategory = categoryDropdown.querySelector(".selected").textContent;
    if(selectedCategory){
        populateDropdown(toDropdown, Object.keys(conversionFactor[selectedCategory]));
    }
});

function populateDropdown(dropdown, items){
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    dropdownContent.innerHTML = '';

    items.forEach(item=>{
        const option = document.createElement('span');
        option.textContent = item;
        option.classList.add("values");
        option.addEventListener("click", ()=>{
            const selectedText = option.textContent,
            selectedDropdown = dropdown.querySelector(".selected");
            selectedDropdown.textContent = selectedText;
        });
        dropdownContent.appendChild(option);
    });
    dropdownContent.classList.add("open");
}

const dropdowns = document.querySelectorAll(".custom-dropdown");

dropdowns.forEach(dropdown =>{
    const dropdownContent = dropdown.querySelector(".dropdown-content"),
    items = dropdownContent.querySelectorAll(".values");

    items.forEach(item =>{
        item.addEventListener("click", ()=>{
            const selectedText = item.textContent,
            selectedDropdown = dropdown.querySelector(".selected");
            selectedDropdown.textContent = selectedText;
        });

    });

    document.addEventListener("click", event =>{
        if(!dropdown.contains(event.target)){
            dropdownContent.classList.remove("open");
        }
    });
});

document.getElementById("convert").addEventListener("click", ()=>{
    const inputValue = parseFloat(document.getElementById("user-value").value),
    category = categoryDropdown.querySelector('.selected') ? categoryDropdown.querySelector('.selected').textContent:"",
    fromUnit = fromDropdown.querySelector(".selected") ? fromDropdown.querySelector(".selected").textContent:"",
    toUnit = toDropdown.querySelector(".selected") ? toDropdown.querySelector(".selected").textContent:"";

    if(category && fromUnit && toUnit === "Choose")return

    if(category && fromUnit && toUnit){
        const conversionfactor = conversionFactor[category][fromUnit][toUnit],
        convertedValues = inputValue * conversionfactor;
        result.textContent = `${inputValue} ${fromUnit} = ${convertedValues.toFixed(2)} ${toUnit}`;
    }
    else{
        result.textContent = "Invalid conversion";
    }
})

document.getElementById("reset").addEventListener("click", ()=>{
    const selectedDropdown = document.querySelectorAll(".selected");
    selectedDropdown.forEach(selectedDropdown =>{
        selectedDropdown.textContent = "Choose";
    });

    document.getElementById("user-value").placeholder = "0";
    result.innerHTML = "0";
})

