import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Certificate from '../components/Certificate';

const CertificatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [participantName, setParticipantName] = useState('');

  if (!state) {
    navigate('/'); // go back if no data
    return null;
  }

  return (
    <Certificate
      wpm={state.wpm}
      accuracy={state.accuracy}
      timeSpent={state.timeSpent}
      participantName={participantName}
      setParticipantName={setParticipantName}
    />
  );
};

export default CertificatePage;