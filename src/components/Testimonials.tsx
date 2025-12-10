import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "We've seen a 40% increase in response rates since implementing WarmChats for our B2B outreach. The AI's ability to reference specific company achievements and pain points is remarkable.",
      author: "David Thompson",
      position: "Head of Sales"
    },
    {
      quote: "As a small agency, personalized outreach was taking up too much time. WarmChats helps us maintain quality while scaling our client acquisition process. Response rates are consistently above industry average.",
      author: "Emma Rodriguez",
      position: "Founder & CEO"
    },
    {
      quote: "The platform's ability to maintain our brand voice while personalizing each message is impressive. We've reduced our outreach preparation time by 65% while improving engagement.",
      author: "James Mitchell",
      position: "Growth Lead"
    },
    {
      quote: "Our team has completely transformed how we approach cold outreach. The AI understands context so well that prospects often think we've spent hours researching them.",
      author: "Sarah Chen",
      position: "Marketing Director"
    },
    {
      quote: "The ROI has been incredible. We're seeing 3x more meetings booked with half the time investment. The personalization at scale is a game-changer for our sales process.",
      author: "Michael Reeves",
      position: "Business Development"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 data-aos="fade-up" className="section-title">Trusted by Industry Leaders</h2>
        <p data-aos="fade-up" className="section-subtitle mb-12 md:mb-16">
          See how teams are transforming their outreach with WarmChats
        </p>
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="h-full bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex gap-1 mb-3 md:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-warmchats-flame text-warmchats-flame md:w-4 md:h-4" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed">"{testimonial.quote}"</p>
                    
                    <div>
                      <div className="font-medium text-gray-900 text-sm md:text-base">{testimonial.author}</div>
                      <div className="text-gray-500 text-xs md:text-sm mt-1">{testimonial.position}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
