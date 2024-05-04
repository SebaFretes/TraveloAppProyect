import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useParams } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const SingleHotel = () => {

    const { store, actions } = useContext(Context);

    const { id } = useParams();

    const [singleHotel, setSingleHotel] = useState(null);

    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [reserva, setReserva] = useState(null);

    const fetchSingleHotel = async () => {
        const response = await fetch(process.env.BACKEND_URL + `/api/accommodation/${id}`)
        const data = await response.json()
        setSingleHotel(data)
    }

    const handleCheckIn = (e) => {
        setCheckIn(e.target.value);
    }

    const handleCheckOut = (e) => {
        setCheckOut(e.target.value);
    }

    useEffect(() => {
        fetchSingleHotel()
    }, [])

    const bookHotel = async () => {
        const resp = await fetch(process.env.BACKEND_URL + `/api/reservations/hotel/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.token}`
            },
            body: JSON.stringify({
                fecha_inicio: checkIn,
                fecha_final: checkOut,
            })
        });
        const data = await resp.json()

        if (resp.ok) {
            console.log('Hotel reservation successfully made');
            setReserva(data);
            alert("Reserva Exitosa")

        } else {
            console.log('Error, please trying again or request assistance from a Travelo agent');
        }
    }

    return (
        <>
            {
                !store.token &&
                <h4 className='text-center'>You have to log in first to access this page</h4>
            }
            {
                store.token &&
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            {singleHotel &&
                                <img src={singleHotel.imageURL} className="img-thumbnail" style={{ maxHeight: '300px', width: 'auto' }} alt={singleHotel.name} />
                            }
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                            {singleHotel &&
                                <div className='text-center p-4'>
                                    <h1>{singleHotel.name}</h1>
                                    <p>{singleHotel.descripcion}</p>
                                    <p>{singleHotel.precio}$ per night</p>
                                </div>
                            }
                            <button type="button" className="btn btnSingleHotel mb-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Check and Book
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="d-flex justify-content-center" style={{ width: '30rem', margin: 'auto', paddingBottom: '1rem' }}>
                <Link to={'/accommodations'}>
                    <button type="button" className="btn btn-secondary">Go back</button>
                </Link>
            </div>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Reserva</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="date">
                                <div className="input-wrap">
                                    <label>Check-In</label>
                                    <input type="date" onChange={handleCheckIn} />
                                </div>
                                <div className="input-wrap">
                                    <label>Check-Out</label>
                                    <input type="date" onChange={handleCheckOut} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={bookHotel}>Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};