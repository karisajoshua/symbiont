
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request submitted!",
        description: "We've received your message and will contact you soon.",
      });
      setFormData({
        name: '',
        email: '',
        organization: '',
        role: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Partner with Us for Smarter Governance</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Request access to our comprehensive social sentiment dashboard and start 
                making data-driven decisions based on public opinion.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Have questions? Reach out directly.</p>
                <a href="mailto:contact@symbiont.ae" className="text-primary font-medium hover:underline">
                  contact@symbiont.ae
                </a>
              </Card>
              
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Available during business hours.</p>
                <a href="tel:+97121234567" className="text-primary font-medium hover:underline">
                  +971 2 123 4567
                </a>
              </Card>
              
              <Card className="p-6 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our headquarters are located in:</p>
                <span className="text-gray-800">Abu Dhabi, United Arab Emirates</span>
              </Card>
            </div>

            <Card className="border border-gray-100 shadow-md p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Request Access</h2>
                <p className="text-gray-600">
                  Fill out the form below to request access to the Symbiont dashboard.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name*</label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization*</label>
                    <Input 
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Your Role</label>
                    <Input 
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Your position or role"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message*</label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about how you plan to use the dashboard"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="text-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold w-full md:w-auto px-12"
                  >
                    {isSubmitting ? 'Submitting...' : '📩 Request Access to the Dashboard'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
