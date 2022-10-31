<?php

namespace Automattic\Chatrix;

use function Automattic\Chatrix\Block\register as register_block;
use function Automattic\Chatrix\Popup\register as register_popup;
use function Automattic\Chatrix\Sessions\init as init_frontend_session_management;

const LOCAL_STORAGE_KEY_PREFIX = 'chatrix';

function asset_url( $asset_path ): string {
	return plugins_url( "../frontend/$asset_path", __FILE__ );
}

function chatrix_config() {
	return apply_filters( 'chatrix_config', array() );
}

function main() {
	init_frontend_session_management( LOCAL_STORAGE_KEY_PREFIX );
	register_block();
	register_popup();

	// Chatrix accepts some configuration through properties on the window object.
	// Ideally we would use wp_localize_script() but it cannot write to the `window` object.
	// So instead we hook to wp_head and set the properties explicitly.
	add_action(
		'wp_head',
		function () {
			$config = chatrix_config();
			if ( empty( $config ) ) {
				return;
			}

			$local_storage_key = get_local_storage_key( $config['instance_id'] ?? '' );
			?>
			<script type="text/javascript">
				window.CHATTERBOX_HTML_LOCATION = "<?php echo esc_url( asset_url( 'chatterbox.html' ) ); ?>";
				window.CHATTERBOX_CONFIG_LOCATION = "<?php echo esc_url( $config['url'] ); ?>";
				window.CHATTERBOX_LOCAL_STORAGE_KEY = "<?php echo esc_js( $local_storage_key ); ?>";
			</script>
			<?php
		}
	);

	add_action(
		'wp_enqueue_scripts',
		function () {
			$config = chatrix_config();
			if ( ! empty( $config ) ) {
				wp_enqueue_script( 'chatrix-parent-js', asset_url( 'assets/parent.js' ), array(), automattic_chatrix_version(), true );
			}
		}
	);

	// Output the script tag in the format expected by chatterbox.
	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $src ) {
			if ( 'chatrix-parent-js' === $handle ) {
				// This triggers the WordPress.WP.EnqueuedResources.NonEnqueuedScript phpcs rule.
				// However, we're not actually rendering anything here, we're pre-processing the already-enqueued script.
				// The fact that this code triggers phpcs is likely a bug in phpcs.
				// phpcs:ignore
				$tag = '<script id="chatterbox-script" type="module" src="' . esc_url( $src ) . '"></script>';
			}

			return $tag;
		},
		10,
		3
	);
}

function get_local_storage_key( string $instance_id ): string {
	$current_user      = wp_get_current_user();
	$local_storage_key = LOCAL_STORAGE_KEY_PREFIX;

	if ( ! empty( $instance_id ) ) {
		$local_storage_key .= '_' . $instance_id;
	}

	if ( 0 !== $current_user->ID ) {
		$local_storage_key .= '_' . $current_user->user_login;
	}

	return $local_storage_key;
}
