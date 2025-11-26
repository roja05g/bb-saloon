import React, { useState } from 'react';
import { View } from './types';
import { SERVICES, STYLISTS } from './constants';
import { AIConsultant } from './components/AIConsultant';
import { Button } from './components/Button';
import { 
  Menu, X, Calendar, MapPin, Phone, Instagram, Facebook, Twitter, 
  Scissors, Clock, Star, ArrowRight, CheckCircle, Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- Components for sections ---

  const Header = () => (
    <header className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo(View.HOME)}>
            <Scissors className="h-8 w-8 text-stone-900 mr-2" />
            <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Lumière</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {[
              { label: 'Home', view: View.HOME },
              { label: 'Services', view: View.SERVICES },
              { label: 'AI Consultant', view: View.CONSULTANT },
              { label: 'Contact', view: View.CONTACT },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.view)}
                className={`text-sm font-medium tracking-wide uppercase hover:text-amber-600 transition-colors ${
                  currentView === item.view ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => navigateTo(View.BOOKING)} variant="primary" className="py-2 px-5 text-sm">
              Book Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-stone-900 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[
              { label: 'Home', view: View.HOME },
              { label: 'Services', view: View.SERVICES },
              { label: 'AI Consultant', view: View.CONSULTANT },
              { label: 'Contact', view: View.CONTACT },
              { label: 'Book Appointment', view: View.BOOKING },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.view)}
                className="block w-full text-left px-3 py-4 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border-b border-stone-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  const Hero = () => (
    <div className="relative pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?random=1" 
          alt="Salon Interior" 
          className="w-full h-[90vh] object-cover brightness-[0.85] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[90vh] flex flex-col justify-center items-start text-white">
        <span className="text-amber-300 font-medium tracking-[0.2em] mb-4 uppercase">Experience Luxury</span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight max-w-3xl">
          Where Elegance <br/> Meets Artistry
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-lg leading-relaxed font-light">
          Step into a world of refined beauty. Expert styling, premium treatments, and a personalized experience crafted just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigateTo(View.BOOKING)} className="min-w-[160px]">
            Book Appointment
          </Button>
          <Button variant="outline" onClick={() => navigateTo(View.SERVICES)} className="border-white text-white hover:bg-white hover:text-stone-900 min-w-[160px]">
            View Menu
          </Button>
        </div>
      </div>
    </div>
  );

  const ServiceSection = () => (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Services</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          We offer a full range of hair and beauty services designed to help you look and feel your absolute best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-stone-100 group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">{service.name}</h3>
              <span className="text-lg font-serif italic text-amber-600">{service.price}</span>
            </div>
            <p className="text-stone-600 mb-6 text-sm leading-relaxed">{service.description}</p>
            <div className="flex justify-between items-center text-xs text-stone-400 font-medium tracking-wide uppercase border-t border-stone-100 pt-4">
              <span>{service.duration}</span>
              <span>{service.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const StylistSection = () => (
    <div className="bg-stone-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Meet The Team</h2>
          <p className="text-stone-500">Master artists dedicated to your unique style.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STYLISTS.map((stylist) => (
            <div key={stylist.id} className="bg-white rounded-xl overflow-hidden shadow-lg group">
              <div className="relative overflow-hidden h-80">
                <img 
                  src={stylist.imageUrl} 
                  alt={stylist.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-stone-900 mb-1">{stylist.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-4 uppercase tracking-wider">{stylist.role}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{stylist.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingSection = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setBookingStep(0);
        setSelectedDate('');
        setSelectedService('');
        navigateTo(View.HOME);
      }, 3000);
    };

    if (success) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center pt-20 px-4">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Booking Confirmed!</h2>
            <p className="text-stone-600 mb-8">
              We've received your request. A confirmation email has been sent to you. We look forward to seeing you at Lumière.
            </p>
            <Button onClick={() => setSuccess(false)}>Return Home</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-stone-900 p-8 text-center text-white">
            <h2 className="text-3xl font-serif font-bold">Book Your Visit</h2>
            <p className="text-stone-400 mt-2">Let us take care of you</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Select Service</label>
                <select 
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none transition-shadow appearance-none"
                >
                  <option value="">Choose a treatment...</option>
                  {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name} ({s.price})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 text-stone-400 w-5 h-5" />
                    <input 
                      type="date" 
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-4 pl-12 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 text-stone-400 w-5 h-5" />
                    <select className="w-full p-4 pl-12 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none appearance-none">
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>01:00 PM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Stylist Preference (Optional)</label>
                <select className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none appearance-none">
                  <option value="">Any Stylist</option>
                  {STYLISTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                  <input type="text" required className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                  <input type="tel" required className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none" placeholder="(555) 123-4567" />
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth className="text-lg" onClick={() => console.log('Booking submitted', success)}>
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    );
  };

  const ContactSection = () => (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8">Visit Us</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Location</h3>
                <p className="text-stone-600">1234 Boulevard of Light</p>
                <p className="text-stone-600">Beverly Hills, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Phone className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Contact</h3>
                <p className="text-stone-600">+1 (310) 555-0199</p>
                <p className="text-stone-600">hello@lumieresalon.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Hours</h3>
                <div className="grid grid-cols-2 gap-x-8 text-stone-600">
                  <span>Mon - Fri</span>
                  <span>9:00 AM - 8:00 PM</span>
                  <span>Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex space-x-4">
            <button className="p-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"><Instagram size={20} /></button>
            <button className="p-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"><Facebook size={20} /></button>
            <button className="p-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"><Twitter size={20} /></button>
          </div>
        </div>

        <div className="h-[500px] bg-stone-200 rounded-3xl overflow-hidden relative">
           <img 
            src="https://picsum.photos/800/800?random=50" 
            alt="Map location placeholder" 
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-xl">
               <MapPin className="w-8 h-8 text-stone-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-stone-900 text-white py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
             <Scissors className="h-6 w-6 text-amber-500 mr-2" />
             <span className="text-xl font-serif font-bold">Lumière</span>
          </div>
          <div className="text-stone-400 text-sm">
            &copy; 2024 Lumière Salon. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {currentView === View.HOME && (
          <>
            <Hero />
            <div className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-serif text-stone-900 mb-6">Why Choose Lumière?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Premium Products", desc: "We use only the finest, sustainable haircare lines.", icon: Star },
                    { title: "Expert Stylists", desc: "Our team is trained in the latest global trends.", icon: Scissors },
                    { title: "AI Consultation", desc: "Find your perfect look with our smart beauty tech.", icon: Sparkles }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-xl bg-stone-50 hover:bg-amber-50 transition-colors cursor-default">
                      <feature.icon className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                      <h4 className="font-bold text-stone-900 mb-2">{feature.title}</h4>
                      <p className="text-stone-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ServiceSection />
            <StylistSection />
            <div className="bg-stone-900 text-white py-20 px-4 text-center">
               <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to transform?</h2>
               <Button variant="secondary" onClick={() => navigateTo(View.BOOKING)} className="text-lg px-8 py-4">
                 Book Your Appointment
               </Button>
            </div>
          </>
        )}

        {currentView === View.SERVICES && (
          <div className="pt-20">
             <ServiceSection />
             <div className="text-center pb-20">
               <Button onClick={() => navigateTo(View.BOOKING)}>Book a Service</Button>
             </div>
          </div>
        )}

        {currentView === View.BOOKING && <BookingSection />}

        {currentView === View.CONSULTANT && (
          <div className="pt-20 h-full">
            <AIConsultant />
          </div>
        )}

        {currentView === View.CONTACT && <ContactSection />}
      </main>

      {currentView !== View.CONSULTANT && <Footer />}
    </div>
  );
};

export default App;