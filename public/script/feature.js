/* eslint-disable max-len */
console.log(`hello`);

const sexualPreference = document.forms['filterForm'].elements['sexPref'];
const users = document.getElementsByClassName('userCard');
const userGender = document.querySelectorAll('.userGender');

const checkPref = (test, test2) => {
  return test === test2;
};

/**
 *
 * @param {*} elements
 */
function containsValue(nodeList) {
  console.log('enter func');
  for (let index = 0; index < nodeList.length; index++) {
    const element = nodeList[index];
    if (element.innerText == 'female') {
      console.log('female selected');
      return 'female';
    } else if (element.innerText == 'male') {
      console.log('male selected');
      return 'male';
    } else {
      console.log('other selected');
      return 'other';
    }
  }
}

/**
 * @title readChange from element
 * @param {*} elementList nodeList of radiobuttons
 */
function readChange(elementList) {
  // console.log(elementList);
  for (let index = 0; index < elementList.length; index++) {
    if (elementList[index].checked === true) {
      const test1 = sexualPreference.value;
      // const test2 = document.getElementsByClassName('userGender')[index].getElementsByTagName('span')[0].innerText;
      // const test2 = userGender[index].innerHTML;
      // console.log(`test1: ${test1}, test2: ${test2}`);

      if (test1 === 'female') {
        // female logic
        console.log(`entering logic: female`);
        Array.from(users).forEach((elem) => {
          elem.style.opacity = 1;
          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          console.log(userGender);
          if (userGender !== 'female') {
            elem.style.display = 'none';
          }
        });
      } else if (test1 === 'male') {
        // male logic
        console.log(`entering logic: male`);
        Array.from(users).forEach((elem) => {
          elem.style.opacity = 1;

          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          console.log(userGender);
          if (userGender !== 'male') {
            elem.style.display = 'none';
          }
        });
      } else {
        // other logic
        console.log(`entering logic: other`);
        Array.from(users).forEach((elem) => {
          elem.style.opacity = 1;

          const userGender = elem.querySelectorAll('.userGender')[0].innerText;
          console.log(userGender);
          if (userGender !== 'other') {
            elem.style.display = 'none';
          }
        });
      }

      // Array.from(users).forEach((element) => {
      //   const elementGender = element.querySelectorAll('.userGender');
      //   const comparedValue = containsValue(elementGender);
      //   if (comparedValue == 'female') {
      //     console.log('truth');
      //     element.style.opacity = 0.1;
      //   }
      // //  console.log(elementGender);
      // });
      
      // console.log(elementList[index].defaultValue);
      // console.log(`woop: ${checkPref(test1, test2)}`);
      // if ((checkPref(test1, test2) === true)) {
      //   // users[index].style.opacity = 0.1;
      //   for (let index = 0; index < users.length; index++) {
      //     const element = users[index];
      //     element.style.opacity = 0.1;
      //     // console.log(`${element.innerHTML}`);
      //   }
      // }
    }
  }
}


/* Does return value once but not of change */
// document.forms['filterForm'].addEventListener('input', readChange(sexualPreference));
