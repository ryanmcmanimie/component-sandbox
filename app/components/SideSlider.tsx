import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import styles from './styles/sideslider.module.css';

gsap.registerPlugin(ScrollTrigger);

interface SideSliderProps {
  imageList: string[];
  title: string;
  backgroundImage: StaticImageData;
}

export default function SideSlider({ imageList, title, backgroundImage }: SideSliderProps) {
  const main = useRef<HTMLDivElement>(null);
  const slideTextRef = useRef<HTMLHeadingElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  
  let q = gsap.utils.selector(main);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const slideText = slideTextRef.current;
      const slides = slidesRef.current;
      const slideWrapper = slideWrapperRef.current; 
      gsap.set(slideText, { opacity: 0 }); 

      function getScrollAmount() {
        let slidesWidth = slides?.scrollWidth || 0;
        return -(slidesWidth - window.innerWidth);
      }

      const tween = gsap.to(slides, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      });

      const textTween = gsap.to(slideText, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: slideText,
          start: "top -80%",
          end: "bottom -150%",
          scrub: true,
          markers: true
        },
      });

      ScrollTrigger.create({
        trigger: slideWrapper,
        start: "40% 50%",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.sideSlider} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div ref={main}>
        <div ref={slideWrapperRef} className={styles.slideWrapper}>
          
          <h1 
          ref={slideTextRef} 
          className={styles.slideText} 
          dangerouslySetInnerHTML={{ __html: title }} />

          <div ref={slidesRef} className={styles.slides}>
          {imageList.map((src, index) => (
              <Image
                key={index}
                alt="image"
                src={src}
                width="250"
                height="600"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
