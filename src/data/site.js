/**
 * Central brand configuration.
 * Every user-facing mention of the store name/contact details reads from here,
 * so rebranding is a one-file change.
 */
export const site = {
  name: "TrueCharge Supply",
  nameShort: "TrueCharge",
  // Wordmark is split so the logo can render two weights until the real logo lands.
  wordmark: { lead: "TrueCharge", trail: "Supply" },
  domain: "truechargesupply.shop",
  url: "https://truechargesupply.shop",
  tagline: "Certified refrigerants, factory-direct.",
  description:
    "Factory-direct refrigerant cylinders for licensed HVAC/R professionals. DOT-certified cylinders, free US shipping, volume pricing up to 20% off.",
  email: "support@truechargesupply.shop",
  phone: "480-592-0969",
  address: "1506 Hillside Street, Chandler, AZ",

  // Legal fields referenced by the policy pages.
  legalName: "TrueCharge Supply LLC",
  governingState: "Arizona",
  returnsAddress: "1506 Hillside Street, Chandler, AZ",
};

export default site;
