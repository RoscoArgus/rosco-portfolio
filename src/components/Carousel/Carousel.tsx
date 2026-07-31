import React, { type CSSProperties } from 'react';
import './Carousel.css';

export interface CarouselItem {
  icon: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <ul className="carousel" style={{ '--n': items.length } as CSSProperties}>
      {items.map((item, index) => (
        <li key={index} title={item.title} style={{ '--i': index } as CSSProperties}>
          <img src={item.icon} alt={item.title} />
        </li>
      ))}
    </ul>
  );
};

export default Carousel;
