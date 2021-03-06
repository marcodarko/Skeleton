// validations
export function validatePassword(password) {
	/*requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces.*/
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
	return re.test(password);
}

/*Extra validation for password */
// function validatePWConfirmation(passwordConfirmation) {

// }

export function validateName(name) {
	var re = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,4}$/;
	return re.test(name);
};


export function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

