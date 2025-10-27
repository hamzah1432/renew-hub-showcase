import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "./ui/button";

const clients = [
	{
		name: "KACST",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-8-150x100.png",
	},
	{
		name: "NOMAC",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-9-150x100.png",
	},
	{
		name: "Growatt",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-10-150x100.png",
	},
	{
		name: "Eco Green Energy Co.",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-11-150x100.png",
	},	{
		name: "KACST",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-8-150x100.png",
	},
	{
		name: "NOMAC",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-9-150x100.png",
	},
	{
		name: "Growatt",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-10-150x100.png",
	},
	{
		name: "Eco Green Energy Co.",
		logo: "https://professional-institute.com/wp-content/uploads/2024/07/Group-11-150x100.png",
	},

];

export const ClientsSection = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const itemWidth = 280; // Width of each client item including gap
	const visibleItems = 3; // Number of items visible at once
	const maxIndex = Math.max(0, clients.length - visibleItems);

	const startAutoScroll = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
		}, 3000);
	};

	const stopAutoScroll = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
	};

	const nextSlide = () => {
		goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
	};

	const prevSlide = () => {
		goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
	};

	const toggleAutoPlay = () => {
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		if (isPlaying) {
			startAutoScroll();
		} else {
			stopAutoScroll();
		}

		return () => stopAutoScroll();
	}, [isPlaying, maxIndex]);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			scrollContainer.scrollTo({
				left: currentIndex * itemWidth,
				behavior: 'smooth'
			});
		}
	}, [currentIndex]);

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16 animate-fade-up">
					<h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
						Our Clients & Partners
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Trusted by leading renewable energy companies and organizations
						worldwide for professional development and training programs.
					</p>
				</div>

				{/* Slider Container */}
				<div className="relative max-w-4xl mx-auto">
					{/* Navigation Controls */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								size="icon"
								onClick={prevSlide}
								className="h-12 w-12 rounded-full border-green-100 hover:border-green-200 hover:bg-green-25 text-green-600"
							>
								<ChevronLeft className="h-6 w-6" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={nextSlide}
								className="h-12 w-12 rounded-full border-green-100 hover:border-green-200 hover:bg-green-25 text-green-600"
							>
								<ChevronRight className="h-6 w-6" />
							</Button>
						</div>


					</div>

					{/* Logos Slider */}
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-25 to-emerald-25 dark:from-green-950/10 dark:to-emerald-950/10 p-12 border border-green-50 dark:border-green-900/20">
						<div
							ref={scrollRef}
							className="flex gap-12 overflow-hidden"
							onMouseEnter={stopAutoScroll}
							onMouseLeave={() => isPlaying && startAutoScroll()}
						>
							{clients.map((client, index) => (
								<div
									key={index}
									className="flex-shrink-0  flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-105 border border-green-50 dark:border-green-800/30 backdrop-blur-sm"
								>
									<img
										src={client.logo}
										alt={client.name}
										width={200}
										className="max-w-full max-h-full object-contain p-6"
										onError={(e) => {
											// Fallback to text if logo fails to load
											const target = e.target as HTMLImageElement;
											target.style.display = "none";
											const parent = target.parentElement;
											if (parent) {
												parent.innerHTML = `<div class="text-lg font-semibold text-muted-foreground text-center px-6">${client.name}</div>`;
											}
										}}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center mt-8 gap-3">
						{Array.from({ length: maxIndex + 1 }).map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-4 h-4 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-green-400 scale-125 shadow-lg shadow-green-200"
										: "bg-green-100 hover:bg-green-200"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
					{[
						{ number: "500+", label: "Corporate Partners", color: "text-green-700 dark:text-green-300", bg: "bg-green-50 dark:bg-green-950/30" },
						{ number: "50+", label: "Countries Served", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
						{ number: "10,000+", label: "Professionals Trained", color: "text-green-500 dark:text-green-500", bg: "bg-green-200 dark:bg-green-800/30" },
						{ number: "95%", label: "Satisfaction Rate", color: "text-green-800 dark:text-green-200", bg: "bg-green-75 dark:bg-green-950/40" },
					].map((stat, index) => (
						<div
							key={index}
							className="text-center animate-scale-in group"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className={`mx-auto w-fit px-6 py-4 rounded-2xl ${stat.bg} border-2 border-transparent group-hover:border-current group-hover:scale-105 transition-all duration-300 mb-4`}>
								<div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
									{stat.number}
								</div>
							</div>
							<div className="text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};