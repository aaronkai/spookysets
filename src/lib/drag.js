import { spring } from 'svelte/motion';

export function drag(node) {
	let x, y;
	const coordinates = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.2,
			damping: 0.4,
		},
	);

	coordinates.subscribe(($coords) => {
		node.style.transform = `translate3d(${$coords.x}px, ${$coords.y}px,0)`;
	});

	node.addEventListener('mousedown', handleMouseDown);

	function handleMouseDown(event) {
		x = event.clientX;
		y = event.clientY;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}
	function handleMouseMove(event) {
		//find delta of first mousedown vs current cursor position
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;
		coordinates.update(($coords) => {
			return {
				x: $coords.x + dx,
				y: $coords.y + dy,
			};
		});
		console.log('delta', dx);
	}
	function handleMouseUp() {
		//fire up event
		node.dispatchEvent(
			new CustomEvent('dragstop', {
				detail: {
					x,
					y,
				},
			}),
		);
		//reset values
		coordinates.update(() => {
			return {
				x: 0,
				y: 0,
			};
		});
		//remove event listener
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
	return {
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
		},
	};
}
