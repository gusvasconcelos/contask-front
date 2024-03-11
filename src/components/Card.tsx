import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    id: number;
    name: string;
    cnpj: string;
    imageUrl: string;
}

const API_URL = "http://localhost:8080/api/v1"

function Card() {
    const [data, setData] = useState<CardProps[]>([]);

    useEffect(() => {
        axios.get(API_URL + '/organizations')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">Organizations</h1>
            <div className="flex justify-center flex-wrap">
                {data.map((organization: CardProps, index: number) => (
                    <Link to={`/${organization.id}`} key={index}>
                        <div className="card max-w-sm rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105">
                            <img className="w-full h-64 object-cover" src={organization.imageUrl} alt={organization.name} />
                            <div className="px-6 py-4">
                                <h2 className="font-bold text-xl mb-2 text-center">{organization.name}</h2>
                                <p className="text-gray-700 text-base text-center"><b>CNPJ:</b> {organization.cnpj}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Card;