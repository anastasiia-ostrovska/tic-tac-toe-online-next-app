import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
	return <div className="grid grid-cols-2 gap-4">{children}</div>;
};
