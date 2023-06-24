import { useContext } from 'react';
import { GeoLocationContext } from '../contexts/GeoLocationContext';

const useGeoLocation = () => {
  return useContext(GeoLocationContext);
};

export default useGeoLocation;
