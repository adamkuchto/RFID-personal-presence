const querystring = require('querystring');
let query = querystring.parse(global.location.search);
let tasks = JSON.parse(query['?data']);

const events = tasks.events;


window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  const renderJson = (task) => {
    const element = document.querySelector('.timesheet-wrapper');
    const headingString = `<li>ID karty: ${task.cardId}</li>`;
    const startDateString = `<li>Rozpoczęcie pracy: ${new Date(task.startDate * 1000).toLocaleTimeString()} - ${new Date(task.startDate * 1000).toLocaleDateString()}</li>`;
    const endDateString = `<li>Koniec pracy: ${new Date(task.endDate * 1000).toLocaleTimeString()} - ${new Date(task.endDate * 1000).toLocaleDateString()}</li>`;
    const unordedList = document.createElement('ul');
    unordedList.classList.add('box');
    unordedList.innerHTML = `${headingString}${startDateString}${endDateString}`;
    element.appendChild(unordedList);
  };

  for (const event of events) {
    renderJson(event);
  } 
  
});
