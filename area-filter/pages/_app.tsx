import type { AppProps } from "next/app"; 
import '/leaflet/leaflet.module.css'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
