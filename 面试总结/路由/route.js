class BaseRoute {
	constructor() {
		this.routes = {};
		this.currentUrl = '';
		this.init = this.init.bind(this);
		this.init();
	}

	route(path, callback) {
		this.routes[path] = callback || function () {};
		console.log(path, this.routes[path]);
	}

	refresh() {
		this.currentUrl = location.hash.slice(1) || '/';
		console.log(location.hash, 233);
		this.routes[this.currentUrl]();
	}

	init() {
		window.addEventListener('load', this.refresh.bind(this), false);
		window.addEventListener('hashchange', this.refresh.bind(this), false);
	}
}

const router = new BaseRoute();

var content = document.querySelector('body');
function changeBgColor(color) {
	content.style.backgroundColor = color;
}

router.route('/', function () {
	changeBgColor('white');
});
router.route('/blue', function () {
	changeBgColor('blue');
});
router.route('/green', function () {
	changeBgColor('green');
});
