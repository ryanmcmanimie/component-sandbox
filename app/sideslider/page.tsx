"use client";

import SideSlider from "../components/SideSlider";
import backgroundImage from '/public/sideslider/bg.jpg';

const imageSources = [
  "/sideslider/1.png",
  "/sideslider/2.png",
  "/sideslider/1.png",
  "/sideslider/1.png",
  "/sideslider/2.png",
  "/sideslider/1.png",
  "/sideslider/1.png",
  "/sideslider/2.png",
  "/sideslider/1.png",
  "/sideslider/1.png",
];

export default function SideSliderPage() {
  return (
    <>
      <section className="h-[500px] bg-slate-400 overflow-x-hidden"></section>

      <SideSlider 
        title="PRO <span>on the</span> GO" 
        imageList={imageSources} 
        backgroundImage={backgroundImage} 
      />

      <section className="h-[500px] bg-slate-400"></section>
    </>
  );
}
