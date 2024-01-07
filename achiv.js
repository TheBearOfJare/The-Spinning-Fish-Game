show_mystery_explanation = function() {
	if (document.getElementById('mystery_explanation').style.display === 'none') {
		document.getElementById('mystery_explanation').style.display = 'block'
		document.getElementById('toggle_mystery').innerHTML = 'Unlearn'
	}
	else {
		document.getElementById('mystery_explanation').style.display = 'none';
		document.getElementById('toggle_mystery').innerHTML = 'Learn more'
	}
}