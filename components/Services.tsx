const services = [{"id":"01","name":"Dental Care","href":"/dental-clinic/","tag":"Clinical Dentistry","meta":"Diagnostics · Restorative · Surgical","image":"/assets/ercanco-style/service-01.jpg"},{"id":"02","name":"Botox \u0026 Fillers","href":"/services/aesthetic-clinic-ras-al-khaimah/","tag":"Aesthetic Medicine","meta":"Injectables · Facial Balance","image":"/assets/ercanco-style/service-02.jpg"},{"id":"03","name":"Dermatology \u0026 Skin Disease","href":"/dermatologist-ras-al-khaimah/","tag":"Dermatology","meta":"Skin Assessment · Treatment","image":"/assets/ercanco-style/service-03.jpg"},{"id":"04","name":"Facial Treatments","href":"/services/facial-treatments-ras-al-khaimah/","tag":"Facial Care","meta":"Skin Quality · Clinical Facial","image":"/assets/ercanco-style/service-04.jpg"},{"id":"05","name":"Laser Hair Removal","href":"/hair-removal/","tag":"Laser","meta":"Hair Reduction · Treatment","image":"/assets/ercanco-style/service-05.jpg"},{"id":"06","name":"Clinical Laboratory","href":"/services/laboratory/","tag":"Laboratory","meta":"Clinical Testing · Diagnostics","image":"/assets/ercanco-style/service-06.jpg"}];

export default function Services() {
  return (
    <section
      id="services"
      className="border-b border-slate-300/80 bg-[#F9F9FB]"
    >
      <div className="mx-auto max-w-[1520px] px-4 md:px-6 xl:px-8">
        <div className="grid grid-cols-12 border-x border-slate-200/80">
          <header className="col-span-12 grid grid-cols-12 border-b border-slate-300/80">
            <div className="col-span-12 border-b border-slate-200/80 px-5 py-6 md:col-span-3 md:border-b-0 md:border-r md:px-7">
              <p className="sc-mono text-[10px] uppercase tracking-[0.18em] text-[#0072B5]">
                [DIV.01]
              </p>
              <p className="sc-mono mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                Integrated Departments
              </p>
            </div>

            <div className="col-span-12 px-5 py-6 md:col-span-9 md:px-7">
              <h2 className="sc-serif max-w-[680px] text-[28px] leading-[1.08] tracking-[-0.03em] text-[#111827] md:text-[34px]">
                Six clinical departments,
                <span className="block text-[#0B3B60]">
                  structured as one care system.
                </span>
              </h2>

              <p className="mt-4 max-w-[620px] text-[13px] leading-5 text-slate-600">
                Dental care, aesthetic medicine, dermatology, facial treatments,
                laser hair removal and laboratory support operate within one
                medical center in Ras Al Khaimah.
              </p>
            </div>
          </header>

          <div className="col-span-12">
            {services.map((service) => (
              <a
                key={service.id}
                href={service.href}
                className="group sc-rule grid grid-cols-12 border-b border-slate-200/80 bg-white transition-colors duration-500 ease-out last:border-b-0 hover:bg-[#E8F4F8]/55"
              >
                <div className="col-span-2 flex items-start border-r border-slate-200/80 px-4 py-5 md:col-span-1 md:px-5">
                  <span className="sc-mono text-[10px] uppercase tracking-[0.16em] text-[#0072B5]">
                    ({service.id})
                  </span>
                </div>

                <div className="col-span-10 border-b border-slate-200/80 px-5 py-5 md:col-span-4 md:border-b-0 md:border-r md:px-7">
                  <p className="sc-mono text-[9px] uppercase tracking-[0.18em] text-[#00A896]">
                    {service.tag}
                  </p>
                  <h3 className="mt-3 text-[17px] font-normal tracking-[-0.02em] text-[#111827]">
                    — {service.name}
                  </h3>
                  <p className="sc-mono mt-5 text-[9px] uppercase tracking-[0.13em] text-slate-400">
                    {service.meta}
                  </p>
                </div>

                <div className="col-span-12 border-b border-slate-200/80 p-4 md:col-span-5 md:border-b-0 md:border-r md:p-5">
                  <div className="sc-media aspect-[16/9] w-full border border-slate-300/80">
                    <img loading="lazy" decoding="async"
                      src={service.image}
                      alt={service.name}
                      className="sc-service-image h-full w-full object-contain object-center"
                    />
                  </div>
                </div>

                <div className="col-span-12 flex items-center justify-between px-5 py-4 md:col-span-2 md:flex-col md:items-start md:justify-between md:px-5 md:py-5">
                  <span className="sc-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                    CAPABILITY
                  </span>

                  <span className="sc-mono text-[10px] uppercase tracking-[0.14em] text-[#0B3B60]">
                    Explore →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}