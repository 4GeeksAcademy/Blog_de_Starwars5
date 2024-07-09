import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/principalview.css";

export const PrincipalView = () => {
  const { store, actions } = useContext(Context);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    actions.loadPeople();
    actions.loadVehicles();
    actions.loadPlanets();
  }, []);


  const getImageUrl = (entity, id, name) => {
    if (entity === 'people') {
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    }
    if (entity === 'vehicles') {
      return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
    }
    if (entity === 'planets') {
      if (name === 'Tatooine') {
        return 'https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357';
      }
      return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    }
    return '';
  };

  const handleFavoriteClick = (item) => {
    const isFavorite = favoriteItems.some(fav => fav.uid === item.uid);
    if (!isFavorite) {
      setFavoriteItems([...favoriteItems, item]);
      actions.addFavorite(item);
    } else {
      setFavoriteItems(favoriteItems.filter(fav => fav.uid !== item.uid));
      actions.removeFavorite(item);
    }
  };

  const isFavorite = (item) => {
    return favoriteItems.some(fav => fav.uid === item.uid);
  };

  return (
    <div className="container">
      <h1 className="title">Star Wars Entities</h1>
      
      <h2 className="section-title">Characters</h2>
      <div className="row">
        {store.people.map(person => (
          <div key={person.uid} className="col-md-3">
            <div className="card">
              <img 
                src={getImageUrl('people', person.uid, person.name)} 
                className="card-img-top" 
                alt={person.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <Link to={`/demo/people/${person.uid}`} className="btn btn-warning ml-2">Details</Link>
                <button onClick={() => handleFavoriteClick(person)} className="btn btn-link">
                  <FontAwesomeIcon icon={isFavorite(person) ? solidHeart : regularHeart} color={isFavorite(person) ? 'red' : 'black'} size="lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Vehicles</h2>
      <div className="row">
        {store.vehicles.map(vehicle => (
          <div key={vehicle.uid} className="col-md-3">
            <div className="card">
              <img 
                src={getImageUrl('vehicles', vehicle.uid, vehicle.name)} 
                className="card-img-top" 
                alt={vehicle.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{vehicle.name}</h5>
                <Link to={`/demo/vehicles/${vehicle.uid}`} className="btn btn-warning">Details</Link>
                <button onClick={() => handleFavoriteClick(vehicle)} className="btn btn-link">
                  <FontAwesomeIcon icon={isFavorite(vehicle) ? solidHeart : regularHeart} color={isFavorite(vehicle) ? 'red' : 'black'} size="lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Planets</h2>
      <div className="row">
        {store.planets.map(planet => (
          <div key={planet.uid} className="col-md-3">
            <div className="card">
              <img 
                src={getImageUrl('planets', planet.uid, planet.name)} 
                className="card-img-top" 
                alt={planet.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <Link to={`/demo/planets/${planet.uid}`} className="btn btn-warning">Details</Link>
                <button onClick={() => handleFavoriteClick(planet)} className="btn btn-link">
                  <FontAwesomeIcon icon={isFavorite(planet) ? solidHeart : regularHeart} color={isFavorite(planet) ? 'red' : 'black'} size="lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};