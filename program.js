function Cat1(name) {
	return {
		meeow: function () {
			const chars = name.split('');
			const output = chars.reduce((output, char) => {
				const frament = ['a', 'b', 'c'].map(() => char).join('');
				return output + fragment;
			}, '');

			console.log(output);
			return this;
		},
		setName: function (newName) {
			name = newName;
			return this;
		}
	}
}

Cat1('Mitzi').meeow().setName('hi').meeow();