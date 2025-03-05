<?php
namespace Matysiewicz\Core;

/**
 * Add GTM to head directly 
 */
function add_gtm_head() {
    echo "<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MPKZHB');</script>
    <!-- End Google Tag Manager -->";
}

/**
 * Add Google Ads tracking code to pricing pages
 */
function add_google_ads_tracking() {
    ?>
    <!-- Global site tag (gtag.js) - Google Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-977229610"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'AW-977229610', {
        'send_page_view': true
      });
      
      // Define a global function that will be called only when a purchase is completed
      window.trackFreemiusPurchase = function(transactionId, orderTotal, planId, planName) {
          gtag('event', 'conversion', {
              'send_to': 'AW-977229610/YUzpCMKIsqYaEKqu_dED',
              'value': orderTotal,
              'currency': 'USD',
              'transaction_id': transactionId
          });
          
          // Enhanced ecommerce tracking
          gtag('event', 'purchase', {
              'transaction_id': transactionId,
              'value': orderTotal,
              'currency': 'USD',
              'items': [{
                  'id': planId,
                  'name': planName,
                  'quantity': 1,
                  'price': orderTotal
              }]
          });
      };
    </script>
    <?php
}

/**
 * Add GTM noscript iframe
 */
function add_gtm_body() {
    echo "<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-MPKZHB'
    height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->";
}

/**
 * Add LinkedIn tracking
 */
function add_linkedin_tracking() {
    ?>
    <!-- LinkedIn -->
    <script type="text/javascript">
    _linkedin_partner_id = "4206409";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    </script><script type="text/javascript">
    (function(l) {
    if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
    window.lintrk.q=[]}
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);})(window.lintrk);
    </script>
    <noscript>
    <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=4206409&fmt=gif" />
    </noscript>
    <!-- End LinkedIn -->
    <?php
}

/**
 * Add error monitoring
 */
function add_script_monitoring() {
    ?>
    <!-- Script error monitoring -->
    <script>
    window.scriptLoadErrors = [];
    window.addEventListener('error', function(e) {
        if (e.target && e.target.tagName === 'SCRIPT') {
            window.scriptLoadErrors.push({
                src: e.target.src,
                time: new Date().toISOString()
            });
            console.error('Script loading error:', e.target.src);
        }
    }, true);
    </script>
    <?php
}

/**
 * Fix for WPForms JavaScript error
 */
function fix_wpforms_script_loading() {
    // Only add if WPForms is active
    if (function_exists('wpforms')) {
        ?>
        <script>
            // Define wpforms_settings if it doesn't exist to prevent errors
            window.wpforms_settings = window.wpforms_settings || {
                // Default settings
                ajax_url: '<?php echo admin_url('admin-ajax.php'); ?>',
                empty_error: '<?php esc_html_e('Please fill out this field', 'wpforms'); ?>',
                nonce: '<?php echo wp_create_nonce('wpforms-frontend'); ?>'
            };
        </script>
        <?php
    }
}

/**
 * Initialize the integrations
 */
function init() {
    // Only load scripts for front-end
    if (!is_admin()) {
        add_action('wp_head', __NAMESPACE__ . '\\add_script_monitoring', 1);
        add_action('wp_head', __NAMESPACE__ . '\\add_gtm_head', 2);
        add_action('wp_head', __NAMESPACE__ . '\\add_google_ads_tracking', 3);
        add_action('wp_head', __NAMESPACE__ . '\\fix_wpforms_script_loading', 5);
        add_action('wp_body_open', __NAMESPACE__ . '\\add_gtm_body', 1);
        add_action('wp_footer', __NAMESPACE__ . '\\add_linkedin_tracking', 25);
    }
}

// Initialize the module
init();