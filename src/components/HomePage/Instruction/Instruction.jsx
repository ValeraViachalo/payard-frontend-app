import React, { useContext, useRef, useState } from "react";

import s from "./Instruction.module.scss";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { VideoPlayer } from "@/utils/VideoPlayer/VideoPlayer";
import { ScrollContext } from "@/lib/providers/ScrollProvider/context";
import clsx from "clsx";

export default function InstructionHome() {
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const { scrollStop, scrollResume } = useContext(ScrollContext);
  const instructionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: instructionRef,
    offset: ["100% 0%", "0% 100%"],
    layoutEffect: false,
  });

  const scrollSpring = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 1000,
  });

  const bgPosition = useTransform(scrollSpring, [0, 1], ["-10%", "50%"]);
  const popUpY = useTransform(scrollSpring, [0, 1], ["0%", "-30%"]);

  const handlerOpenPlayer = () => {
    scrollStop();
    setIsPlayerActive(true);
  };

  const handlerClosePlayer = () => {
    scrollResume();
    setIsPlayerActive(false);
  };

  return (
    <motion.section className={s.instruction} ref={instructionRef} style={{ backgroundPositionY: bgPosition }}>
      <motion.div
        className={clsx(s.button, {
          [s.button_active]: isPlayerActive,
        })}
        onClick={handlerOpenPlayer}
        layoutId="video"
        transition={{
          duration: 0.7,
          ease: [0.12, 0.73, 0.28, 0.99],
        }}
      >
        <svg
          className={s.buttonIcon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="white" />
          <path
            d="M27 20.5L15.75 28.7272L15.75 12.2728L27 20.5Z"
            fill="#38D091"
          />
        </svg>
        <span className={s.buttonText}>Video instruction</span>
      </motion.div>

      <AnimatePresence>
        {isPlayerActive && (
          <motion.div
            className={s.video_main_wrapper}
            layoutId="video"
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <VideoPlayer
              customClass={s.video_main}
              url={"/images/instruction/GRID_03.webm"}
            >
              <span className={s.video_main_close} onClick={handlerClosePlayer}>
                <svg
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="21.2133"
                    width="2"
                    height="30"
                    transform="rotate(45 21.2133 0)"
                    fill="white"
                  />
                  <rect
                    x="0.000366211"
                    y="1.41406"
                    width="2"
                    height="30"
                    transform="rotate(-45 0.000366211 1.41406)"
                    fill="white"
                  />
                </svg>
              </span>
            </VideoPlayer>
            <span className={s.bg} onClick={handlerClosePlayer} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ y: popUpY }} className={s.popUp}>
        <h2>Sign up to Your Account</h2>
        <p>
          Our dedicated team says &quot;Hi&quot;! Reach out with any questions or for
          support, and we&apos;ll ensure you get the assistance you need
        </p>
      </motion.div>
    </motion.section>
  );
}
