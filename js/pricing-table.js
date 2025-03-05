document.addEventListener('DOMContentLoaded', function () {
    // Get trigger buttons
    const oneYearTrigger = document.querySelector('.oneyear-trigger');
    const lifetimeTrigger = document.querySelector('.lifetime-trigger');

    // Get all elements that need to be toggled
    const oneYearElements = document.querySelectorAll('.oneyear');
    const lifetimeElements = document.querySelectorAll('.lifetime');

    // Detect page ID to apply the correct color and set plugin and plan IDs
    let activeColor;
    let productId, yearlyPlanId, lifetimePlanId, publicKey, productName;
    
    if (document.body.classList.contains('page-id-807') || document.body.classList.contains('page-id-830')) {
        activeColor = '#FCB901'; // agg-color
        productId = '17854';
        yearlyPlanId = '29840'; 
        lifetimePlanId = '29859';
        publicKey = 'pk_54869a78ba119c25875ba8ed7ba26';
        productName = 'Animated Gutenberg Gallery';
    } else if (document.body.classList.contains('page-id-963') || document.body.classList.contains('page-id-980')) {
        activeColor = '#b30026'; // ags-color
        productId = '17998';
        yearlyPlanId = '29888';
        lifetimePlanId = '29889';
        publicKey = 'pk_3ba60898184252cceb054c5e63b94';
        productName = 'Animated Gutenberg Slider';
    } else {
        activeColor = '#0755B0'; // Default if no match
        // Default to AGG values if no page match
        productId = '17854';
        yearlyPlanId = '29840';
        lifetimePlanId = '29859';
        publicKey = 'pk_54869a78ba119c25875ba8ed7ba26';
        productName = 'Default Product';
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
    if (oneYearTrigger) {
        oneYearTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            toggleButtonStates(oneYearTrigger, lifetimeTrigger);
            toggleVisibility(oneYearElements, lifetimeElements);
        });
    }

    // Click handler for lifetime button
    if (lifetimeTrigger) {
        lifetimeTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            toggleButtonStates(lifetimeTrigger, oneYearTrigger);
            toggleVisibility(lifetimeElements, oneYearElements);
        });
    }

    // Set initial state (show one year by default)
    if (oneYearElements.length && lifetimeElements.length) {
        toggleVisibility(oneYearElements, lifetimeElements);
        if (oneYearTrigger && lifetimeTrigger) {
            toggleButtonStates(oneYearTrigger, lifetimeTrigger);
        }
    }

    // FREEMIUS POPUP CHECKOUT INTEGRATION
    // Initialize Freemius checkout handlers
    if (typeof FS !== 'undefined' && FS.Checkout) {
        // Set the correct image based on which plugin page we're on
        let pluginImage;
        
        if (document.body.classList.contains('page-id-807') || document.body.classList.contains('page-id-830')) {
            // We're on AGG pages (ID 807) - show AGG image
            pluginImage = 'https://matysiewicz.studio/wp-content/uploads/2025/03/agg.jpg';
        } else if (document.body.classList.contains('page-id-963') || document.body.classList.contains('page-id-980')) {
            // We're on AGS pages (ID 963) - show AGS image
            pluginImage = 'https://matysiewicz.studio/wp-content/uploads/2025/03/ags.jpg';
        } else {
            // Default image as fallback
            pluginImage = 'https://matysiewicz.studio/wp-content/uploads/2024/02/favicon512.png';
        }

        // Create handlers for yearly and lifetime plans
        const yearlyHandler = new FS.Checkout({
            product_id: productId,
            plan_id: yearlyPlanId,
            public_key: publicKey,
            image: pluginImage
        });
        
        const lifetimeHandler = new FS.Checkout({
            product_id: productId,
            plan_id: lifetimePlanId,
            public_key: publicKey,
            image: pluginImage
        });

        // Get all plan selection buttons
        const planButtons = document.querySelectorAll('.plan-buttons .wp-block-button a');
        
        // Add click event to all plan buttons
        planButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the parent column to determine which plan was selected
                const column = this.closest('.wp-block-column');
                const planTitle = column.querySelector('h2').textContent.trim();
                
                // Determine license count based on the plan
                let licenseCount = '1'; // Default for Personal
                
                if (planTitle === 'Developer') {
                    licenseCount = '3';
                } else if (planTitle === 'Agency') {
                    licenseCount = 'unlimited';
                }
                
                // Check if this is a lifetime or yearly button
                const isLifetime = this.closest('.wp-block-button').classList.contains('lifetime');
                const handler = isLifetime ? lifetimeHandler : yearlyHandler;
                
                // Open the checkout with the appropriate parameters
                handler.open({
                    name: productName,
                    licenses: licenseCount,
                    purchaseCompleted: function(response) {
                        // This code runs immediately after purchase confirmation
                        console.log('Purchase completed:', response);
                        
                        // Get actual values from the response
                        const transactionId = response.order.id || '';
                        const orderTotal = parseFloat(response.order.total) || 0;
                        const planId = response.order.plan_id || '';
                        const planName = planTitle + ' ' + (isLifetime ? 'Lifetime' : 'Yearly');
                        
                        // Call the global tracking function only if it exists
                        if (typeof window.trackFreemiusPurchase === 'function') {
                            window.trackFreemiusPurchase(transactionId, orderTotal, planId, planName);
                        }
                        
                        // Redirect to thank you page
                        window.location.href = 'https://matysiewicz.studio/thank-you/';
                    },
                    success: function(response) {
                        // This code runs after the customer closes the checkout
                        console.log('Checkout closed after successful purchase:', response);
                    }
                });
            });
        });
    } else {
        console.error('Freemius checkout script is not loaded. Make sure to include the Freemius script.');
    }
});