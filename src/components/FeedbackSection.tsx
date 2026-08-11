import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
	{
		id: 1,
		name: "Dr. Ali Al-Shehri",
		role: "Phd, Mechanical Engineering, King Fahd University of Petroleum and Minerals",
		image: "https://professional-institute.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-12-at-18.42.33_4715dda2.jpg",
		rating: 5,
		feedback:
			"“I am genuinely impressed by Professional Renewable Energy Institute, where the commitment to exceptional teaching goes hand in hand with a human touch. The courses, both engaging and enlightening, have gone above and beyond, providing a truly enriching learning experience that extends far beyond what I anticipated.”",
	},
	{
		id: 3,
		name: "Abdullah Baradei",
		role: "Sales Manager at Alternative Energy",
		image: "https://professional-institute.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-12-at-19.18.28_2094b53a-e1702398416767.jpg",
		rating: 5,
		feedback:
			"“I am delighted to share my experience with this Professional Renewable Energy Institute, where I successfully underwent rehabilitation as a certified project engineer in solar systems after passing the required exam. The journey was filled with rich and practical content, providing me with a wealth of valuable information. The insights gained from the courses have proven instrumental in my professional growth, significantly benefiting my standing in the job market. The instructors, experienced and qualified, played a crucial role in my success.”",
	},
	{
		id: 4,
		name: "Hamid Al-Shaikhi",
		role: "Testing and commissioning engineer at NOMAC",
		image: "https://professional-institute.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-13-at-08.46.08_c1a08065-e1703059789691.jpg",
		rating: 5,
		feedback:
			"“I enthusiastically recommend the Solar PV Testing and Commissioning course on Professional Renewable Energy Institute for its transformative impact on my career journey. The hands-on, practical nature of the course not only deepened my technical skills but also instilled a profound sense of purpose. Applying the course insights to various projects, including the significant Red Sea Project, has been a truly rewarding experience.”",
	},
	{
		id: 5,
		name: "Dr. Abdulelah Habib",
		role: "Phd, Mechanical Engineering, king abdulaziz city for science and technology",
		image: "https://professional-institute.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-12-at-18.24.03_4fd2e68d.jpg",
		rating: 5,
		feedback:
			"“I highly commend Professional Renewable Energy Institute for its exceptional teaching standards. Engaging and insightful, the courses offered have proven to be immensely beneficial, providing a valuable learning experience that goes beyond expectations, and will significantly equip engineers and enhance their skills, making them more prepared and confident to meet the demands of the job market.”",
	},
	{
		id: 6,
		name: "Kaleem Ansari",
		role: "Solar Engineer and Safety",
		image: "https://ui-avatars.com/api/?name=Kaleem+Ansari&background=random&color=fff",
		rating: 5,
		feedback: "“I’m pleased to share that I have successfully completed the Mastering Energy Storage Systems Course (MESS), conducted by the Professional Renewable Energy Institute (PRE-Institute). This course provided valuable insights into modern battery technologies, BMS architecture, grid integration, and hybrid renewable systems, equipping me with deeper knowledge in the fast-evolving field of Energy Storage Solutions — an essential pillar for achieving 24/7 clean energy and grid stability. A big thank you to Mark Klein (CEO, PRE-Institute) and Tarek Merhki (Instructor) for their guidance and support.”"
	},
	{
		id: 7,
		name: "Samuel Maged Moreed",
		role: "Renewable Energy Engineer",
		image: "https://ui-avatars.com/api/?name=Samuel+Maged+Moreed&background=random&color=fff",
		rating: 5,
		feedback: "“New Step in Renewable Energy Field ⚡ I would like to share with you that I finished “ Mastering Solar PV System Installation Course “ ( MSPSI ) 💖 ⚡ Special thanks to Professional Renewable Energy Institute - PRE Institute”"
	},
	{
		id: 8,
		name: "Dinusha Lakshan",
		role: "Project Engineer | Project Development | Solar PV",
		image: "https://ui-avatars.com/api/?name=Dinusha+Lakshan&background=random&color=fff",
		rating: 5,
		feedback: "“I'm happy to share that I've obtained a new certification: Mastering SketchUP & PVsyst Solar PV Design Course – MSPVD from Professional Renewable Energy Institute - PRE Institute!This course has equipped me with essential skills for designing and optimizing grid-connected solar PV systems, using industry-leading tools like SketchUp for 3D modeling and PVsyst for detailed simulation and performance analysis. 📚 Skills Gained: ✔ 3D Solar PV Design using SketchUp ✔ PVsyst Simulation & Energy Production Optimization ✔ Shading Analysis & System Performance ✔ Financial Modeling & ROI Analysis This training enhances my ability to contribute to innovative solar energy solutions, ensuring both high performance and cost-effectiveness in every project.”"
	},
	{
		id: 9,
		name: "Dinusha Lakshan",
		role: "Project Engineer | Project Development | Solar PV Design",
		image: "https://ui-avatars.com/api/?name=Dinusha+Lakshan&background=random&color=fff",
		rating: 5,
		feedback: "“I’m happy to share that I’ve earned a new certification: Certified Solar PV Testing & Commissioning (CSPTC) from the Professional Renewable Energy Institute - PRE Institute This course has strengthened my expertise in the practical aspects of solar PV systems—covering pre-commissioning checks, performance verification, and compliance with safety and quality standards. A big thank you to Abdalrahman Smadi for the valuable insights and guidance throughout the training. Looking forward to applying these skills to ensure the successful deployment of high-performance solar energy systems!”"
	},
	{
		id: 10,
		name: "Aseel Radwan",
		role: "Powered by the sun ☀️",
		image: "https://ui-avatars.com/api/?name=Aseel+Radwan&background=random&color=fff",
		rating: 5,
		feedback: "“Excited to share that I have successfully completed the Solar PV Electrical Drawing Design course at the Professional Renewable Energy Institute - PRE Institute , passing the required exam. This training provided indepth knowledge on designing electrical drawings for solar photovoltaic systems an essential component in delivering safe, efficient, and compliant solar systems projects. Looking forward to putting this knowledge into practice on real-world projects!”"
	},
	{
		id: 11,
		name: "Abedalaziz Derbas",
		role: "Solar Energy Design | Mechanical Design Engineer",
		image: "https://ui-avatars.com/api/?name=Abedalaziz+Derbas&background=random&color=fff",
		rating: 5,
		feedback: "“I'm happy to share that I've obtained a new certification: Mastering Solar PV Structure Design Course from Professional Renewable Energy Institute - PRE Institute!”"
	}
];

