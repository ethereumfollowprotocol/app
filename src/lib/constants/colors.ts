type ColorScheme = {
	primary: `#${string}`;
	secondary: `#${string}`;
	tertiary: `#${string}`;
};

const DEBUG: ColorScheme = {
	primary: "#ff0000",
	secondary: "#00ff00",
	tertiary: "#0000ff",
};

const PREVIOUS: ColorScheme = {
	primary: "#fff97f",
	secondary: "#ffbde3",
	tertiary: "#3a2d5d",
};

const NEW: ColorScheme = {
	primary: "#47fa9f",
	secondary: "#01e2ff",
	tertiary: "#004d40",
};

export function colorScheme(): ColorScheme {
	return NEW;
}
