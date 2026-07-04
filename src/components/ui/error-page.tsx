import { Button } from "./button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "./empty";
import { HomeIcon } from "lucide-react";

interface ErrorPageProps {
  code?: string;
  description?: string;
  children?: React.ReactNode;
}

export function ErrorPage({ 
  code = "404", 
  description = "The page you're looking for might have been \n moved or doesn't exist.",
  children
}: ErrorPageProps) {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			<Empty>
        <div className="mb-4 flex justify-center">
          {children || <img src="/tuneboss-logo.png" alt="TuneBoss Logo" className="h-16 md:h-24 object-contain" />}
        </div>
				<EmptyHeader>
					<EmptyTitle 
            className="font-extrabold text-[10rem] md:text-[15rem] leading-none text-[#e87a1e]"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
            }}
          >
						{code}
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-center text-xl md:text-2xl text-foreground/80">
						{description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex justify-center mt-4">
						<Button asChild size="lg" className="bg-[#e87a1e] hover:bg-[#e87a1e]/90 text-white text-lg px-8 py-6">
							<a href="/">
								<HomeIcon
								className="size-5 mr-2" data-icon="inline-start" />
								Go Home
							</a>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
