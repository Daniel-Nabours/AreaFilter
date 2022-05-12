import type { NextPage } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic" 
import Script from "next/script"
 
const LeafletMap = dynamic(
  //@ts-ignore
  () => import('../components/map/map.tsx'),
  {ssr:false}
)

const Home: NextPage = () => {
  
  return (
    <div id="map">
      <Script src="leaflet/dist/leaflet.js"/>
      <LeafletMap />
    </div>
  );
};

export default Home;
