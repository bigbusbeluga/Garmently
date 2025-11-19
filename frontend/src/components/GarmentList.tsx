import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface Garment {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  price: number;
}

const GarmentList: React.FC = () => {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test connection first
        const connectionTest = await apiService.testConnection();
        setConnectionStatus(`✅ ${(connectionTest as any).message}`);

        // Fetch garments
        const garmentsData = await apiService.getGarments();
        setGarments(garmentsData as Garment[]);
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to backend. Make sure Django server is running.');
        setConnectionStatus('❌ Connection failed');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Garmently App
        </h1>
        <p style={{ color: '#6b7280' }}>React + Django Integration Demo</p>
        <div className="status-box">
          <strong>Backend Status:</strong> {connectionStatus}
        </div>
      </div>

      {error ? (
        <div className="error-box">
          {error}
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Available Garments
          </h2>
          <div className="grid">
            {garments.map((garment) => (
              <div key={garment.id} className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {garment.name}
                </h3>
                <div style={{ color: '#6b7280' }}>
                  <p><strong>Type:</strong> {garment.type}</p>
                  <p><strong>Color:</strong> {garment.color}</p>
                  <p><strong>Size:</strong> {garment.size}</p>
                  <p className="price">
                    ${garment.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GarmentList;