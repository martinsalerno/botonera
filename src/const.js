const charCodes = {
	"32": "space",
	"45": "-",
	"97": "a",
	"98": "b",
	"99": "c",
	"100": "d",
	"101": "e",
	"102": "f",
	"103": "g",
	"104": "h",
	"105": "i",
	"106": "j",
	"107": "k",
	"108": "l",
	"109": "m",
	"110": "n",
	"111": "o",
	"112": "p",
	"113": "q",
	"114": "r",
	"115": "s",
	"116": "t",
	"117": "u",
	"118": "v",
	"119": "w",
	"120": "x",
	"121": "y",
	"122": "z"
};

const charDefaultConfig = {
	spam: 1,
	disabled: false,
	backgroundColor: "transparent"
};

const charOverrideConfig = {
	"space": {
		spam: 3
	},
	"-": {
		disabled: true,
		backgroundColor: "black"
	}
};

const charConfig = Object.values(charCodes).reduce((accum, char) => {
	return { ...accum,
		[char]: {...charDefaultConfig, ...charOverrideConfig[char]}
	}
}, {});

const qwerty = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d" , "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
	["-", "-", "space", "-", "-"]
];

const themes = {
	default: {
		name: "default",
		layout: qwerty,
		style: {
			background: {
				onPlayerFocus: "transparent",
				onPlayerBlur: "rgba(0, 0, 0, 0.07)"
			}
		}
	}
};

const oauthProviders = {
	google: "google",
	facebook: "facebook"
};

const tokenHeader = "x-botonera-token"; 
const apiURL      = process.env.REACT_APP_API_URL || "http://localhost:4567";

export { charCodes, charConfig, themes, apiURL, tokenHeader, oauthProviders }
