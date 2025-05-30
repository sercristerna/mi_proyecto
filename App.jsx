import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Autocomplete
} from '@react-google-maps/api';

const containerStyle = {
 height: '500px',
  margin: '20px auto',  // centrado horizontal
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
};

const center = {
  lat: 23.2494, // Mazatlán
  lng: -106.4111
};

const travelModes = [
  { label: 'Coche', value: 'DRIVING' },
  { label: 'Caminando', value: 'WALKING' },
  { label: 'Bicicleta', value: 'BICYCLING' }
];

const App = () => {
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = () => {
    if (!origin || !destination) {
      alert('Por favor ingresa origen y destino.');
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode[travelMode]
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setDirections(null);
          alert('No se pudo calcular la ruta: ' + status);
        }
      }
    );
  };

  const handlePlaceChanged = (ref, setValue) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      setValue(place.formatted_address);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAi1q3xo_0IkHkMj8XvqOKE4ZMFRtcmEzQ"
      libraries={['places']}
    >
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 24,
        background: '#f8f9fa',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#0d6efd' }}>Ruta entre dos puntos en Mazatlán</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Autocomplete
            onPlaceChanged={() => handlePlaceChanged(originRef, setOrigin)}
          >
            <input
              ref={originRef}
              type="text"
              placeholder="Origen"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ccc'
              }}
            />
          </Autocomplete>
          <Autocomplete
            onPlaceChanged={() => handlePlaceChanged(destinationRef, setDestination)}
          >
            <input
              ref={destinationRef}
              type="text"
              placeholder="Destino"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ccc'
              }}
            />
          </Autocomplete>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, justifyContent: 'center' }}>
          {travelModes.map(mode => (
            <button
              key={mode.value}
              onClick={() => setTravelMode(mode.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 4,
                border: travelMode === mode.value ? '2px solid #0d6efd' : '1px solid #ccc',
                background: travelMode === mode.value ? '#e7f1ff' : '#fff',
                color: '#0d6efd',
                fontWeight: travelMode === mode.value ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <button
          onClick={calculateRoute}
          style={{
            width: '100%',
            padding: '10px 0',
            background: '#0d6efd',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: 12
          }}
        >
          Calcular Ruta
        </button>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default App;