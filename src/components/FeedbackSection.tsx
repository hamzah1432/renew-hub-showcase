import { useState } from "react";
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
		id: 2,
		name: "Ghofrane Rezgui",
		role: "Project Engineer at ILF Consulting Engineering ",
		image: "https://professional-institute.com/wp-content/uploads/2023/12/avatar-woman.png",
		rating: 5,
		feedback:
			"“I highly recommend the Certified Solar PV System Course (Design, Management & Execution) I completed on this platform, particularly for fellow engineers seeking comprehensive preparation for the job market. I found the learning experience to be exceptionally beneficial, and I believe it plays a pivotal role in shaping capable and job-ready engineers.”",
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
];

export const FeedbackSection = () => {
	const [currentIndex, setCurrentIndex] = useState(2); // Start with Dr. Ali Al-Shehri

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
	};

	const currentTestimonial = testimonials[currentIndex];

	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16 animate-fade-in">
					<h2 className="text-4xl font-bold text-gray-800 mb-6">
						Feedback
					</h2>
				</div>

				{/* Profile Images Row */}
				<div className="flex justify-center items-center space-x-6 mb-12">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${
								index === currentIndex ? "opacity-100 scale-110" : "opacity-50 hover:opacity-75"
							}`}
							onClick={() => setCurrentIndex(index)}
						>
							<img
								src={testimonial.image}
								alt={testimonial.name}
								className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 transition-all duration-300"
							/>
						</div>
					))}
				</div>

				{/* Active Testimonial Display */}
				<div className="max-w-3xl mx-auto">
					{/* Name and Role */}
					<div className="text-center mb-8 animate-fade-in" key={currentIndex}>
						<h3 className="text-xl font-bold text-gray-800 mb-2 transition-all duration-500">
							{currentTestimonial.name}
						</h3>
						<p className="text-gray-600 transition-all duration-500">
							{currentTestimonial.role}
						</p>
					</div>

					{/* Testimonial Card */}
					<Card className="border shadow-sm transition-all duration-500 animate-slide-up" key={`card-${currentIndex}`}>
						<CardContent className="p-8">
							<div className="text-center">
								<p className="text-gray-700 text-lg leading-relaxed italic">
									{currentTestimonial.feedback}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Navigation Arrows */}
					<div className="flex justify-center space-x-4 mt-8">
						<button
							onClick={prevTestimonial}
							className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
						>
							<ChevronLeft className="h-5 w-5 text-gray-600" />
						</button>

						<button
							onClick={nextTestimonial}
							className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
						>
							<ChevronRight className="h-5 w-5 text-gray-600" />
						</button>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center space-x-2 mt-6">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									currentIndex === index ? "bg-gray-800 scale-125" : "bg-gray-300 hover:bg-gray-400"
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