<div id="NLPkomentBox" style="clear: both;">

        <div id="NLPkomentBoxContent">
		<?php
		$komentbox_options = get_option('komentbox_options');
		$publisherkey = $komentbox_options['publisherkey'];
                $protocol='http';
  		  if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'
  		    || @$_SERVER['SERVER_PORT'] == 443 || @$_SERVER['HTTP_X_FORWARDED_PROTO']=="https" || @$_SERVER['HTTP_X_FORWARDED_PORT']==443) {
  		    $protocol="https";
  		  }
		?>
		
		<!--Start NLPCaptcha Embed Code -->
		 <script type="text/javascript">
		 var NLPOptions = {
						key:'<?php echo $publisherkey;?>', // PUBLISHER_KEY 
						komentbox_page_identifier: '<?php echo komentbox_page_identifier($post); ?>',  // to identify the current page, If identifier is undefined, the komentbox_page_url will be used
						komentbox_page_url: '<?php echo get_permalink(); ?>', // URL of the current page. If undefined, will take the window.location.href. This URL is used to look up or create a thread if identifier is undefined
						komentbox_page_title: '<?php echo kb_page_title($post); ?>' // the title of the current page,  If undefined, will use the <title> attribute of the page
			};
		  </script>
                  
                  	<?php
                //$script_path="$protocol://komentbox.nlpcaptcha.in/js/comments.js";
                //wp_enqueue_script( 'comments', $script_path,'','',FALSE);
                
                
                ?>
		<script type="text/javascript" src="http://komentbox.nlpcaptcha.in/js/comments.js"></script>
		<!--End NLPCaptcha Embed Code -->

        </div>
</div>

