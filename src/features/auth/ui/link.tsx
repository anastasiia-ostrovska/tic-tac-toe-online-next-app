import Link from "next/link";

interface AuthFormLinkBottomProps {
	text: string;
	linkTitle: string;
	url: string;
}

export function AuthFormBottomLink({
	text,
	linkTitle,
	url,
}: AuthFormLinkBottomProps) {
	return (
		<div className="text-center text-sm">
			<span className="text-muted-foreground">{text}</span>
			<Link href={url} className="text-primary hover:underline font-medium">
				{linkTitle}
			</Link>
		</div>
	);
}
