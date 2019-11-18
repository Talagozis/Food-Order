import { List } from "linqts";

export { };

declare global {
	interface Array<T> {
		ToList(): List<T>;
	}
}

if (!Array.prototype.ToList) {
	Array.prototype.ToList = function() {
		return new List<any>(this);
	};
}
