<?php
/*
Plugin Name: komentbox
Plugin URI: http://www.nlpcaptcha.in/integration/wordpress
Description: Integrates NLPCaptcha anti-spam solutions with wordpress
Version: 3.1.7
Author: NLPCaptcha
Email: support@nlpcaptcha.com
Author URI: http://www.nlpcaptcha.in
*/

define('KOMENTBOX_ALLOW_INCLUDE', true);
define('KOMENTBOX_IMPORTER_URL',       'http://analysis.nlpcaptcha.in/');
define('KOMENTBOX_API_URL',            'http://analysis.nlpcaptcha.in/api/');
define('KOMENTBOX_VERSION',            '3.1.7');
define('KOMENTBOX_IMPORT_TIMEOUT',       30);
define('KOMENTBOX_PLUGIN_URL',plugin_dir_path( __FILE__ ));
define('KOMENTBOX_EXPORT_CAPABILITY',is_file(plugin_dir_path( __FILE__ ) . 'export.php'));
if (!defined('KOMENTBOX_DEBUG')) {
    define('KOMENTBOX_DEBUG',false);
}

require_once(KOMENTBOX_PLUGIN_URL.'komentbox.php');

$nlpcaptcha = new KOMENTBOX_NLPCaptcha('komentbox_options');

?>
