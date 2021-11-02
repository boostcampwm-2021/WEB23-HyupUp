import hi from '@/test/test';

export const f = (x: number, y: number) => x + y;

console.log(f(3, 4), hi);
console.log('Hi');

function add(x: number, y: number) {
	if (x > 10) {
		return;
	}
	return x + y;
}
