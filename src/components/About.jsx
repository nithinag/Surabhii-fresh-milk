const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-green mb-3 sm:mb-4">
            About Surabhii Fresh Milk
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto px-2">
            Your trusted source for premium organic dairy products
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary-green mb-3 sm:mb-4">
              Freshness You Can Trust
            </h3>
            <p className="text-sm sm:text-base text-charcoal/80 mb-3 sm:mb-4 leading-relaxed">
              At Surabhii Fresh Milk, we believe in delivering nothing but the freshest, 
              purest organic milk directly from our farm to your doorstep. Our commitment 
              to quality and freshness is unmatched.
            </p>
            <p className="text-sm sm:text-base text-charcoal/80 mb-3 sm:mb-4 leading-relaxed">
              We use glass bottles instead of plastic to ensure your milk stays fresh, 
              maintains its natural taste, and is free from any harmful chemicals. 
              Every bottle is carefully sterilized and sealed to preserve the milk's 
              nutritional value.
            </p>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
              Our subscription plans make it easy to enjoy fresh milk regularly, 
              while our loyalty program rewards you for every purchase. Join thousands 
              of satisfied customers who trust Surabhii Fresh Milk for their daily dairy needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-cream p-4 sm:p-6 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-primary-green mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-charcoal/70">Organic</div>
            </div>
            <div className="bg-cream p-4 sm:p-6 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-primary-green mb-1 sm:mb-2">0%</div>
              <div className="text-xs sm:text-sm text-charcoal/70">Additives</div>
            </div>
            <div className="bg-cream p-4 sm:p-6 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-primary-green mb-1 sm:mb-2">Fast</div>
              <div className="text-xs sm:text-sm text-charcoal/70">Delivery</div>
            </div>
            <div className="bg-cream p-4 sm:p-6 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-primary-green mb-1 sm:mb-2">Glass</div>
              <div className="text-xs sm:text-sm text-charcoal/70">Bottles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
