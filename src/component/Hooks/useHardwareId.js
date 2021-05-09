import { useState } from 'react';

export default function useHardwareId() {
  const getHardwareId = () => {
    const hardwareIdString = localStorage.getItem('hardwareId');
    const userHardwareId = JSON.parse(hardwareIdString);
    return userHardwareId?.hardwareId
  };

  const [hardwareId, setHardwareId] = useState(getHardwareId());

  const saveHardwareId = userHardwareId => {
    localStorage.setItem('hardwareId', JSON.stringify(userHardwareId));
    setHardwareId(userHardwareId.hardwareId);
  };

  return {
    setHardwareId: saveHardwareId,
    hardwareId
  }
}