export const FeedbackSection = () => {
	const [currentIndex, setCurrentIndex] = useState(2); // Start with Dr. Ali Al-Shehri
	const [isPaused, setIsPaused] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Auto-scroll functionality
	useEffect(() => {
		if (!isPaused) {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % testimonials.length);
			}, 4000); // Change testimonial every 4 seconds
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isPaused]);

	// Handle mouse enter/leave for pause functionality
	const handleMouseEnter = () => {
		setIsPaused(true);
	};

	const handleMouseLeave = () => {
		setIsPaused(false);
	};

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
		setIsPaused(true); // Pause auto-scroll when user manually navigates
		setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
	};

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
		setIsPaused(true); // Pause auto-scroll when user manually navigates
		setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
	};

	const currentTestimonial = testimonials[currentIndex];

	return (
		<section
			className="py-12 md:py-16 lg:py-20 bg-white"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-10 md:mb-12 lg:mb-16 animate-fade-in">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-4 lg:mb-6">
						Feedback
					</h2>
				</div>

				{/* Profile Images Row */}
				<div className="flex justify-center items-center space-x-3 md:space-x-4 lg:space-x-6 mb-8 md:mb-12 overflow-x-auto pb-2">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`cursor-pointer transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${index === currentIndex ? "opacity-100 scale-110" : "opacity-50 hover:opacity-75"
								}`}
							onClick={() => {
								setCurrentIndex(index);
								setIsPaused(true); // Pause auto-scroll when user clicks
								setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
							}}
						>
							<img
								src={testimonial.image}
								alt={testimonial.name}
								className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-gray-200 transition-all duration-300"
							/>
						</div>
					))}
				</div>

				{/* Active Testimonial Display */}
				<div className="max-w-3xl mx-auto">
					{/* Name and Role */}
					<div className="text-center mb-6 md:mb-8 animate-fade-in px-4" key={currentIndex}>
						<h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 transition-all duration-500">
							{currentTestimonial.name}
						</h3>
						<p className="text-sm md:text-base text-gray-600 transition-all duration-500">
							{currentTestimonial.role}
						</p>
					</div>

					{/* Testimonial Card */}
					<Card className="border shadow-sm transition-all duration-500 animate-slide-up" key={`card-${currentIndex}`}>
						<CardContent className="p-4 md:p-6 lg:p-8">
							<div className="text-center">
								<p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed italic">
									{currentTestimonial.feedback}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Navigation Arrows */}
					<div className="flex justify-center space-x-3 md:space-x-4 mt-6 md:mt-8">
						<button
							onClick={prevTestimonial}
							className="p-2 md:p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
						>
							<ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
						</button>

						<button
							onClick={nextTestimonial}
							className="p-2 md:p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
						>
							<ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
						</button>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center space-x-2 mt-4 md:mt-6">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									setCurrentIndex(index);
									setIsPaused(true); // Pause auto-scroll when user clicks
									setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
								}}
								className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-gray-800 scale-125" : "bg-gray-300 hover:bg-gray-400"
									}`}
							/>
						))}
					</div>
				</div>
			</div>

			<style>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slide-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease-out;
				}

				.animate-slide-up {
					animation: slide-up 0.5s ease-out;
				}
			`}</style>
		</section>
	);
};