import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useStyles } from './CarouselClasses';
import clsx from 'clsx';
import { clearGlobalInterval, setGlobalInterval } from '../../functions';

function Carousel({ active, speed = 5000, className, children, ...props }) {
  const classes = useStyles();
  const carouselRef = useRef(null);
  const innerCarouselRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [longer, setLonger] = useState(false);
  const [carouselStyles, setCarouselStyles] = useState({
    transition: `transform ${speed}ms linear`,
    display: 'inline-block'
  });

  const updateCarouselStyles = useCallback(() => {
    setCarouselStyles({
      transform: 'translateX(0)',
      display: 'inline-block'
    });
    setCarouselStyles({
      transform: `translateX(-${innerCarouselRef.current?.clientWidth / 2}px)`,
      transition: `transform ${speed}ms linear`,
      display: 'inline-block'
    });
  }, [speed]);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel.clientWidth < carousel.scrollWidth && active) {
      setLonger(true);
      setIntervalId( setGlobalInterval(updateCarouselStyles, speed) );
    }

    return () => clearGlobalInterval(intervalId);
  }, [carouselRef, carouselRef.current?.clientWidth, speed, active, updateCarouselStyles]);

  return (
    <div
      ref={carouselRef}
      className={clsx(classes.root, className)}
    >
      <div
        style={carouselStyles}
        ref={innerCarouselRef}
      >
        {children}
        {longer && children}
      </div>
    </div>
  )
}

export default memo(Carousel);