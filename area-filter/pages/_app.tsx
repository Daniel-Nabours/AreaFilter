import type { AppProps } from "next/app";  
import "../public/leaflet.css" 
import "../public/leaflet.draw.css"


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
