import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/detailedview.css";

export const DetailedView = () => {
    const { entity, id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadDetails(entity, id);
    }, [entity, id]);

    const item = store.details;

    const getImageUrl = () => {
        if (entity === 'people') {
            return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
        }
        if (entity === 'vehicles') {
            return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
        }
        if (entity === 'planets') {
            if (item.name === 'Tatooine') {
                return 'https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357';
            }
            return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
        }
        return '';
    };

    return (
        <div className="detailed-view-container">
            {item ? (
                <div className="detailed-view-card">
                    <img
                        src={getImageUrl()}
                        className="detailed-view-img"
                        alt={item.name}
                        onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                    />
                    <div className="detailed-view-body">
                        <h5 className="detailed-view-title">{item.name}</h5>
                        {entity === 'people' && (
                            <>
                                <p><strong>Birth Year:</strong> {item.birth_year}</p>
                                <p><strong>Eye Color:</strong> {item.eye_color}</p>
                                <p><strong>Gender:</strong> {item.gender}</p>
                                <p><strong>Hair Color:</strong> {item.hair_color}</p>
                                <p><strong>Height:</strong> {item.height}</p>
                                <p><strong>Mass:</strong> {item.mass}</p>
                                <p><strong>Skin Color:</strong> {item.skin_color}</p>
                                <p><strong>Homeworld:</strong> {store.homeworldName}</p>
                            </>
                        )}
                        {entity === 'vehicles' && (
                            <>
                                <p><strong>Model:</strong> {item.model}</p>
                                <p><strong>Vehicle Class:</strong> {item.vehicle_class}</p>
                                <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
                                <p><strong>Length:</strong> {item.length}</p>
                                <p><strong>Cost in Credits:</strong> {item.cost_in_credits}</p>
                                <p><strong>Crew:</strong> {item.crew}</p>
                                <p><strong>Passengers:</strong> {item.passengers}</p>
                                <p><strong>Max Atmosphering Speed:</strong> {item.max_atmosphering_speed}</p>
                                <p><strong>Cargo Capacity:</strong> {item.cargo_capacity}</p>
                                <p><strong>Consumables:</strong> {item.consumables}</p>
                            </>
                        )}
                        {entity === 'planets' && (
                            <>
                                <p><strong>Climate:</strong> {item.climate}</p>
                                <p><strong>Diameter:</strong> {item.diameter}</p>
                                <p><strong>Rotation Period:</strong> {item.rotation_period}</p>
                                <p><strong>Orbital Period:</strong> {item.orbital_period}</p>
                                <p><strong>Gravity:</strong> {item.gravity}</p>
                                <p><strong>Population:</strong> {item.population}</p>
                                <p><strong>Terrain:</strong> {item.terrain}</p>
                                <p><strong>Surface Water:</strong> {item.surface_water}</p>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <h1 className="text-light">Item not found!</h1>
            )}
        </div>
    );
};
