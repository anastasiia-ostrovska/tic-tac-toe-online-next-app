import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	actions: ReactNode;
}

export const Layout = ({ children, actions }: LayoutProps) => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row justify-end gap-4">{actions}</div>
			<div className="grid grid-cols-2 gap-4">{children}</div>
		</div>
	);
};
