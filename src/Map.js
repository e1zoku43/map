import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geolocation from './Geolocation';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import searchPlaces from './searchPlaces';
import { db, auth } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const libraries = ['places'];



const firebaseConfig = {
  apiKey: "AIzaSyCKCZSNXXelTAy12JC8dbOO7U95SAnYzzc",
  authDomain: "my-map-app-f307a.firebaseapp.com",
  projectId: "my-map-app-f307a",
  storageBucket: "my-map-app-f307a.appspot.com",
  messagingSenderId: "490482570562",
  appId: "1:490482570562:web:497a44c2f248d67549a4db",
  measurementId: "G-3NWR36FMH6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const containerStyle = {
    width: '100%',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  const Map = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
  
        fetchPlaces(latitude, longitude, 1000);
      });
    }, []);
  
    useEffect(() => {
      Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    }, []);
  
    useEffect(() => {
      const fetchMarkers = async () => {
        const snapshot = await db.collection('markers').get();
        const markersData = snapshot.docs.map(doc => doc.data());
        setMarkers(markersData);
      };
      fetchMarkers();
    }, []);
  
    useEffect(() => {
      if (auth.currentUser) {
        const fetchFavorites = async () => {
          const snapshot = await db.collection('users').doc(auth.currentUser.uid).collection('favorites').get();
          const favoritesData = snapshot.docs.map(doc => doc.data());
          setFavorites(favoritesData);
        };
        fetchFavorites();
      }
    }, [auth.currentUser]);
  
    const addToFavorites = async (place) => {
      if (auth.currentUser) {
        await db.collection('users').doc(auth.currentUser.uid).collection('favorites').doc(place.id).set(place);
        setFavorites([...favorites, place]);
      }
    };
  
    const removeFromFavorites = async (place) => {
      if (auth.currentUser) {
        await db.collection('users').doc(auth.currentUser.uid).collection('favorites').doc(place.id).delete();
        setFavorites(favorites.filter(fav => fav.id !== place.id));
      }
    };
  
    return (
      <div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="museums">Museums</option>
          <option value="parks">Parks</option>
          <option value="restaurants">Restaurants</option>
        </select>
        <button onClick={() => searchPlaces(1000)}>Search Places in 1km Radius</button>
        <div>
          <h3>Favorites</h3>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>{fav.name}</li>
            ))}
          </ul>
        </div>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => setSelected(marker)}
              />
            ))}
            {selected && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.description}</p>
                  <button onClick={() => addToFavorites(selected)}>Add to Favorites</button>
                  <button onClick={() => removeFromFavorites(selected)}>Remove from Favorites</button>
                  <button onClick={() => fetchDirections({ lat: selected.lat, lng: selected.lng })}>Get Directions</button>
                </div>
              </InfoWindow>
            )}
            {directions && (
              <DirectionsRenderer
                directions={directions}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  };
  


  const searchPlaces = async (latitude, longitude, radius, type) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;
  
      const response = await axios.get(url);
  
      return response.data.results;
    } catch (error) {
      console.error('Ошибка при поиске мест:', error);
      return [];
    }
  };

  return (
    <div>
      <button onClick={() => searchPlaces(1000)}>Search Places in 1km Radius</button>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
  
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    if (currentPosition) {
      fetchPlaces(currentPosition.lat, currentPosition.lng, 1000, newCategory);
    }
  };

  const fetchPlaces = async (latitude, longitude, radius, category) => {
    const results = await searchPlaces(latitude, longitude, radius, category);
    setPlaces(results);
  };

  return (
    <div>
      <select onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="museums">Museums</option>
        <option value="parks">Parks</option>
        <option value="restaurants">Restaurants</option>
      </select>
      <button onClick={() => searchPlaces(1000)}>Search Places in 1km Radius</button>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );

  const [favorites, setFavorites] = useState([]);

  const addToFavorites = async (place) => {
    if (auth.currentUser) {
      try {
        await db.collection('users').doc(auth.currentUser.uid).collection('favorites').doc(place.id).set(place);
        setFavorites([...favorites, place]);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };
  
  const removeFromFavorites = async (place) => {
    if (auth.currentUser) {
      try {
        await db.collection('users').doc(auth.currentUser.uid).collection('favorites').doc(place.id).delete();
        setFavorites(favorites.filter(fav => fav.id !== place.id));
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };

  {selected && (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div>
        <h2>{selected.name}</h2>
        <p>{selected.description}</p>
        <button onClick={() => addToFavorites(selected)}>Add to Favorites</button>
        <button onClick={() => removeFromFavorites(selected)}>Remove from Favorites</button>
      </div>
    </InfoWindow>
  )}

  return (
    <div>
      <select onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="museums">Museums</option>
        <option value="parks">Parks</option>
        <option value="restaurants">Restaurants</option>
      </select>
      <button onClick={() => searchPlaces(1000)}>Search Places in 1km Radius</button>
      <div>
        <h3>Favorites</h3>
        <ul>
          {favorites.map((fav, index) => (
            <li key={index}>{fav.name}</li>
          ))}
        </ul>
      </div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
                <button onClick={() => addToFavorites(selected)}>Add to Favorites</button>
                <button onClick={() => removeFromFavorites(selected)}>Remove from Favorites</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );

  import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

  const [directions, setDirections] = useState(null);

  const fetchDirections = (destination) => {
    const service = new google.maps.DirectionsService();
    service.route({
      origin: currentPosition,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  };

  {selected && (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div>
        <h2>{selected.name}</h2>
        <p>{selected.description}</p>
        <button onClick={() => addToFavorites(selected)}>Add to Favorites</button>
        <button onClick={() => removeFromFavorites(selected)}>Remove from Favorites</button>
        <button onClick={() => fetchDirections({ lat: selected.lat, lng: selected.lng })}>Get Directions</button>
      </div>
    </InfoWindow>
  )}
  
  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
  <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
    {markers.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => setSelected(marker)}
      />
    ))}
    {selected && (
      <InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => setSelected(null)}
      >
        <div>
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <button onClick={() => addToFavorites(selected)}>Add to Favorites</button>
          <button onClick={() => removeFromFavorites(selected)}>Remove from Favorites</button>
          <button onClick={() => fetchDirections({ lat: selected.lat, lng: selected.lng })}>Get Directions</button>
        </div>
      </InfoWindow>
    )}
    {directions && (
      <DirectionsRenderer
        directions={directions}
      />
    )}
  </GoogleMap>
</LoadScript>



export default Map;