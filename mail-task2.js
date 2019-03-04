	// Параллельные вычисления

	function parallel(functions, callback) {
		let count;
		let results = new Array(functions.length);

		const resolver = (i, value) => {
			results[i] = value;
			count = count == null ? results.filter(item => item == null).length : count - 1;

			if (count === 0) {
				callback(results);
			}
		};

		functions.map((fn, index) => {
			const value = fn(resolver.bind(null, index));
			if (results[index] == null) {
				results[index] = value;
			}
		});

		if (count == null) {
			count = results.filter(item => item == null).length;
		}

		if (count === 0) {
			callback(results);
		}
	}


	parallel([
		function (resolve) {
			setTimeout(function () {
				resolve(10);
			}, 50);
		},
		function () {
			return 5;
		},
		function (resolve) {
			setTimeout(function () {
				resolve(0);
			}, 10)
		}
	], function (results) {
		console.log(results); // [10, 5, 0]
	});

	parallel([
		function (resolve) {
			setTimeout(function () {
				resolve(10);
			}, 50);
		},
		function () {
			return 5;
		},
		function (resolve) {
			resolve(0);
		}
	], function (results) {
		console.log(results); // [10, 5, 0]
	});