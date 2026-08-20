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
    <ul className="carousel">
      {items.map((item, index) => (
        <li key={index} title={item.title} style={{ '--title': item.title } as CSSProperties}>
          <div className="carouselImageContainer">
            <img src={item.icon} alt={item.title} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Carousel;
