import scaleAndCrope from './scaleAndCrope';


document.addEventListener('DOMContentLoaded', () => {
  const maxImageWidth = 300;
  const maxImageHeight = 300;
  const input = document.getElementById('input');
  input.addEventListener('change', scaleAndCrope(maxImageWidth, maxImageHeight));
});
