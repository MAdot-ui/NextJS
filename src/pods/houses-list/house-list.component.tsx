'use client';
import React from 'react';
import classes from './house-list.module.css';
import { House } from './house-list.vm';
import { HouseItem } from './components';

interface Props {
  houseList: House[];
}

export const HouseList: React.FC<Props> = (props) => {
  const { houseList } = props;
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredHouses = React.useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery || trimmedQuery.length < 3) {
      return houseList;
    }
    return houseList.filter((house) =>
      house.name.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
  }, [houseList, searchQuery]);

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search houses by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      <ul className={classes.root}>
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house) => (
            <li key={house.id}>
              <HouseItem house={house} />
            </li>
          ))
        ) : (
          <li className={classes.noResults}>No houses found matching "{searchQuery}"</li>
        )}
      </ul>
    </div>
  );
};
