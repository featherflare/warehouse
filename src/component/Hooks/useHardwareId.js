import { useState } from 'react';

export default function useHardwareId() {
  const getHardwareId = () => {
    const hardwareIdString = localStorage.getItem('hardware_id');
    const userHardwareId = JSON.parse(hardwareIdString);
    return userHardwareId?.hardware_id
  };

  const [hardwareId, setHardwareId] = useState(getHardwareId());

  const saveHardwareId = userHardwareId => {
    localStorage.setItem('hardware_id', JSON.stringify(userHardwareId));
    setHardwareId(userHardwareId.hardware_id);
  };

  return {
    setHardwareId: saveHardwareId,
    hardwareId
  }
}