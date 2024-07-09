import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { DetailedView } from "./detailedview";

export const Demo = () => {
    const { entity, id } = useParams();
    const { store, actions } = useContext(Context);

    let item = null;
    if (entity === "people") {
        item = store.people.find(person => person.uid === id);
    } else if (entity === "vehicles") {
        item = store.vehicles.find(vehicle => vehicle.uid === id);
    } else if (entity === "planets") {
        item = store.planets.find(planet => planet.uid === id);
    }

    return (
        <div className="container">
            {item ? (
                <>
                    <DetailedView item={item} />
                    <Link to="/">
                        <button className="btn btn-primary">Back home</button>
                    </Link>
                </>
            ) : (
                <h1>Item not found!</h1>
            )}
        </div>
    );
};
