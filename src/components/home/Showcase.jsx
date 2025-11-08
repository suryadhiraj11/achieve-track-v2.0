import React from "react";

export default function Showcase() {
  return (
    <section id="showcase" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="section-title mb-6">Achievement Showcase</h2>
        <p className="section-subtitle mb-12">
          A glimpse into the achievements shared by students like you.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="showcase-card">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Debate"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">National Debate Winner</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Champion of the National Inter-University Debate 2025.
              </p>
            </div>
          </div>

          <div className="showcase-card">
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80"
              alt="Research"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">AI Ethics Research</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Published in the International Journal of AI & Ethics.
              </p>
            </div>
          </div>

          <div className="showcase-card">
            <img
              src="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Sports"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Varsity Soccer Captain</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Led the team to a regional championship win.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
