document.addEventListener('DOMContentLoaded', function () {
    // Get trigger buttons
    const oneYearTrigger = document.querySelector('.oneyear-trigger');
    const lifetimeTrigger = document.querySelector('.lifetime-trigger');

    // Get all elements that need to be toggled
    const oneYearElements = document.querySelectorAll('.oneyear');
    const lifetimeElements = document.querySelectorAll('.lifetime');

    // Detect page ID to apply the correct color
    let activeColor;
    if (document.body.classList.contains('page-id-807') || document.body.classList.contains('page-id-830')) {
        activeColor = '#FCB901'; // agg-color
    } else if (document.body.classList.contains('page-id-963') || document.body.classList.contains('page-id-980')) {
        activeColor = '#b30026'; // ags-color
    } else {
        activeColor = '#0755B0'; // Default if no match
    }

    // Function to toggle active state of buttons
    function toggleButtonStates(activeButton, inactiveButton) {
        // Add active state to clicked button
        activeButton.querySelector('.wp-block-button__link').style.backgroundColor = activeColor;
        activeButton.querySelector('.wp-block-button__link').classList.remove('has-white-background-color');

        // Remove active state from other button
        inactiveButton.querySelector('.wp-block-button__link').style.backgroundColor = '';
        inactiveButton.querySelector('.wp-block-button__link').classList.add('has-white-background-color');
    }

    // Function to toggle visibility
    function toggleVisibility(showElements, hideElements) {
        showElements.forEach(element => {
            element.style.display = 'block';
        });

        hideElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Click handler for one-year button
    oneYearTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        toggleButtonStates(oneYearTrigger, lifetimeTrigger);
        toggleVisibility(oneYearElements, lifetimeElements);
    });

    // Click handler for lifetime button
    lifetimeTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        toggleButtonStates(lifetimeTrigger, oneYearTrigger);
        toggleVisibility(lifetimeElements, oneYearElements);
    });

    // Set initial state (show one year by default)
    toggleVisibility(oneYearElements, lifetimeElements);
    toggleButtonStates(oneYearTrigger, lifetimeTrigger);
});
