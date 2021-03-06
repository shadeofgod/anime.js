function anime(element, prop, duration, callback) {
	// clear timer
	clearInterval(element.timer);

	element.timer = setInterval(function() {
		for (var attr in prop) {
			// get current style
			var current;

			current = Number(getStyle(element, attr).replace(/[a-zA-Z\(\)]*/gi, ""));

			// calculate speed
			var target = Number(prop[attr].replace(/[a-zA-Z\(\)]*/gi, ""));
			if (attr === "opacity") {
				speed = (target * 100 - current * 100) / duration * 16;
				speed = speed > 0 ? Math.ceil(speed) / 100 : Math.floor(speed) / 100;
			} else {
				speed = (target - current) / duration * 16;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			}

			// see if it should stop
			if (current !== target) {
				current += speed;
				current = getStyle(element, attr).replace(/^\d*\.?\d*/gi, current);
				element.style[attr] = current;
			} else {
				clearInterval(element.timer);
				if (callback) {
					callback();
				}
			}
		}
	}, 16);
}

function getStyle(element, attr) {
	if (element.currentStyle) {
		return element.currentStyle[attr];
	} else {
		return getComputedStyle(element, false)[attr];
	}
}