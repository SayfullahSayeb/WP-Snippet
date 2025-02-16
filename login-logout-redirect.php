<?php 

// Redirect non-logged-in users to /login/ (except for lost-password and login pages)
// Redirect logged-in users from the login page to /quizzes/
// Redirect users to /quizzes/ on 404 error page
add_action('template_redirect', function() {
    if (is_user_logged_in()) {
        if (is_page('login')) {
            wp_redirect(home_url('/quizzes/'));
            exit();
        }
    } elseif (!is_admin() && !is_page(['login', 'lost-password'])) {
        wp_redirect(home_url('/login/'));
        exit();
    }

    // Redirect users to /quizzes/ if they access a 404 page
    if (is_404()) {
        wp_redirect(home_url('/quizzes/'));
        exit();
    }
});

// Disable logout confirmation and redirect after logout
add_action('init', function() {
    if (isset($_GET['action']) && $_GET['action'] == 'logout' && is_user_logged_in()) {
        wp_logout();
        wp_redirect(home_url());
        exit();
    }
});
