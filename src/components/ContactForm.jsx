import { useEffect, useRef, useState } from 'react';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

const ContactForm = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    queryType: 'general',
    message: ''
  });

  const queryTypes = [
    { value: 'general', label: t.contact.queryTypes.general },
    { value: 'order', label: t.contact.queryTypes.order },
    { value: 'delivery', label: t.contact.queryTypes.delivery },
    { value: 'quality', label: t.contact.queryTypes.quality },
    { value: 'billing', label: t.contact.queryTypes.billing },
    { value: 'window-shopping', label: t.contact.queryTypes.browsing }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const message = `Hello Surabhii Fresh Milk!

Name: ${formData.name}
Phone: ${formData.phone}
Query Type: ${queryTypes.find(q => q.value === formData.queryType)?.label}

Message:
${formData.message}`;

    openWhatsApp(message);
    
    setFormData({
      name: '',
      phone: '',
      queryType: 'general',
      message: ''
    });
    setTimeout(() => setIsSubmitting(false), 400);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-0 md:scroll-mt-0 min-h-screen flex items-center bg-cream pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-safe">
        <div className={`rounded-[32px] border border-white/70 bg-white/60 backdrop-blur-md shadow-2xl px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-center mb-8">
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center text-xs font-sans font-semibold text-primary-green uppercase tracking-[0.3em] bg-white/70 border border-primary-green/30 hover:border-primary-green/60 hover:text-primary-green/90 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
            >
              {t.contact.title}
            </button>
            <div className="mx-auto mt-4 h-px w-24 bg-primary-green/30"></div>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-primary-green mt-4">{t.contact.heading}</h2>
            <p className="text-sm sm:text-base text-charcoal/70 mt-3 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="order-2 lg:order-1 space-y-6">
              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed">
                {t.contact.description}
              </p>
              <div className="space-y-4">
                {[
                  { 
                    title: t.contact.quickActions.whatsapp, 
                    detail: t.contact.quickActions.whatsappDetail, 
                    action: () => openWhatsApp("Hello Surabhii Fresh Milk! I'd like to get in touch."),
                    icon: (
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.944 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    )
                  },
                  { 
                    title: t.contact.quickActions.call, 
                    detail: '+91 70267 69669',
                    action: () => window.location.href = 'tel:+917026769669',
                    icon: (
                      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={item.action}
                    className={`w-full flex items-start gap-3 rounded-2xl bg-white/70 border border-white/70 shadow-soft px-4 py-4 transition-all duration-500 ease-out hover:bg-white/90 hover:shadow-md active:scale-[0.98] touch-manipulation text-left ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${200 + index * 80}ms` }}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-charcoal">{item.title}</p>
                      <p className="text-sm text-charcoal/60">{item.detail}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-white/70 p-6 sm:p-8 pb-8 md:pb-8">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {[
                    {
                      label: `${t.contact.form.name} *`,
                      field: (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:border-primary-green touch-manipulation transition-all duration-200 bg-white"
                        />
                      )
                    },
                    {
                      label: `${t.contact.form.phone} *`,
                      field: (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder={t.contact.form.phonePlaceholder}
                          inputMode="numeric"
                          className="w-full px-5 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:border-primary-green touch-manipulation transition-all duration-200 bg-white"
                        />
                      )
                    },
                    {
                      label: `${t.contact.form.queryType} *`,
                      field: (
                        <select
                          name="queryType"
                          value={formData.queryType}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:border-primary-green touch-manipulation transition-all duration-200 bg-white"
                        >
                          {queryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      )
                    },
                    {
                      label: `${t.contact.form.message} *`,
                      field: (
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          placeholder={t.contact.form.messagePlaceholder}
                          className="w-full px-5 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:border-primary-green resize-none touch-manipulation transition-all duration-200 bg-white"
                        ></textarea>
                      )
                    }
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`transition-all duration-500 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${120 + index * 70}ms` }}
                    >
                      <label className="block text-sm sm:text-base font-semibold text-charcoal mb-3">
                        {item.label}
                      </label>
                      {item.field}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex bg-primary-green hover:bg-secondary-green active:bg-secondary-green disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 items-center justify-center gap-3 touch-manipulation min-h-[56px] shadow-lg hover:shadow-xl active:shadow-md transform active:scale-[0.98] mt-2 mb-4 md:mb-0"
                  >
                    {isSubmitting ? 'Opening WhatsApp...' : t.contact.form.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
