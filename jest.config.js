module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	// globals: {
	// 	'ts-jest': {
	// 		isolatedModules: true,
	// 	},
	// },
};
