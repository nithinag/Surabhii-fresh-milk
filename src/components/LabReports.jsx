import labReportsData from '../data/labReports.json';

const LabReports = () => {
  const latestReport = labReportsData.monthlyReports[0];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-green mb-4">
            Lab Reports & Quality Assurance
          </h2>
          <p className="text-xl text-charcoal/70">
            Regular testing ensures the highest quality and safety standards
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-display font-semibold text-primary-green mb-6">
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {labReportsData.certifications.map((cert) => (
              <div key={cert.id} className="bg-cream rounded-xl p-6 border border-primary-green/20">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="font-semibold text-charcoal mb-2">{cert.name}</h4>
                <p className="text-sm text-charcoal/70 mb-2">Issued by: {cert.issuer}</p>
                <p className="text-sm text-charcoal/70 mb-2">Valid until: {new Date(cert.validUntil).toLocaleDateString('en-IN')}</p>
                <p className="text-sm text-charcoal/80">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-display font-semibold text-primary-green mb-6">
            Latest Quality Report
          </h3>
          <div className="bg-cream rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xl font-semibold text-charcoal mb-2">
                  {new Date(latestReport.testDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long'
                  })} Report
                </h4>
                <p className="text-charcoal/70">Tested by: {latestReport.labName}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-semibold ${
                latestReport.overallStatus === 'pass' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {latestReport.overallStatus.toUpperCase()}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(latestReport.parameters).map(([key, param]) => (
                <div key={key} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-charcoal capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      param.status === 'pass' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {param.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-charcoal/70">
                    Value: {param.value} {param.unit}
                  </div>
                  <div className="text-xs text-charcoal/60">
                    Standard: {param.standard}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-display font-semibold text-primary-green mb-6">
            Glass Bottle Safety
          </h3>
          <div className="bg-cream rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-charcoal mb-4">Material & Specifications</h4>
                <ul className="space-y-2 text-charcoal/80">
                  <li>Material: {labReportsData.glassBottleSafety.material}</li>
                  <li>Thickness: {labReportsData.glassBottleSafety.thickness}</li>
                </ul>
                
                <h4 className="font-semibold text-charcoal mb-4 mt-6">Safety Features</h4>
                <ul className="space-y-2">
                  {labReportsData.glassBottleSafety.safetyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-charcoal/80">
                      <svg className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-charcoal mb-4">Cleaning Process</h4>
                <ol className="space-y-2">
                  {labReportsData.glassBottleSafety.cleaningProcess.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-charcoal/80">
                      <span className="bg-primary-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <h4 className="font-semibold text-charcoal mb-4 mt-6">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {labReportsData.glassBottleSafety.certifications.map((cert, index) => (
                    <span key={index} className="bg-primary-green/10 text-primary-green px-3 py-1 rounded-full text-sm font-semibold">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabReports;
