import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Organization {
  name: string;
  email: string;
  phoneNumber: string;
  cnpj: string;
  imageUrl: string;
}

const API_URL = "http://localhost:8080/api/v1";

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

    const response = await fetch(`${API_URL}/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organization)
    });

    if (response.ok) {
      alert('Organization created successfully');
      navigate('/')
    } else {
      alert('Error creating organization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Create Organization</h1>
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

export default Create;