<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_locus' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'password' );

/** MySQL hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '^c%K:FSU2V.2{c _hzk]Hkc?d|M!ejm_Q?uPZU0@e|v&cs@XUU42V0fnL`GBfDdI' );
define( 'SECURE_AUTH_KEY',  '}!N0s3+F;Uw< A<k8:<-76ySjno~N: sjxF7h}|?2.XA{!,Rfc/.KVb}x9t;AKA=' );
define( 'LOGGED_IN_KEY',    'A*|P/>`ukrp2Q2n}h9wG?az*p2r{!p}AU3=2w2GTl41<A|_htwKnHT]o.V.YO4-H' );
define( 'NONCE_KEY',        'o+otYsd%zYSj^}_Q!l65y_5sy?h~c]CU18lR4!9e++amC??Zr1}c0}1qCpU3WBRI' );
define( 'AUTH_SALT',        'C.J)r4c]7lhTqxL}kyYyx+N,iN.Si=,cgJc2GLZq9eTPpoFv(X<8o}33uXry)(Ti' );
define( 'SECURE_AUTH_SALT', '<_kEmbG,,_imqe3KTn9@_t`X1aglBYY(>(*Q-uFew9?wvf~])x(0~`NwdNf*ke4G' );
define( 'LOGGED_IN_SALT',   'A1f}):x]_f;)2lACw3(;l^~V(3,c^jHBfix 7mRS%~I5w# nOz^.ivTEf-mC8+f~' );
define( 'NONCE_SALT',       'Jb-MHcpUZq/FerOFsWw4D(:rb.rI{^_NDf[^3NI1I0HTHNz3]|!PeMSbnR3w+Zrp' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
