import scaleAndCrope from './lib/scaleAndCrope';
import showMessage from './lib/showMessage';
import isValid from './lib/isValid';


const handleData = (event) => {
  const file = event.target.files[0];

  if (!isValid(file)) {
    return;
  }

  const reader = new FileReader();
  const maxImageW = 300;
  const maxImage = 300;
  reader.addEventListener('load', scaleAndCrope(maxImageW, maxImage));
  reader.addEventListener('error', (e) => {
    showMessage(e.target.error.message);
  });
  reader.readAsDataURL(file);
};


document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  input.addEventListener('change', handleData);
});
