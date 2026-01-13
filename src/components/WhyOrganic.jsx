const WhyOrganic = () => {
  const benefits = [
    {
      icon: '🌱',
      title: '100% Organic',
      description: 'No artificial hormones, antibiotics, or pesticides. Pure, natural milk from happy, healthy cows.'
    },
    {
      icon: '💪',
      title: 'Rich in Nutrients',
      description: 'Higher levels of omega-3 fatty acids, antioxidants, and essential vitamins for your family.'
    },
    {
      icon: '🫙',
      title: 'Glass Bottles',
      description: 'Safe, hygienic, and eco-friendly. No plastic chemicals leaching into your milk.'
    },
    {
      icon: '🚚',
      title: 'Fresh Daily',
      description: 'Delivered fresh from our farm within hours. Maximum freshness and nutritional value.'
    },
    {
      icon: '✅',
      title: 'Lab Tested',
      description: 'Regular quality testing ensures purity, safety, and compliance with all standards.'
    },
    {
      icon: '🌍',
      title: 'Eco-Friendly',
      description: 'Sustainable farming practices and reusable glass bottles help protect our environment.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-green mb-4">
            Why Choose Organic?
          </h2>
          <p className="text-xl text-charcoal/70">
            The benefits of organic milk go beyond just taste
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-cream rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-display font-semibold text-primary-green mb-2">
                {benefit.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOrganic;
