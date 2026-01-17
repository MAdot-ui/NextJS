'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { routeConstants } from '#core/constants';
import * as api from './api';
import * as viewModel from './house.vm';
import { mapHouseFromVmToApi } from './house.mappers';
import classes from './house.module.css';

interface Props {
  house: viewModel.House;
}

export const House: React.FC<Props> = (props) => {
  const { house } = props;
  const router = useRouter();

  const handleBook = async () => {
    try {
      const apiHouse = mapHouseFromVmToApi({
        ...house,
        isBooked: !house.isBooked,
      });
      await api.bookHouse(apiHouse);
      router.push(routeConstants.houseList);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleBack = () => {
    router.push(routeConstants.houseList);
  };

  return (
    <div className={classes.root}>
      <button onClick={handleBack} className={classes.backButton}>
        ← Volver a la lista
      </button>
      <h2 className={classes.name}>{house.name}</h2>
      <Image
        className={classes.image}
        alt={house.name}
        src={house.imageUrl}
        width={400}
        height={300}
        priority
        quality={90}
        sizes="(max-width: 900px) 100vw, 60vw"
      />
      <div className={classes.details}>
        <div className={classes.info}>
          <p className={classes.description}>{house.description}</p>
          <div className={classes.location}>
            <p><strong>Dirección:</strong> {house.address}</p>
            <p><strong>Ciudad:</strong> {house.city}</p>
            <p><strong>País:</strong> {house.country}</p>
          </div>
          <div className={classes.specs}>
            <p><strong>Dormitorios:</strong> {house.bedrooms}</p>
            <p><strong>Camas:</strong> {house.beds}</p>
            <p><strong>Baños:</strong> {house.bathrooms}</p>
            <p className={classes.price}><strong>Precio:</strong> €{house.price}/noche</p>
          </div>
        </div>
        <div className={classes.sidebar}>
          <h3>Comodidades</h3>
          <ul className={classes.features}>
            {house.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
          {house.reviews.length > 0 && (
            <div className={classes.reviews}>
              <h3>Reseñas</h3>
              {house.reviews.map((review) => (
                <div key={review.id} className={classes.review}>
                  <div className={classes.reviewHeader}>
                    <strong>{review.author}</strong>
                    <span>⭐ {review.rating}/5</span>
                    <span className={classes.reviewDate}>{review.date}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
          <button
            className={`${classes.book} ${
              house.isBooked ? classes.secondary : classes.primary
            }`}
            onClick={handleBook}
          >
            {house.isBooked ? 'Descartar reserva' : 'Reservar'}
          </button>
        </div>
      </div>
    </div>
  );
};
