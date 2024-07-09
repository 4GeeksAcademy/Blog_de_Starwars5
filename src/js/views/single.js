import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);

    const getImage = (entity, id, name) => {
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

    return (
        <div className="container">
            <h1 className="text-light mt-4 mb-3">Favorites</h1>
            <div className="row">
                {store.favorites.length === 0 ? (
                    <p className="text-light">No favorites added yet.</p>
                ) : (
                    store.favorites.map((fav, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card">
                                <img
                                    src={getImage(fav.entity, fav.uid, fav.name)}
                                    className="card-img-top"
                                    alt={fav.name}
                                    onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{fav.name}</h5>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/demo/${fav.entity}/${fav.uid}`} className="btn btn-warning">Details</Link>
                                        <button onClick={() => actions.removeFavorite(fav)} className="btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link to="/">
                <button className="btn btn-warning mt-3">Back home</button>
            </Link>
        </div>
    );
};