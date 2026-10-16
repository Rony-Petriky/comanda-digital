export const playAlertSound = () => {
  try {
    const audio = new Audio('/audio/alert.mp3');
    audio.play().catch((error) => {
      console.warn('Bloqueio de reprodução automática de áudio pelo navegador:', error);
    });
  } catch (err) {
    console.error('Erro ao tentar tocar o áudio de alerta:', err);
  }
};