"use client";

const ADD_ONS = [
  {
    image: "/lavazza.jpg",
    title: "Lavazza Super Crema Ganze Bohnen Kaffee",
    description:
      "Lavazza Super Crema Ganze Kaffeebohnen, mittlere Espresso-Röstung, Arabica- und Robusta-Mischung",
    price: "£9.50",
  },
  {
    image: "https://placehold.co/100x100/f0f0f0/999999?text=Filter",
    title: "AquaClean Original Kalk- und Wasserfilter",
    description:
      "AquaClean Original Kalk- und Wasserfilter, kein Entkalken bis zu 5.000 Tassen, reduziert die Kalkbildung, 2 AquaClean Filter, (CA6903/22)",
    price: "£18.99",
  },
  {
    image: "https://placehold.co/100x100/f0f0f0/999999?text=Warranty",
    title: "Offizielle 1 Jahr Garantie",
    description:
      "1 Jahr kostenlose Garantie enthalten – damit du von der ersten Tasse an geschützt bist.",
    price: "GRATIS",
    isIncluded: true,
  },
];

export default function ProductAddOns() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {ADD_ONS.map((item, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl p-3 flex gap-4 items-center group transition-all hover:border-gray-300"
        >
          {/* Image */}
          <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-1">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-bold text-gray-900 leading-snug mb-0.5 truncate sm:whitespace-normal sm:line-clamp-2">
              {item.title}
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`text-[13px] font-bold ${item.price === 'GRATIS' ? 'text-[#2b9d5c]' : 'text-[#e56134]'}`}>
              {item.price}
            </span>
            {item.isIncluded ? (
              <div className="bg-gray-100 text-gray-500 text-[10px] font-black tracking-wider py-1.5 px-4 rounded transition-colors uppercase cursor-default">
                Inbegriffen
              </div>
            ) : (
              <button className="bg-[#333333] hover:bg-black text-white text-[10px] font-black tracking-wider py-1.5 px-4 rounded transition-colors uppercase">
                Hinzufügen
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
