import showMessage from './showMessage';

export default (file) => {
  const maxFileSize = 2000000;
  const isSuported = {
    'image/jpeg': true,
    'image/png': true,
    'image/svg+xml': true,
  };

  if (!isSuported[file.type]) {
    const messageText = `Sorry, but this tipe of files is not supported.
      \nPlease choose files with .jpeg, .png and .svg extention`;
    showMessage(messageText);
    return false;
  }

  if (file.size > maxFileSize) {
    const messageText = `Sorry, this file is too big.
      \nPlease select file which size is not more then 2 MB.`;
    showMessage(messageText);
    return false;
  }

  return true;
};
