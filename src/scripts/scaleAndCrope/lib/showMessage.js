export default (message) => {
  const messagesParagraph = document.getElementById('messages');
  messagesParagraph.innerHTML = '';
  const messageNode = document.createTextNode(message);
  messagesParagraph.appendChild(messageNode);
};
