type ColorScheme = {
	primary: `#${string}`;
	secondary: `#${string}`;
	tertiary: `#${string}`;
};

export const ColorSchemes: Record<string, ColorScheme> = {
	CURRENT: {
		// Primary: A soft yellow (#fff97f) suggesting warmth, optimism, and energy.
		primary: "#fff97f",
		// Secondary: A light pink (#ffbde3) for a touch of playfulness and compassion.
		secondary: "#ffbde3",
		tertiary: "#000000",
	},

	/////////////////////////////////////////////////////////////////////////////

	ENS: {
		primary: "#513eff",
		secondary: "#52e5ff",
		tertiary: "#000000",
	},

	ENS_Reverse: {
		primary: "#52e5ff",
		secondary: "#513eff",
		tertiary: "#000000",
	},

	/////////////////////////////////////////////////////////////////////////////

	GPT_1: {
		// Primary: A fresh mint green (#47fa9f) symbolizing growth, renewal, and harmony.
		primary: "#47fa9f",
		// Secondary: A bright sky blue (#01e2ff) for clarity, creativity, and openness.
		secondary: "#01e2ff",
		tertiary: "#000000",
	},

	GPT_A: {
		primary: "#bceff5",
		secondary: "#1e6695",
		tertiary: "#000000",
	},

	GPT_B: {
		primary: "#43efd9",
		secondary: "#5b4cc3",
		tertiary: "#000000",
	},

	GPT_C: {
		primary: "#f17a55",
		secondary: "#ffea80",
		tertiary: "#000000",
	},

	GPT_D: {
		primary: "#feb02b",
		secondary: "#fee99c",
		tertiary: "#000000",
	},

	GPT_E: {
		primary: "#84dd8c",
		secondary: "#00a4a5",
		tertiary: "#000000",
	},

	GPT_F: {
		primary: "#88bdff",
		secondary: "#6a88ff",
		tertiary: "#000000",
	},

	GPT_G: {
		primary: "#7c76f0",
		secondary: "#b2b3e2",
		tertiary: "#000000",
	},

	GPT_H: {
		primary: "#b2b3e2",
		secondary: "#7c76f0",
		tertiary: "#000000",
	},

	GPT_I: {
		primary: "#88a5b9",
		secondary: "#81769c",
		tertiary: "#000000",
	},

	GPT_J: {
		primary: "#00cdb5",
		secondary: "#00a4a6",
		tertiary: "#000000",
	},

	GPT_K: {
		primary: "#0cc6ac",
		secondary: "#00a2ae",
		tertiary: "#000000",
	},

	GPT_L: {
		primary: "#ff696e",
		secondary: "#fed070",
		tertiary: "#000000",
	},

	/////////////////////////////////////////////////////////////////////////////
};

export function colorScheme(): ColorScheme {
	const result: ColorScheme | undefined = ColorSchemes.CURRENT;
	if (!result) {
		throw new Error("No color scheme found");
	}
	return result;
}

// GPT_1_2: {
//   primary: "#50C878",
//   secondary: "#01e2ff",
//   tertiary: "#000000",
// },

// GPT_1_3: {
//   primary: "#93E9BE",
//   secondary: "#01e2ff",
//   tertiary: "#000000",
// },

// GPT_1_4: {
//   primary: "#00A36C",
//   secondary: "#01e2ff",
//   tertiary: "#000000",
// },

// GPT_1_5: {
//   primary: "#30D5C8",
//   secondary: "#01e2ff",
//   tertiary: "#000000",
// },

// GPT_1_6: {
//   primary: "#8DB600",
//   secondary: "#01e2ff",
//   tertiary: "#000000",
// },

// GPT_1R: {
//   primary: "#01e2ff",
//   secondary: "#47fa9f",
//   tertiary: "#000000",
// },

// GPT_2: {
//   primary: "#47fa9f",
//   // Secondary: A warm coral (#ff7f50) representing energy and warmth.
//   secondary: "#FF7F50",
//   tertiary: "#000000",
// },

// GPT_3: {
//   primary: "#47fa9f",
//   // soft lavender
//   secondary: "#E6E6FA",
//   tertiary: "#000000",
// },

// GPT_4: {
//   primary: "#47fa9f",
//   // Secondary: A bright sunflower yellow (#ffc107) for optimism and energy.
//   secondary: "#ffc107",
//   tertiary: "#000000",
// },

// GPT_5: {
//   primary: "#47fa9f",
//   // Secondary: A pale ice blue (#add8e6) for tranquility and freshness.
//   secondary: "#add8e6",
//   tertiary: "#000000",
// },

// GPT_6: {
//   // Primary: A fresh mint green (#47fa9f) symbolizing growth, renewal, and harmony.
//   primary: "#47fa9f",
//   // Secondary: A soft lavender (#e6e6fa) for creativity and calmness.
//   secondary: "#e6e6fa",
//   tertiary: "#000000",
// },

// GPT_7: {
//   // Primary: A vibrant teal (#008080) symbolizing communication and clarity.
//   primary: "#008080",
//   // Secondary: A soft peach (#ffdab9) for warmth and friendliness.
//   secondary: "#ffdab9",
//   tertiary: "#000000",
// },

// GPT_8: {
//   // Primary: A bold raspberry (#e30b5d) for vibrancy and passion.
//   primary: "#e30b5d",
//   // Secondary: A light turquoise (#afeeee) for calmness and balance.
//   secondary: "#afeeee",
//   tertiary: "#000000",
// },

// GPT_9: {
//   // Primary: A lively tangerine (#ff7f50) representing energy and playfulness.
//   primary: "#ff7f50",
//   // Secondary: A cool mint (#98ff98) for freshness and innovation.
//   secondary: "#98ff98",
//   tertiary: "#000000",
// },

// GPT_10: {
//   primary: "#47fa9f",
//   // pale rose
//   secondary: "#FFD1DC",
//   tertiary: "#000000",
// },
