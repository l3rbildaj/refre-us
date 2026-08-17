"use client";

export default function ProductFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
      {/* Main Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
          The easiest way to enjoy your favorite coffee
        </h2>
        <p className="text-lg text-gray-600 font-medium tracking-tight">
          20 hot and iced coffee specialties at the touch of a button
        </p>
      </div>

      {/* Feature 1: High quality coffee variety */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
        <div className="rounded-2xl overflow-hidden shadow-none border border-gray-100">
          <img
            src="/feature-1.webp"
            alt="Coffee variety"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 pr-4">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            High-quality coffee variety
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Our 20 recipes range from warming coffee specialties like espresso, creamy lattes, and cappuccinos to refreshing iced coffees. We've calibrated our brewing system so that iced coffees have the same delicious taste as hot coffees.
          </p>
        </div>
      </div>

      {/* Feature 2: Innovative LatteGo Milk System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
        <div className="flex flex-col gap-6 lg:order-1 order-2 pl-4">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Innovative LatteGo Milk System
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Our powerful cyclonic frothing technology allows you to create silky smooth milk froth at the touch of a button, even with plant-based milk alternatives. Our milk system is the fastest to clean with just two parts and no tubes – it can be cleaned in under 10 seconds. Either in the dishwasher or under the tap.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-none border border-gray-100 lg:order-2 order-1">
          <img
            src="https://www.home-appliances.philips/medias/LatteGo-2-en.jpg?context=bWFzdGVyfGltYWdlc3w4NzQ1Nzc3fGltYWdlL2pwZWd8YURkbEwyaGxOQzh4TURFM09UazVOakU0T0Rjd01pOU1ZWFIwWlVkdlh6SmZaVzR1YW5Cbnw2YzBhMmM3ZjQxOGEwYjNiYWQ4NWUzN2FlZDM5ZWIwNWFlNjNhYTI1NzNhMGQ2OTE2NDVmNDExOTg1OWMyMTI5"
            alt="LatteGo Milk System"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Feature 3: SilentBrew Technology */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="rounded-2xl overflow-hidden shadow-none border border-gray-100">
          <img
            src="https://www.home-appliances.philips/medias/LatteGo-3-en.webp?context=bWFzdGVyfGltYWdlc3wxODA2OHxpbWFnZS93ZWJwfGFEWmxMMmhrWVM4eE1ERTRNREV4TmpNNE1UY3lOaTlNWVhSMFpVZHZYek5mWlc0dWQyVmljQXxkNDU4ZTJlY2Q4NzgwNDE3YjQ3N2IyNTE2ZDI0NWIxZDJhZWFmMWFlYzc3NzRmZWY2MjIzY2NjYjkxMDYxNGVl"
            alt="SilentBrew Technology"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 pr-4">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Unbeatable taste with SilentBrew Technology
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed font-normal">
            Our SilentBrew technology uses soundproofing and quiet grinding to create a pleasant coffee experience. Certified by Quiet Mark.
          </p>
        </div>
      </div>
    </section>
  );
}
