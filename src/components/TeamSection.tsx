import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Mail, Award, Users } from "lucide-react";

const teamMembers = [
	{
		id: 1,
		name: "Abdulrahman Smadi",
		role: "Instructor",
		specialization: "Solar Energy Systems",
		image: "Abdulrahman_Smadi.jpeg",
		linkedin: "https://www.linkedin.com/in/a-smadi/",
	},
	{
		id: 2,
		name: "Abdulrahman Al-Mashti",
		role: "Instructor",
		specialization: "Solar Systems Modelling Expert",
		image: "Abdulrahman_Almashti.png",
		linkedin: "",
	},
	{
		id: 3,
		name: "Amaal Al-Khatatbeh",
		role: "Instructor",
		specialization: "Green Energy Solutions Specialist",
		image: "Amaal_Al-Khatatbeh.png",
		linkedin: "https://www.linkedin.com/in/amaal-al-khatatbeh/",
	},
	{
		id: 4,
		name: "Anan Omar",
		role: "Instructor",
		specialization: "Solar PV Sales & Design Expert",
		image: "Anan_Omar.jpeg",
		linkedin: "https://www.linkedin.com/in/anan-omar/",
	},
	{
		id: 5,
		name: "Awangum",
		role: "Instructor",
		specialization: "Solar Water Pumping Systems Specialist",
		image: "Awangum.png",
		linkedin: "",
	},
	{
		id: 6,
		name: "Ayman Mousa",
		role: "Instructor",
		specialization: "Solar PV Systems Expert",
		image: "Ayman_Mousa.jpeg",
		linkedin: "",
	},
	{
		id: 7,
		name: "Charles Ekpima",
		role: "Instructor",
		specialization: "Solar Energy Repairs Trainer",
		image: "Charles_Ekpima.png",
		linkedin: "https://www.linkedin.com/in/charles-ekpima/",
	},
	{
		id: 8,
		name: "Mohammad Omar",
		role: "Instructor",
		specialization: "Renewable Energy Expert",
		image: "https://professional-institute.com/wp-content/uploads/learn-press-profile/18/8221108e07df7fdc512c4ad2956d58f6.jpeg",
		linkedin: "",
	},
	{
		id: 9,
		name: "Rama Hijazi",
		role: "Instructor",
		specialization: "Sustainable Energy Solutions",
		image: "https://professional-institute.com/wp-content/uploads/learn-press-profile/619/79da9534cd6c67528b0b2bfe7c09087d.jpeg",
		linkedin: "https://www.linkedin.com/in/ramahijazi/#",
	},
	{
		id: 10,
		name: "Reem Jawarneh",
		role: "Instructor",
		specialization: "Green Technology Specialist",
		image: "https://professional-institute.com/wp-content/uploads/learn-press-profile/14/51bcfaaea632d008fb6f910a68afb8f5.jpeg",
		linkedin: "https://www.linkedin.com/in/reem-jawarneh-653ba51b2/",
	},
	{
		id: 11,
		name: "Salem Al Khawaja",
		role: "Instructor",
		specialization: "Energy Systems Engineer",
		image: "https://professional-institute.com/wp-content/uploads/learn-press-profile/16/80f1f2fc34c8b11a2ac1ba97ebba509f.jpeg",
		linkedin: "https://www.linkedin.com/in/salem-al-khawaja-pmp%C2%AE-b4061838/",
	},
	{
		id: 12,
		name: "Tarek MERHBI",
		role: "Instructor",
		specialization: "Energy Storage Systems Expert",
		image: "https://professional-institute.com/wp-content/uploads/learn-press-profile/1280/8d9641e08e6339a4ce3bc65bfc0cfa1a.png",
		linkedin: "https://www.linkedin.com/in/tarek-merhbi-a77217174/",
	},
];

export const TeamSection = () => {
	const [displayedMembersCount, setDisplayedMembersCount] = useState(3);

	const displayedMembers = teamMembers.slice(0, displayedMembersCount);
	const hasMoreMembers = teamMembers.length > displayedMembersCount;

	const handleViewMore = () => {
		setDisplayedMembersCount((prev) => prev + 3);
	};

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16 animate-fade-up">
					<h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
						Meet Our Team
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Our world-class instructors bring decades of industry experience and
						academic excellence to deliver the highest quality renewable energy
						education.
					</p>
				</div>

				{/* Team Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayedMembers.map((member, index) => (
						<Card
							key={member.id}
							className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card animate-scale-in overflow-hidden"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<CardContent className="p-0">
								{/* Profile Image */}
								<div className="relative overflow-hidden">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Social Links - Appear on Hover */}
									<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										{member.linkedin && (
											<a
												href={member.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
											>
												<LinkedinIcon className="h-4 w-4 text-primary" />
											</a>
										)}
									</div>
								</div>

								{/* Member Info */}
								<div className="p-6 text-center">
									<h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
										{member.name}
									</h3>
									<p className="text-primary font-medium mb-2">
										{member.role}
									</p>
									<div className="flex items-center justify-center mb-3">
										<Award className="h-4 w-4 text-muted-foreground mr-2" />
										<p className="text-sm text-muted-foreground">
											{member.specialization}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* View More Button */}
				{hasMoreMembers && (
					<div className="text-center mt-12 animate-fade-up">
						<Button
							onClick={handleViewMore}
							variant="outline"
							size="lg"
							className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
						>
							View More Team Members
							<Users className="ml-2 h-5 w-5" />
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};
