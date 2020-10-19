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

const charSounds = {
	"a": "play.mp3",
	"b": "bateria.mp3",
	"c": "ASUBIR.mp3",
	"d": "datune.mp3",
    "e": "intro_slane_2.mp3",
	"f": "synt.mp3",
	"g": "tune.mp3",
	"h": "ulipo.mp3",
	"i": "datune.mp3",
	"j": "synt.mp3",
	"k": "synt.mp3",
	"l": "ulipo.mp3",
	"m": "synt.mp3",
	"n": "play.mp3",
	"o": "play.mp3",
	"p": "ulipo.mp3",
	"q": "intro_slane_2.mp3",
	"r": "intro_slane_2.mp3",
	"s": "ulipo.mp3",
	"t": "ulipo.mp3",
	"u": "ulipo.mp3",
	"v": "ASUBIR.mp3",
	"w": "ASUBIR.mp3",
	"x": "play.mp3",
	"y": "play.mp3",
	"z": "intro_slane_2.mp3"
};

const charDefaultConfig = {
	span: 1,
	disabled: false,
	backgroundColor: "transparent"
};

const charOverrideConfig = {
	"space": {
		span: 4
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
	["-", "-", "-", "space", "-", "-", "-"]
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

export { charCodes, charConfig, charSounds, themes }
