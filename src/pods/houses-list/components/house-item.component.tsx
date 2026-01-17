import { routeConstants } from '#core/constants';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { House } from '../house-list.vm';
import classes from './house-item.module.css';

interface Props {
  house: House;
}

export const HouseItem: React.FC<Props> = (props) => {
  const { house } = props;

  return (
    <Link href={routeConstants.house(house.id)} className={classes.root}>
      <h2 className={classes.title}>
        {house.isBooked ? (
          <span className="material-icon" style={{ color: '#d32f2f' }}>
            cancel
          </span>
        ) : (
          <span className="material-icon" style={{ color: '#2e7d32' }}>
            check_circle
          </span>
        )}
        <span>{house.name}</span>
      </h2>
      <Image
        className={classes.image}
        src={house.imageUrl}
        alt={house.name}
        width={400}
        height={300}
        loading="lazy"
        quality={85}
      />
    </Link>
  );
};
