import { useState } from 'react';
import { Onbarding } from './component/onboarding';
import { Dashboard } from './component/dashboard';

export function Task() {
  const [showNewComponent, setShowNewComponent] = useState(false);

  const handleClick = () => {
    setShowNewComponent(true);
  };

  return (
    <div className="flex w-[380px] h-[670px] mt-5 justify-center items-center">
      {showNewComponent ? (
        <Dashboard />
      ) : (
        <Onbarding handleClick={handleClick} />
      )}
    </div>
  );
}