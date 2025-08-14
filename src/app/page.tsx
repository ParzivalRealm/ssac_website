import ElectricGrid from '@/components/ElectricGrid'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <ElectricGrid />
      <HeroSection />
      <ServicesSection />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-navy-900">
                About SSAC
              </h2>
              <p className="text-xl mb-6 text-gray-600 leading-relaxed">
                Since 2009, Solid State Automation and Controls LLC has been at the forefront 
                of industrial automation in Houston, Texas. We specialize in creating cutting-edge 
                automation solutions that drive efficiency and innovation.
              </p>
              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Our team of expert engineers combines deep technical knowledge with practical 
                experience to deliver automation systems that exceed expectations. From concept 
                to implementation, we&apos;re your trusted partner in automation excellence.
              </p>
              <div className="space-y-4">
                {[
                  "15+ Years of Industry Experience",
                  "500+ Successful Projects Completed",
                  "24/7 Technical Support",
                  "Certified UL 508A & 698A Compliance"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 enterprise-shadow">
              <h3 className="text-2xl font-heading font-bold mb-6 text-navy-900">Quality Commitments</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Safety First",
                    description: "All systems designed with comprehensive safety protocols"
                  },
                  {
                    title: "Innovation",
                    description: "Leveraging the latest technologies for optimal performance"
                  },
                  {
                    title: "Reliability",
                    description: "Built to last with minimal downtime and maximum efficiency"
                  },
                  {
                    title: "Support",
                    description: "Ongoing maintenance and support for all our systems"
                  }
                ].map((commitment, index) => (
                  <div key={index} className="border-l-4 border-electric-500 pl-4">
                    <h4 className="font-bold text-navy-900">{commitment.title}</h4>
                    <p className="text-gray-600 text-sm">{commitment.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-navy-900 text-center">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 enterprise-shadow">
                <h3 className="text-xl font-heading font-bold mb-4 text-navy-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-electric-500">📍</span>
                    <span className="text-gray-700">Houston, Texas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-electric-500">📧</span>
                    <span className="text-gray-700">info@ssac-automation.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-electric-500">📞</span>
                    <span className="text-gray-700">24/7 Support Available</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 enterprise-shadow">
                <h3 className="text-xl font-heading font-bold mb-4 text-navy-900">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 9:00 AM - 4:00 PM</div>
                  <div>Sunday: Emergency Support Only</div>
                  <div className="text-success-500 font-bold">24/7 Emergency Support</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 enterprise-shadow">
              <h3 className="text-xl font-heading font-bold mb-6 text-navy-900">Request Quote</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-electric-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-electric-500 focus:outline-none"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-electric-500 focus:outline-none">
                  <option>Select Service</option>
                  <option>Custom Automation</option>
                  <option>Control Panels</option>
                  <option>PLC Programming</option>
                  <option>SCADA Development</option>
                  <option>System Integration</option>
                  <option>Digital Twin</option>
                </select>
                <textarea
                  placeholder="Project Details"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-electric-500 focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
