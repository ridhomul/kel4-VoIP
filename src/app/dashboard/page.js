'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCall, CALL_STATUS } from '../../context/CallContext';
import DialPad from '../../components/DialPad';
import CallButton from '../../components/CallButton';
import CallHistory from '../../components/CallHistory';
import CallInterface from '../../components/CallInterface';

export default function DashboardPage() {
  const [dialNumber, setDialNumber] = useState('');
  const { user, loading } = useAuth();
  const { callStatus } = useCall();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {callStatus !== CALL_STATUS.IDLE && (
        <CallInterface />
      )}
      
      {callStatus === CALL_STATUS.IDLE && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Dial Pad</h2>
            <DialPad 
              value={dialNumber} 
              onChange={setDialNumber} 
            />
            <div className="mt-6 flex justify-center space-x-4">
              <CallButton 
                number={dialNumber} 
                type="audio" 
              />
              <CallButton 
                number={dialNumber} 
                type="video" 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Riwayat Panggilan</h2>
            <CallHistory />
          </div>
        </div>
      )}
    </div>
  );
}