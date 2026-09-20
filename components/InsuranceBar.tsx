const partners = [{"id":"01","name":"NextCare","logo":""},{"id":"02","name":"MedNet","logo":""},{"id":"03","name":"Daman","logo":""},{"id":"04","name":"Oman / Sukoon","logo":""},{"id":"05","name":"ADNIC","logo":""},{"id":"06","name":"FMC","logo":""},{"id":"07","name":"Saico","logo":""},{"id":"08","name":"Afiya","logo":""}];

export default function InsuranceBar() {
  return (
    <section className="border-y border-slate-300/80 bg-white">
      <div className="mx-auto max-w-[1520px] px-4 md:px-6 xl:px-8">
        <div className="grid grid-cols-12 border-x border-slate-200/80">
          <div className="col-span-12 border-b border-slate-200/80 px-5 py-5 md:col-span-3 md:border-b-0 md:border-r md:px-7">
            <p className="sc-mono text-[10px] uppercase tracking-[0.18em] text-[#0072B5]">
              [REG.04]
            </p>
            <h2 className="mt-3 text-[16px] font-normal tracking-[-0.02em]">
              Accepted Insurance
            </h2>
          </div>

          <div className="col-span-12 grid grid-cols-2 md:col-span-9 md:grid-cols-4">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`min-h-[118px] border-slate-200/80 px-4 py-4 md:px-5 ${
                  index % 4 !== 3 ? "md:border-r" : ""
                } ${index < 4 ? "border-b" : ""} ${
                  index % 2 === 0 ? "border-r md:border-r" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="sc-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                    {partner.id}
                  </span>

                  <span className="size-1.5 bg-[#00A896]" />
                </div>

                <div className="mt-5 flex h-10 items-center">
                  {partner.logo ? (
                    <img loading="lazy" decoding="async"
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-8 max-w-[100px] object-contain grayscale"
                    />
                  ) : (
                    <span className="text-[13px] font-normal text-[#1F2937]">
                      {partner.name}
                    </span>
                  )}
                </div>

                <p className="sc-mono mt-3 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}