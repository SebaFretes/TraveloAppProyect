import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { storage } from '../firebase';

export const Accommodations = () => {
    const { store, actions } = useContext(Context);
    const [imageURL, setImageURL] = useState({}); // cambié estado inicial de null a {} para almacenar URLs por alojamiento

    useEffect(() => {
        actions.hoteles();
    }, [actions]);

    const getImageURL = async (hotelId) => {
        try {
            const imageRef = storage.refFromURL(`gs://travelo-69d3a.appspot.com/${hotelId}.jpg`);
            const url = await imageRef.getDownloadURL();
            setImageURL(prevState => ({
                ...prevState,
                [hotelId]: url // Almacena la URL usando el hotelId como clave
            }));
        } catch (error) {
            console.error(`Error fetching image for hotel ${hotelId}:`, error);
        }
    };

    useEffect(() => {
        // Obtener las URLs de imágenes para cada alojamiento
        if (store.accommodations) {
            store.accommodations.forEach((hotel) => {
                getImageURL(hotel.id);
            });
        }
    }, [store.accommodations]);

    return (
        <div className="container">
            <h1>Accommodations</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {store.accommodations && store.accommodations.map((hot, id) => (
                    <div className="col" key={id}>
                        <div className="card">
                            {imageURL[hot.id] ? (
                                <img src={imageURL[hot.id]} className="card-img-top" alt="Accommodation" />
                            ) : (
                                <p>Loading image..</p>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{hot.name}</h5>
                                <p className="card-text">{hot.descripcion}</p>
                                <p className="card-title">{hot.precio}$ per night</p>
                                <Link to={`/accommodation/${hot.id}`}>
                                    <button className="btn btn-primary">VIEW DETAILS</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

//     return (
//         <div className="container">
//             <h1>Accommodations</h1>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {store.accommodations && store.accommodations.map((hot, id) => (
//                     <div className="col" key={id}>
//                         <div className="card">
//                             {imageURL[hot.id] ? (
//                                 <img src={imageURL[hot.id]} className="card-img-top" alt="Accommodation" />
//                             ) : (
//                                 <p>Loading image..</p>
//                             )}
//                             <div className="card-body">
//                                 <h5 className="card-title">{hot.name}</h5>
//                                 <p className="card-text">{hot.descripcion}</p>
//                                 <p className="card-title">{hot.precio}$ per night</p>
//                                 <Link to={`/accommodation/${hot.id}`}>
//                                     <button className="btn btn-primary">VIEW DETAILS</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
