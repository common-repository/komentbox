<?php

    if (defined('KOMENTBOX_ALLOW_INCLUDE') === false)
        die('no direct access');

?>

<div class="wrap">
   <a name="nlpcaptcha"></a>
   <h2><?php _e('KomentBox Options', 'komentbox'); ?></h2>
   <p><?php _e('NLPCaptcha is a free, accessible CAPTCHA service that helps to digitize books while blocking spam on your blog.', 'komentbox'); ?></p>
   
   <form method="post" action="options.php">
      <?php settings_fields('komentbox_options_group'); ?>

      <h3><?php _e('Authentication', 'komentbox'); ?></h3>
      <p><?php _e('These keys are required before you are able to do anything else.', 'komentbox'); ?> <?php _e('You can get the keys', 'komentbox'); ?> <a href="http://nlpcaptcha.in" title="<?php _e('Get your NLPCaptcha API Keys', 'nlpcaptcha'); ?>"><?php _e('here', 'nlpcaptcha'); ?></a>.</p>
      <p><?php _e('Be sure not to mix them up! The public and private keys are not interchangeable!'); ?></p>
      
      <table class="form-table">
         <tr valign="top">
            <th scope="row"><?php _e('Publisher Key', 'komentbox'); ?></th>
            <td>
               <input type="text" name="komentbox_options[publisherkey]" id="publisherkey" size="40" value="<?php echo $this->options['publisherkey']; ?>" />
            </td>
         </tr>
         <tr valign="top">
            <th scope="row"><?php _e('Validate Key', 'komentbox'); ?></th>
            <td>
               <input type="text" name="komentbox_options[validatekey]" size="40" value="<?php echo $this->options['validatekey']; ?>" />
            </td>
         </tr>
            <tr valign="top">
            <th scope="row"><?php _e('Private Key', 'komentbox'); ?></th>
            <td>
               <input type="text" name="komentbox_options[privatekey]" size="40" value="<?php echo $this->options['privatekey']; ?>" />
            </td>
         </tr>
      </table>
      
      <h3><?php _e('Comment Options', 'komentbox'); ?></h3>
      <table class="form-table">
         <tr valign="top">
            <th scope="row"><?php _e('Activation', 'komentbox'); ?></th>
            <td>
               <input type="checkbox" id ="komentbox_options[show_in_comments]" name="komentbox_options[show_in_comments]" value="1" <?php checked('1', $this->options['show_in_comments']); ?> />
               <label for="komentbox_options[show_in_comments]"><?php _e('Enable for comments form', 'komentbox'); ?></label>
            </td>
         </tr>
         
        
      </table>
      
      
      <p class="submit"><input type="submit" class="button-primary" title="<?php _e('Save Komentbox Options') ?>" value="<?php _e('Save Komentbox Changes') ?> &raquo;" /></p>
   </form>
   
   <h2>Export and Import Comments</h2>

        <table class="form-table">
            <?php if (KOMENTBOX_EXPORT_CAPABILITY): ?>
            <tr id="export">
                <th scope="row" valign="top"><?php echo _e('Export comments to Komentbox', 'komentbox'); ?></th>
                <td>
                    <div id="kb_export">
                        <form method="POST" action="">
                        <?php wp_nonce_field('kb-wpnonce_export', 'kb-form_nonce_export', 'komentbox'); ?>
                            <p class="status">
                                <a href="javascript:;" class="button"><?php echo _e('Export Comments', 'komentbox'); ?></a>  
                                <?php echo _e('This will export your existing WordPress comments to Komentbox', 'komentbox'); ?>
                            </p>
                        </form>
                    </div>
                </td>
            </tr>
            <?php endif; ?>
            <tr>
                <th scope="row" valign="top"><?php echo _e('Import Komentbox with WordPress', 'komentbox'); ?></th>
                <td>
                    <div id="kb_import">
                        <form method="POST" action="">
                        <?php wp_nonce_field('kb-wpnonce_import', 'kb-form_nonce_import', 'komentbox'); ?>
                            <div class="status">
                                <p>
                                    <a href="javascript:;" class="button"><?php echo _e('Import Comments', 'komentbox'); ?></a>  
                                    <?php echo _e('It will download your Komentbox comments to store them locally in WordPress', 'komentbox'); ?>
                                </p>
                                <!--label>
                                    <input type="checkbox" id="kb_import_wipe" name="kb_import_wipe" value="1"/> 
                                    <?php //echo _e('Remove all imported Komentbox comments before syncing.', 'komentbox'); ?>
                                </label-->
                                <br/>
                            </div>
                        </form>
                    </div>
                </td>
            </tr>
        </table>
   
   <?php do_settings_sections('komentbox_options_page'); ?>
</div>