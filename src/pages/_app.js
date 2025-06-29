import type { AppProps } from 'next/app';
// The one and only place to import global CSS
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
