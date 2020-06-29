/* eslint-disable max-len */
const sexualPreference = document.forms['filterForm'].elements['sexPref'];
const users = document.getElementsByClassName('userCard');

/**
 * @title readChange from element
 * @param {*} elementList nodeList of radiobuttons
 */
function readChange(elementList) {
  for (let index = 0; index < elementList.length; index++) {
    if (elementList[index].checked === true) {
      const test1 = sexualPreference.value;
      if (test1 === 'female') {
        // female logic
        Array.from(users).forEach((elem) => {
          elem.style.display = 'block';
          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          if (userGender !== 'female') {
            elem.style.display = 'none';
          }
        });
      } else if (test1 === 'male') {
        // male logic
        Array.from(users).forEach((elem) => {
          elem.style.display = 'block';
          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          if (userGender !== 'male') {
            elem.style.display = 'none';
          }
        });
      } else {
        // other logic
        Array.from(users).forEach((elem) => {
          elem.style.display = 'block';
          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          if (userGender !== 'other') {
            elem.style.display = 'none';
          }
        });
      }
    }
  }
}
