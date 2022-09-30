<?php

namespace Automattic\Chatrix\Block;

function register() {
	$block_path = realpath( plugin_dir_path( __FILE__ ) . '../../build-block' );

	add_action(
		'init',
		function () use ( $block_path ) {
			register_block_type(
				"$block_path/block.json",
				array(
					'render_callback' => 'Automattic\Chatrix\Block\render',
				)
			);
		}
	);
}

function render() {
	$iframe_url = plugins_url() . '/chatrix/build/block/app.html';

	ob_start();
	?>
	<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
		<iframe class="<?php echo esc_attr( 'wp-block-automattic-chatrix-iframe' ); ?>"
				title="<?php esc_attr_e( 'Chatrix Block', 'chatrix' ); ?>"
				src="<?php echo esc_url( $iframe_url ); ?>"
		></iframe>
	</div>
	<?php
	return ob_get_clean();
}
