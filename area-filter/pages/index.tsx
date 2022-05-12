import type { NextPage } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"  
 
const LeafletMap = dynamic(
  //@ts-ignore
  () => import('../components/map/map.tsx'),
  {ssr:false}
)

const Home: NextPage = () => {

  
  return (
    <div id="map"> 
      <LeafletMap />
    </div>
  );
};

export default Home;
