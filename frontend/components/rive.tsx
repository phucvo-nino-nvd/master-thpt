import type { CSSProperties } from 'react';

type RiveProps = {
	src: 'mascot_hello' | 'streak' | 'bomb' | 'burst' | 'chest' | 'warrior';
	className?: string;
	style?: CSSProperties;
	fit?: 'cover' | 'contain';
	trigger?: string;
	bool?: string;
	vm?: string;
	artboard?: string;
	fireseq?: string;
	knockout?: boolean;
	autobind?: boolean;
	fireonload?: boolean;
};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'rive-slot': Record<string, string | CSSProperties | undefined>;
		}
	}
}

const flag = (on?: boolean) => (on ? '' : undefined);

export function Rive({ src, className, style, vm, knockout, autobind, fireonload, ...rest }: RiveProps) {
	return (
		<rive-slot
			src={`/rive/${src}.riv`}
			className={className}
			style={{ width: '100%', height: '100%', ...style }}
			vm-number={vm}
			knockout={flag(knockout)}
			autobind={flag(autobind)}
			fireonload={flag(fireonload)}
			{...rest}
		/>
	);
}
