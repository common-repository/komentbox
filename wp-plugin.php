<?php

class Komentbox_Environment
{

    const WordPress = 1; // regular wordpress
    const WordPressMU = 2; // wordpress mu
    const WordPressMS = 3; // wordpress multi-site

}

abstract class Komentbox_WPPlugin
{

    protected $environment; // what environment are we in
    protected $options_name; // the name of the options associated with this plugin
    protected $options;

    function Komentbox_WPPlugin($options_name)
    {
        $args = func_get_args();
        call_user_func_array(array(&$this, "__construct"), $args);
    }

    function __construct($options_name)
    {
        $this->environment = Komentbox_WPPlugin::kb_determine_environment();
        $this->options_name = $options_name;

        $this->options = get_option($this->options_name);
    }

    // environment checking
    static function kb_determine_environment()
    {
        global $wpmu_version;

        if (function_exists('is_multisite'))
            if (is_multisite())
                return Komentbox_Environment::WordPressMS;

        if (!empty($wpmu_version))
            return Komentbox_Environment::WordPressMU;

        return Komentbox_Environment::WordPress;
    }

    // sub-classes determine what actions and filters to hook
    abstract protected function kb_register_actions();

    //abstract protected function register_filters();
    // options
    abstract protected function kb_register_default_options();

    protected function kb_is_multi_blog()
    {
        return $this->environment != Komentbox_Environment::WordPress;
    }

    // calls the appropriate 'authority' checking function depending on the environment
    protected function kb_is_authority()
    {
        if ($this->environment == Komentbox_Environment::WordPress)
            return is_admin();

        if ($this->environment == Komentbox_Environment::WordPressMU)
            return is_site_admin();

        if ($this->environment == Komentbox_Environment::WordPressMS)
            return is_super_admin();
    }

}

?>
