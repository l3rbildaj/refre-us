"use client";

export default function ProductVideo() {
  return (
    <section className="max-w-7xl mx-auto lg:px-0 px-2 mb-10">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <video
          className="w-full h-auto aspect-video object-cover"
          src="https://www.home-appliances.philips/medias/CO-LG-main-product-video-Lattego-EN-desk.mp4?context=bWFzdGVyfGltYWdlc3wxODE2NDk3N3x2aWRlby9tcDR8YUdJeUwyaG1ZeTg1T0RRd05qZ3lNVGN5TkRRMkwwTlBYMHhIWDIxaGFXNGdjSEp2WkhWamRDQjJhV1JsYjE5TVlYUjBaV2R2WDBWT1gyUmxjMnN1YlhBMHwyNzA0NDQ3Y2Y1NTAwYmYzYzkxYTUzY2IxODFmMzE3ZjUwMzk5YmY5OWJlMDkwMTBjYTE5ZmU3YTM5NmZkZjIx"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
