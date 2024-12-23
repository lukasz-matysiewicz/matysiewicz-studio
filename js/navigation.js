/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
initNavigation()
function initNavigation() {
	const siteNavigation = document.getElementById( 'site-navigation' );


	// Return early if the navigation doesn't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button doesn't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

    const checkbox = document.querySelector('.menu-toggle .menu-burger');

	// Function to toggle menu and checkbox state
	const toggleMenu = () => {
		if (!siteNavigation.classList.contains('toggled')) {
			siteNavigation.classList.add('toggled');
			setTimeout(() => siteNavigation.style.opacity = '1', 10); // Slight delay before setting opacity to 1
		} else {
			siteNavigation.style.opacity = '0'; // Start transition to opacity 0
			setTimeout(() => {
				siteNavigation.classList.remove('toggled');
				siteNavigation.style.opacity = '1'; // Reset opacity back to 1
				if (checkbox) {
					checkbox.checked = false; // Uncheck the checkbox
				}
			}, 500); // Wait for 500ms (transition time) before removing the class and resetting opacity
		}
		if (checkbox) {
			checkbox.checked = siteNavigation.classList.contains('toggled');
		}
		button.setAttribute('aria-expanded', siteNavigation.classList.contains('toggled').toString());
	};

	// Function to close the menu
	const closeMenu = () => {
		if (siteNavigation.classList.contains('toggled')) {
			siteNavigation.style.opacity = '0';
			setTimeout(() => {
				siteNavigation.classList.remove('toggled');
				siteNavigation.style.opacity = '1'; // Reset opacity back to 1
				if (checkbox) {
					checkbox.checked = false; // Uncheck the checkbox
				}
				button.setAttribute('aria-expanded', 'false');
			}, 500); // Wait for 500ms (transition time) before removing the class and resetting opacity
		}
	};




    // Toggle menu when button is clicked
    button.addEventListener('click', function(event) {
        // If the clicked element is the checkbox, let the checkbox handler deal with it
        if (event.target !== checkbox) {
            toggleMenu();
        }
    });

    // Toggle menu when checkbox is clicked
    if (checkbox) {
        checkbox.addEventListener('click', function(event) {
            toggleMenu();
            event.stopPropagation(); // Prevent triggering the button's click event
        });
    }

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = siteNavigation.contains(event.target);

        if (!isClickInside && siteNavigation.classList.contains('toggled')) {
            toggleMenu();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );
		}
	}
}
