// We still import global CSS here, same as before.
import '../styles/globals.css';

// For optional type-checking in JS, you can use JSDoc comments like this:
/**
 * @param {import('next/app').AppProps} props
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
