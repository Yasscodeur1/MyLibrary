<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],  // Permet toutes les méthodes HTTP (GET, POST, etc.)

    'allowed_origins' => ['*'],  // Permet toutes les origines],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Permet toutes les en-têtes

    'exposed_headers' => [],

    'max_age' => 0,  // Délai pour la mise en cache des résultats des pré-vols CORS

    'supports_credentials' => true,  // Permet l'envoi de cookies et autres informations d'authentification

];
