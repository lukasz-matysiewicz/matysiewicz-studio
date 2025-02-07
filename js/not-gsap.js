document.addEventListener('DOMContentLoaded', function() {
    const pricing = {
        annual: {
            single: { 
                price: '39.00', 
                regular_price: '49.00', 
                link: '/?add-to-cart=895&variation_id=923' },
            multiple: { 
                price: '79.00', 
                regular_price: '99.00', 
                link: '/?add-to-cart=895&variation_id=924' }
        },
        lifetime: {
            single: { 
                price: '119.00', 
                regular_price: '149.00', 
                link: '/?add-to-cart=895&variation_id=925' },
            multiple: { 
                price: '239.00', 
                regular_price: '299.00', 
                link: '/?add-to-cart=895&variation_id=926' }
        }
    };

    let currentPeriod = 'annual';
    let currentWebsite = 'single';

    function updatePrice() {
        const priceData = pricing[currentPeriod][currentWebsite];
        document.querySelector('.current-price').textContent = priceData.price;
        document.querySelector('.regular-price').textContent = priceData.regular_price;
        document.getElementById('pricing-cta').href = priceData.link;
    }

    document.querySelectorAll('.period-toggle .toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.period-toggle .toggle-button').forEach(b => 
                b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            updatePrice();
        });
    });

    document.querySelectorAll('.website-toggle .toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.website-toggle .toggle-button').forEach(b => 
                b.classList.remove('active'));
            this.classList.add('active');
            currentWebsite = this.dataset.website;
            updatePrice();
        });
    });
});