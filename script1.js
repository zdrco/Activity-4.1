const display = document.querySelector(".display .result");

// Font size functionality
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");

increaseBtn.addEventListener("click", increaseFontSize);
decreaseBtn.addEventListener("click", decreaseFontSize);

function increaseFontSize() {
  modifyFontSize(4); // Increase font size by 4 pixels
}

function decreaseFontSize() {
  modifyFontSize(-4); // Decrease by 4 pixels
}

function modifyFontSize(delta) {
  let currentFontSize = parseInt(window.getComputedStyle(display).fontSize);
  display.style.fontSize = currentFontSize + delta + "px";
}

// Theme toggle functionality
document.querySelector(".theme-btn").addEventListener("click", toggleTheme);

function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.classList[0];

  const themes = ["theme1", "theme2", "theme3"];
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];

  htmlElement.classList.remove(currentTheme);
  htmlElement.classList.add(nextTheme);

  const translateXValues = ["0px", "22px", "40px"];
  const translateX = translateXValues[nextIndex];

  this.style.transform = `translateX(${translateX})`;
}

// Tooltip functionality
document.querySelectorAll('.tooltip').forEach(function(tooltipContainer) {
  const tooltip = tooltipContainer.querySelector('.tooltiptext');

  tooltipContainer.addEventListener('mouseenter', function() {
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    hideTooltip(tooltip);
  });

  tooltipContainer.addEventListener('mouseleave', function() {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  });
});

function hideTooltip(tooltip) {
  setTimeout(function() {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  }, 1600); 
}

// Keyboard input and shortcuts functionality
// User can type through the keyboard instead of clicking the buttons!
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(event) {
  const key = event.key;
  
  if(/[0-9\+\-\*\/\.]/.test(key)) {
    if (display.value !== "ERROR") {
      appendToDisplay(key);
    }
  } else if (key === "Enter") {
    if (display.value !== "ERROR") {
      calculate();
    }
    event.preventDefault();
  } else if (key === "Backspace") {
    if (display.value !== "ERROR") {
      del();
    }
  } else if (key === "r" || key === "R") {
    reset();
  }
}

// Calculator functionality
function appendToDisplay(input) {
  display.value += input;
}

function del() {
  display.value = display.value.slice(0, -1);
}

function reset() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "ERROR";
  }
}
