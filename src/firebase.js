// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import firebase from "firebase/app";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import Geolocation // TODO: Add SDKs for Firebase products that you want to use
  from "./Geolocation";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  auth
} from "./firebase";
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCZSNXXelTAy12JC8dbOO7U95SAnYzzc",
  authDomain: "my-map-app-f307a.firebaseapp.com",
  projectId: "my-map-app-f307a",
  storageBucket: "my-map-app-f307a.appspot.com",
  messagingSenderId: "490482570562",
  appId: "1:490482570562:web:497a44c2f248d67549a4db",
  measurementId: "G-3NWR36FMH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  const handleClick = React.useCallback((event) => {
    setSelected(null);
    panTo(event.latLng.toJSON());
  }, [setSelected, panTo]);
  const handleMarkerClick = React.useCallback((marker) => (event) => {
    setSelected(marker);
    panTo(event.latLng.toJSON());
  }, [setSelected, panTo]);
  const handleClose = React.useCallback(() => {
    setSelected(null);
  }, [setSelected]);
  const handleFavoriteClick = React.useCallback(
    (marker) => (event) => {
      if (user) {
        if (marker.favorite) {
          db.collection('users')
            .doc(user.uid)
            .collection('favorites')
            .doc(marker.id)
            .delete()
            .then(() => {
              setFavorites(favorites.filter((favorite) => favorite.id !== marker.id));
            });
        } else {
          db.collection('users')
            .doc(user.uid)
            .collection('favorites')
            .doc(marker.id)
            .set(marker)
            .then(() => {
              setFavorites([...favorites, marker]);
            });
        }
      }
    }, [user, favorites, setFavorites]);



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
                onClick={() => setSelected(marker)} />
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
                directions={directions} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  };



  const searchPlaces = (radius) => {
    // Реализация поиска достопримечательностей в радиусе
    // Здесь можно использовать Google Places API или другой API для поиска
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
              onClick={() => setSelected(marker)} />
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
    setCategory(e.target.value);
    // Дополнительная логика фильтрации маркеров по категориям
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
              onClick={() => setSelected(marker)} />
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

  {
    selected && (
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
    );
  }

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
              onClick={() => setSelected(marker)} />
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

  {
    selected && (
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
    );
  }

  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
    <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={10}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => setSelected(marker)} />
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
          directions={directions} />
      )}
    </GoogleMap>
  </LoadScript>;



  export default Map;
};
