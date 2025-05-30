import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClustererF
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 23.2494, // Mazatlán
  lng: -106.4111
};

// Simulación de puntos aleatorios
const generateMarkers = () => {
  const markers = [];
  for (let i = 0; i < 100; i++) {
    markers.push({
      lat: center.lat + (Math.random() * 0.1 - 0.05),
      lng: center.lng + (Math.random() * 0.1 - 0.05)
    });
  }
  return markers;
};

const MapaConClusters = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAi1q3xo_0IkHkMj8XvqOKE4ZMFRtcmEzQ',
  });

  const markers = generateMarkers();

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <MarkerClustererF>
        {(clusterer) =>
          markers.map((position, index) => (
            <MarkerF key={index} position={position} clusterer={clusterer} />
          ))
        }
      </MarkerClustererF>
    </GoogleMap>
  ) : (
    <div>Cargando mapa...</div>
  );
};

export default MapaConClusters;
