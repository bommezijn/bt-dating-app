console.log(`hello`);

const sexualPreference = document.forms['filterForm'].elements['sexPref'];
const users = document.getElementsByClassName('userCard');
const userGender = document.querySelectorAll('.userGender');

const checkPref = (test, test2) => {
  return test === test2;
};

/**
 * @title readChange from element
 * @param {*} elementList nodeList of radiobuttons
 */
function readChange(elementList) {
  for (let index = 0; index < elementList.length; index++) {
    if (elementList[index].checked === true) {
      const test1 = sexualPreference.value;
      // const test2 = userGender[index].innerHTML;
      const test2 = document.getElementsByClassName('userGender')[index].getElementsByTagName('span')[0].innerText;
      console.log(`test1: ${test1}, test2: ${test2}`);
      // console.log(elementList[index].defaultValue);
      // console.log(`woop: ${checkPref(test1, test2)}`);
      if ((checkPref(test1, test2) === true)) {
        // users[index].style.opacity = 0.1;
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          element.style.opacity = 0.1;
        }
      }
    }
  }
}


/* Does return value once but not of change */
// document.forms['filterForm'].addEventListener('input', readChange(sexualPreference));
