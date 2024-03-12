import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import deleteIcon from '../assets/delete_icon.svg';
import updateIcon from '../assets/update_icon.svg';

interface CardProps {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    cnpj: string;
    imageUrl: string;
}

const API_URL = "http://localhost:8080/api/v1"

function CardById() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<CardProps | null>(null);

    useEffect(() => {
        axios.get(`${API_URL}/organizations/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => {
        try {
          await axios.delete(`${API_URL}/organizations/${id}`);
          alert('Organization deleted successfully');
          navigate('/');
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

    return (
        <div className="flex justify-center mt-10">
            <div className="card bg-white w-80 rounded-lg shadow-lg overflow-hidden relative">
                <Link to="/" className="absolute top-2 left-2 text-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <img className="w-full h-64 object-contain" src={data.imageUrl} alt={data.name} />
                <div className="p-6">
                    <h2 className="font-bold text-2xl mb-2 text-center">{data.name}</h2>
                    <p className="text-gray-700 text-base text-center"><b>Email:</b> {data.email}</p>
                    <p className="text-gray-700 text-base text-center"><b>Phone Number:</b> {data.phoneNumber}</p>
                    <p className="text-gray-700 text-base text-center"><b>CNPJ:</b> {data.cnpj}</p>
                </div>
                <button onClick={handleDelete} className="absolute bottom-2 right-2 text-lg text-gray-700 hover:text-red-600 transition duration-200">
                    <img src={deleteIcon} alt="Delete" className="h-6 w-6 transition-transform duration-200 hover:scale-110" />
                </button>
                <Link to={`/update/${id}`} className="absolute bottom-2 right-12 text-lg text-gray-700 hover:text-yellow-600 transition duration-200">
                    <img src={updateIcon} alt="Update" className="h-6 w-6 transition-transform duration-200 hover:scale-110" />
                </Link>
            </div>
        </div>
    );
}

export default CardById;