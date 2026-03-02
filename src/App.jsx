import React, { useState } from 'react';
import WelcomeStep from './components/WelcomeStep';
import InstallLocationStep from './components/InstallLocationStep';
import InstallingStep from './components/InstallingStep';
import CompletionStep from './components/CompletionStep';
import CurrentVersionModal from './components/CurrentVersionModal';
import CurrentVersionPage from './components/CurrentVersionPage';
import BirthdayPage from './components/BirthdayPage';
import './index.css';

function App() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [installProgress, setInstallProgress] = useState(0);
  const [isCheckingVersion, setIsCheckingVersion] = useState(false);

  const goToLocation = () => setCurrentStep('location');
  const goToInstalling = (progress = 0) => {
    setInstallProgress(progress);
    setCurrentStep('installing');
  };
  const goToCurrentVersionPage = () => setCurrentStep('currentVersionPage');
  const goToComplete = () => setCurrentStep('complete');
  const goToBirthday = () => setCurrentStep('birthday');

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={goToLocation} />;
      case 'location':
        return <InstallLocationStep onBack={() => setCurrentStep('welcome')} onInstall={() => goToInstalling(0)} />;
      case 'installing':
        return <InstallingStep
          onCheckVersion={() => setIsCheckingVersion(true)}
          onComplete={goToComplete}
          initialProgress={installProgress}
        />;
      case 'currentVersionPage':
        return <CurrentVersionPage onResume={() => goToInstalling(30)} />;
      case 'complete':
        return <CompletionStep onFinish={goToBirthday} />;
      case 'birthday':
        return <BirthdayPage />;
      default:
        return <WelcomeStep onNext={goToLocation} />;
    }
  };

  return (
    <div className="app-container">
      {renderStep()}
      {isCheckingVersion && currentStep === 'installing' && (
        <CurrentVersionModal onViewVersion={() => {
          setIsCheckingVersion(false);
          goToCurrentVersionPage();
        }} />
      )}
    </div>
  );
}

export default App;
