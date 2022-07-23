import {
	setComponentIndex,
	setComponentVisibility,
	setComponentsFromLocalStorage,
} from '../redux/slices/settings';
import lookie from 'lookie';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	const dispatch = useDispatch();
	const componentsFromSettings = useSelector((state) => state.settings.components);
	const [components, setComponents] = useState({
		tureng: {
			index: 1,
			name: 'tureng',
			text: 'tureng.com',
			visible: true,
			fade: false,
		},
		vip: {
			index: 2,
			name: 'vip',
			text: 'vipingilizce.net',
			visible: true,
			fade: false,
		},
		merriamwebster: {
			index: 3,
			name: 'merriamwebster',
			text: 'merriam-webster.com',
			visible: true,
			fade: false,
		},
		yourdictionary: {
			index: 4,
			name: 'yourdictionary',
			text: 'yourdictionary.com',
			visible: true,
			fade: false,
		},
	});
	const [dragItem, setDragItem] = useState({
		active: false,
		name: '',
		top: 0,
		originTop: 0,
	});
	const setVisibility = useCallback(
		({ name }) => {
			dispatch(setComponentVisibility({ name, visible: !components[name].visible }));
			setComponents({
				...components,
				[name]: { ...components[name], visible: !components[name].visible },
			});
		},
		[components, dispatch],
	);
	const calculateIndex = useCallback(
		({ movement }) => {
			const x = Math.floor(Math.abs(movement) / 56);
			const y = Math.abs(movement) % 56 >= 40 ? 1 : 0;
			const dragItemIndex = components[dragItem.name].index;
			const index = dragItemIndex + (movement > 0 ? x + y : -(x + y));
			if (index <= 0) return 1;
			if (index > Object.keys(components).length) return Object.keys(components).length;
			else return index;
		},
		[dragItem, components],
	);
	useEffect(() => {
		const handleMouseMove = (e) => {
			if (dragItem.active) {
				setDragItem({
					...dragItem,
					top: e.clientY - dragItem.originTop,
				});
			}
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [dragItem]);
	useEffect(() => {
		const handleMouseUp = (e) => {
			if (dragItem.active) {
				setDragItem({ ...dragItem, active: false });
				const index = calculateIndex({ movement: e.clientY - dragItem.originTop });
				const hoverItemName = Object.keys(components).find(
					(key) => components[key].index === index,
				);
				const hoverItemIndex = Object.values(components).find(
					(item) => item.name === dragItem.name,
				).index;
				const newComponents = {
					...components,
					[dragItem.name]: {
						...components[dragItem.name],
						fade: true,
						index,
					},
					[hoverItemName]: {
						...components[hoverItemName],
						index: hoverItemIndex,
					},
				};
				dispatch(
					setComponentIndex({
						dragItemName: dragItem.name,
						dragItemIndex: index,
						hoverItemName,
						hoverItemIndex,
					}),
				);
				setComponents(newComponents);
				const timer = setTimeout(() => {
					setComponents({
						...newComponents,
						[dragItem.name]: {
							...newComponents[dragItem.name],
							fade: false,
						},
					});
				}, 1000);
				return () => clearTimeout(timer);
			}
		};
		window.addEventListener('mouseup', handleMouseUp);
		return () => window.removeEventListener('mouseup', handleMouseUp);
	}, [calculateIndex, dragItem, components, dispatch]);
	useEffect(() => {
		const componentsFromLocalStorage = lookie.get('components');
		if (componentsFromLocalStorage !== null) {
			dispatch(setComponentsFromLocalStorage(componentsFromLocalStorage));
			const componentsWithoutFade = { ...componentsFromLocalStorage };
			for (const key of Object.keys(componentsWithoutFade))
				componentsWithoutFade[key] = { ...componentsWithoutFade[key], fade: false };
			setComponents(componentsWithoutFade);
		}
	}, [dispatch]);
	useEffect(() => {
		lookie.set('components', componentsFromSettings);
	}, [componentsFromSettings]);
	return {
		components,
		setVisibility,
		dragItem,
		setDragItem,
	};
};
