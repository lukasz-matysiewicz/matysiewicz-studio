<?php
namespace Matysiewicz\Functions;

function custom_login_logo() {
    echo '<style>
        #login h1 a { 
            background-image: url("https://matysiewicz.studio/wp-content/uploads/2023/11/Logo_v.webp") !important; 
            background-size: contain !important; 
            width: 100% !important; 
            height: 60px !important; 
        }
    </style>';
}

add_action('login_head', __NAMESPACE__ . '\\custom_login_logo');