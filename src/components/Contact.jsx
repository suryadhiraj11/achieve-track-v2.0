export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="section-title mb-4">Get in Touch</h2>
            <p className="section-paragraph mb-8">Have questions or feedback? We'd love to hear from you.</p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <textarea placeholder="Your Message" rows="5" className="form-input mb-6"></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="hidden lg:block relative">
            <img src="https://placehold.co/800x800/C7D2FE/312E81?text=Contact" alt="Contact illustration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
