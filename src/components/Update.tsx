import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Organization {
  name: string;
  email: string;
  phoneNumber: string;
  cnpj: string;
  imageUrl: string;
}

const API_URL = "http://localhost:8080/api/v1";

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchOrganization = async () => {
      const response = await fetch(`${API_URL}/organizations/${id}`);
      const organization = await response.json();

      setName(organization.name);
      setEmail(organization.email);
      setPhoneNumber(organization.phoneNumber);
      setCnpj(organization.cnpj);
      setImageUrl(organization.imageUrl);
    };

    fetchOrganization();
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const organization: Organization = {
      name,
      email,
      phoneNumber,
      cnpj,
      imageUrl
    };

    const response = await fetch(`${API_URL}/organizations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organization)
    });

    if (response.ok) {
      alert('Organization updated successfully');
      navigate('/')
    } else {
      alert('Error updating organization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Update Organization</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" placeholder="Organization Name" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded" />
          <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="px-4 py-2 border border-gray-300 rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;