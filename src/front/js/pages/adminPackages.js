import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AdminPackages = () => {
    const { store, actions } = useContext(Context);
    const [packageData, setPackageData] = useState({
        name: '',
        destino: '',
        descripcion: '',
        duracion: '',
        precio: '',
        imageURL: ''
    });

    const [file, setFile] = useState(null);
    const [serverResponse, setServerResponse] = useState('');

    const handleFiles = (img) => {
        setFile(img[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/image", {
                method: 'POST',
                body: formData,
            });
            const data = await resp.json()
            setServerResponse(data.url)
            setPackageData({ ...packageData, imageURL: data.url })
        } catch (error) {
            setServerResponse(error.message);
        }
    }

    const handleCreatePackage = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/paquete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Asegúrate de incluir este encabezado
                },
                body: JSON.stringify({
                    ...packageData,
                })
            });

            console.log("Respuesta completa:", response);

            if (response.ok) {
                console.log("Paquete creado");
                const newPaquete = await response.json();
                actions.paquetes();

                setPackageData({
                    name: '',
                    destino: '',
                    descripcion: '',
                    duracion: '',
                    precio: '',
                    imageURL: ''
                });

            } else {
                throw new Error("Error al crear el paquete: " + response.statusText);
            }
        } catch (error) {
            console.error("Error de red al realizar la solicitud", error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center ">
                <div className="card border border-3" style={{ width: '30rem' }} >
                    <img className="rounded-0 img-fluid" src="https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." />
                    <div className="card-body">
                        <input type="texto" className="form-control"
                            placeholder="Name" style={{ width: '300px', height: '30px', borderRadius: '0' }}
                            value={packageData.name}
                            onChange={(e) => setPackageData({ ...packageData, name: e.target.value })}
                        />
                    </div>
                    <ul className="list-group list-group-flush">
                        <li> <input type="texto" className="form-control" placeholder="Destino"
                            style={{ width: '300px', height: '30px', borderRadius: '0' }}
                            value={packageData.destino}
                            onChange={(e) => setPackageData({ ...packageData, destino: e.target.value })} />
                        </li>
                        <textarea className="form-control mb-3" id="exampleFormControlTextarea1" rows="3"
                            placeholder="Description"
                            style={{ borderRadius: '0' }}
                            value={packageData.descripcion}
                            onChange={(e) => setPackageData({ ...packageData, descripcion: e.target.value })}
                        ></textarea>
                        <li> <input type="texto" className="form-control" placeholder="Duracion"
                            style={{ width: '300px', height: '30px', borderRadius: '0' }}
                            value={packageData.duracion}
                            onChange={(e) => setPackageData({ ...packageData, duracion: e.target.value })} />
                        </li>
                        <li><input type="texto" className="form-control"
                            placeholder="Precio" style={{ width: '100px', height: '30px', borderRadius: '0' }}
                            value={packageData.precio}
                            onChange={(e) => setPackageData({ ...packageData, precio: e.target.value })}
                        />
                        </li>
                    </ul>

                    <div>
                        <input type="file" onChange={e => handleFiles(e.target.files)} />
                        {file &&
                            <img src={URL.createObjectURL(file)} alt="img-preview" style={{ maxWidth: '30rem' }} />
                        }
                        {serverResponse}
                        <button onClick={() => handleSubmit()} className="btn btn-success">Upload</button>
                    </div>


                    <div className="card-body">
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCreatePackage}>
                            Create Package
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Paquete Creado Exitosamente</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between" style={{ width: '30rem', margin: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <Link to={'/admin'}>
                    <button type="button" className="btn btn-secondary">Go back</button>
                </Link>
                <Link to={'/packages'}>
                    <button type="button" className="btn btn-secondary">Packages view</button>
                </Link>
            </div>
        </>
    );
};