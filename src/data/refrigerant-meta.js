/**
 * Technical metadata per refrigerant, keyed by the slug used in products.json.
 *
 * Kept separate from products.json so pricing/catalog data (scraped, frequently
 * regenerated) stays independent of the spec data below.
 *
 * `safety` is the ASHRAE Standard 34 classification. A2L grades are mildly
 * flammable and carry different handling/equipment requirements than A1.
 *
 * `gwp` values are 100-year GWP on the IPCC AR4 basis, which is what US EPA and
 * AIM Act material generally cites. AR5/AR6 figures differ — if you publish a
 * spec sheet, confirm the basis against your supplier's documentation.
 *
 * Descriptions here are original copy written from published physical property
 * and regulatory data, not taken from any other retailer.
 */
export const refrigerantMeta = {
  "r-1234yf-refrigerant-10-lb": {
    category: "Automotive",
    application: "Modern vehicle A/C systems",
    type: "HFO",
    safety: "A2L",
    composition: "Single-component (HFO-1234yf)",
    gwp: "<1",
    oil: "PAG",
    replaces: "R-134a in mobile A/C",
    description:
      "The HFO that displaced R-134a in vehicle air conditioning. Operating pressures sit close enough to R-134a that system architecture carries over largely unchanged, but its GWP is under 1 — a drop of three orders of magnitude — which is why new passenger vehicles sold in the US now ship with it. Classified A2L, so recovery and service equipment must be rated for mildly flammable refrigerants.",
    highlights: [
      "Factory fill for current passenger vehicles",
      "GWP under 1 — lowest of any grade we stock",
      "A2L: requires A2L-rated service equipment",
      "Single-component, so no glide and no fractionation",
    ],
  },
  "r-134a-refrigerant-30-lb": {
    category: "Automotive",
    application: "Vehicle A/C and medium-temp refrigeration",
    type: "HFC",
    safety: "A1",
    composition: "Single-component (HFC-134a)",
    gwp: 1430,
    oil: "PAG (mobile) / POE",
    replaces: "R-12",
    description:
      "The long-running workhorse for vehicle air conditioning and medium-temperature refrigeration. Single-component, so it has zero temperature glide and can be topped off after a partial leak without shifting composition — a practical advantage over blends that kept it the default for two decades after it replaced R-12. Still the grade most older fleets and standalone commercial coolers are charged with.",
    highlights: [
      "Single-component: zero glide, safe to top off",
      "Non-flammable A1 classification",
      "Serviceable across older vehicle fleets",
      "Also used in medium-temp commercial refrigeration",
    ],
  },
  "r-22-refrigerant-30-lb": {
    category: "Legacy / Retrofit",
    application: "Legacy residential and commercial A/C",
    type: "HCFC",
    safety: "A1",
    composition: "Single-component (HCFC-22)",
    gwp: 1810,
    oil: "Mineral oil / alkylbenzene",
    replaces: "—",
    description:
      "The HCFC that ran residential and light commercial air conditioning for decades. US production and import ended on January 1, 2020 under the Clean Air Act, so all supply in circulation is reclaimed or pre-2020 stock — servicing existing equipment with it remains entirely legal. It runs on mineral oil, which is precisely why so many retrofit blends were engineered to drop into R-22 systems without an oil change.",
    highlights: [
      "Servicing existing equipment remains legal",
      "No new US production or import since 2020",
      "Runs on mineral oil — no POE conversion needed",
      "Single-component: zero glide",
    ],
  },
  "r-32-refrigerant-20-lb": {
    category: "Residential A/C",
    application: "Mini-splits and modern residential A/C",
    type: "HFC",
    safety: "A2L",
    composition: "Single-component (HFC-32)",
    gwp: 675,
    oil: "POE",
    replaces: "R-410A in new equipment",
    description:
      "A single-component refrigerant with roughly 10% higher volumetric capacity than R-410A at about a third of its GWP. Because it isn't a blend, it has zero temperature glide and can be charged or topped off without composition shift — a real advantage in service work. Dominant in ductless mini-splits worldwide and increasingly specified in new residential equipment. A2L rated, so equipment and tooling must be listed for it.",
    highlights: [
      "~10% higher capacity than R-410A",
      "GWP 675 — roughly one third of R-410A",
      "Single-component: zero glide, safe to top off",
      "A2L: requires A2L-listed equipment",
    ],
  },
  "r-404a-refrigerant-24-lb": {
    category: "Commercial Refrigeration",
    application: "Low- and medium-temp commercial refrigeration",
    type: "HFC",
    safety: "A1",
    composition: "R-125 / R-143a / R-134a (44/52/4)",
    gwp: 3922,
    oil: "POE",
    replaces: "R-502, R-22 in refrigeration",
    description:
      "The HFC blend that carried commercial refrigeration through the R-502 phase-out, and still the charge in a great many walk-ins, display cases and low-temperature racks. Its GWP of 3,922 is among the highest of anything still in general service, which makes it a primary target of the AIM Act phase-down — R-448A and R-449A are the usual paths when equipment comes due for conversion.",
    highlights: [
      "Established low- and medium-temp refrigeration grade",
      "Near-azeotropic: minimal glide in practice",
      "GWP 3,922 — a phase-down priority",
      "Requires POE lubricant",
    ],
  },
  "r-407a-refrigerant-25-lb": {
    category: "Commercial Refrigeration",
    application: "R-22 retrofit for commercial refrigeration",
    type: "HFC",
    safety: "A1",
    composition: "R-32 / R-125 / R-134a (20/40/40)",
    gwp: 2107,
    oil: "POE",
    replaces: "R-404A, R-22 in refrigeration",
    description:
      "A lower-GWP step down from R-404A for medium- and low-temperature commercial refrigeration, at roughly half the GWP. Capacity tracks R-404A closely enough for most conversions, and it runs on the same POE lubricant. It carries appreciable temperature glide, so it must be charged as a liquid and shouldn't be topped off after a significant leak.",
    highlights: [
      "About half the GWP of R-404A",
      "Suits medium- and low-temp refrigeration",
      "Charge as a liquid — appreciable glide",
      "POE lubricant, as with R-404A",
    ],
  },
  "r-407c-refrigerant-25-lb": {
    category: "Legacy / Retrofit",
    application: "R-22 retrofit for residential and commercial A/C",
    type: "HFC",
    safety: "A1",
    composition: "R-32 / R-125 / R-134a (23/25/52)",
    gwp: 1774,
    oil: "POE",
    replaces: "R-22 in air conditioning",
    description:
      "The established R-22 retrofit for air conditioning, matching R-22 capacity closely across typical A/C operating conditions. Its temperature glide of around 7 K is the thing to plan for: it has to be charged as a liquid, and topping off after a partial leak risks shifting the blend composition. Conversion also requires changing the system over to POE oil.",
    highlights: [
      "Close capacity match to R-22 in A/C service",
      "Glide near 7 K — charge as a liquid",
      "Requires conversion to POE oil",
      "Non-flammable A1 classification",
    ],
  },
  "r-410a-refrigerant-25-lb": {
    category: "Residential A/C",
    application: "Residential A/C and heat pumps",
    type: "HFC",
    safety: "A1",
    composition: "R-32 / R-125 (50/50)",
    gwp: 2088,
    oil: "POE",
    replaces: "R-22 in new equipment",
    description:
      "The near-azeotropic blend that replaced R-22 across residential air conditioning and heat pumps. Glide is negligible, so it charges predictably and tolerates topping off — unlike the higher-glide R-22 retrofit blends. It operates at appreciably higher pressures than R-22, which is why it was never a retrofit, only a charge for equipment designed around it. It is now itself being phased down in new equipment in favour of R-454B and R-32.",
    highlights: [
      "Near-azeotropic: negligible glide, safe to top off",
      "Highest-volume residential A/C grade in service",
      "Higher operating pressures than R-22 — not a retrofit",
      "Requires POE lubricant",
    ],
  },
  "r-421a-refrigerant-25-lb": {
    category: "Legacy / Retrofit",
    application: "Direct R-22 retrofit for A/C systems",
    type: "HFC",
    safety: "A1",
    composition: "R-125 / R-134a (58/42)",
    gwp: 2631,
    oil: "Mineral oil, AB or POE",
    replaces: "R-22",
    description:
      "A two-component R-22 retrofit built around service simplicity: it is compatible with the mineral oil already in the system, so no flush or oil change is required. That makes it a fast, low-labour option for ageing R-22 air conditioning where a full POE conversion isn't economic to justify.",
    highlights: [
      "No oil change — works with existing mineral oil",
      "Two components only, simpler than 5-part blends",
      "Suits R-22 A/C and heat pump service",
      "Non-flammable A1 classification",
    ],
  },
  "r-422b-nu-22-refrigerant-25-lb": {
    category: "Legacy / Retrofit",
    application: "R-22 retrofit, no oil change required",
    type: "HFC",
    safety: "A1",
    composition: "R-125 / R-134a / R-600a (55/42/3)",
    gwp: 2526,
    oil: "Mineral oil, AB or POE",
    replaces: "R-22",
    description:
      "An R-22 retrofit formulated to run on the existing mineral oil charge, avoiding the flush and lubricant change a POE conversion demands. A small isobutane fraction carries oil back through the system, which is what makes that possible. Capacity sits close to R-22 across air-conditioning conditions.",
    highlights: [
      "No oil change required",
      "Hydrocarbon fraction aids oil return",
      "Capacity close to R-22 in A/C service",
      "Non-flammable A1 classification",
    ],
  },
  "r-422d-mo29-refrigerant-25-lb-1": {
    category: "Legacy / Retrofit",
    application: "R-22 retrofit for direct expansion systems",
    type: "HFC",
    safety: "A1",
    composition: "R-125 / R-134a / R-600a (65.1/31.5/3.4)",
    gwp: 2729,
    oil: "Mineral oil, AB or POE",
    replaces: "R-22",
    description:
      "A mineral-oil-compatible R-22 replacement aimed at direct-expansion air conditioning and medium-temperature refrigeration. Like the other 422-series blends it carries a small hydrocarbon fraction for oil return, letting technicians convert a system without opening it up for an oil change.",
    highlights: [
      "No oil change required",
      "Suited to direct-expansion systems",
      "Covers A/C and medium-temp refrigeration",
      "Non-flammable A1 classification",
    ],
  },
  "r-438a-mo99-refrigerant-25-lb": {
    category: "Legacy / Retrofit",
    application: "Closest-match R-22 retrofit blend",
    type: "HFC",
    safety: "A1",
    composition: "R-32 / R-125 / R-134a / R-600 / R-601a",
    gwp: 2264,
    oil: "Mineral oil, AB or POE",
    replaces: "R-22",
    description:
      "Widely regarded as the closest performance match to R-22 among the retrofit blends, which is how it became the default choice for conversions where both capacity and discharge temperature matter. A five-component formulation, with hydrocarbon fractions included to carry oil around the circuit so the existing mineral oil can stay in place.",
    highlights: [
      "Closest overall performance match to R-22",
      "No oil change required",
      "Lowest GWP of the R-22 retrofit blends we stock",
      "Non-flammable A1 classification",
    ],
  },
  "r448a-refrigerant-25lb": {
    category: "Commercial Refrigeration",
    application: "Lower-GWP R-404A replacement",
    type: "HFO blend",
    safety: "A1",
    composition: "R-32 / R-125 / R-134a / R-1234yf / R-1234ze",
    gwp: 1387,
    oil: "POE",
    replaces: "R-404A, R-22 in refrigeration",
    description:
      "An HFO-containing blend developed as a lower-GWP replacement for R-404A and R-22 in commercial refrigeration, cutting GWP by roughly two-thirds against R-404A. Designed for medium- and low-temperature supermarket racks and display cases. It carries appreciable glide, so charge as a liquid and expect to plan for composition shift on a partial leak.",
    highlights: [
      "~65% lower GWP than R-404A",
      "Contains HFO components (R-1234yf, R-1234ze)",
      "Non-flammable A1 despite HFO content",
      "Charge as a liquid — appreciable glide",
    ],
  },
  "r-449a-refrigerant-25-lb": {
    category: "Commercial Refrigeration",
    application: "Lower-GWP R-404A / R-22 replacement",
    type: "HFO blend",
    safety: "A1",
    composition: "R-32 / R-125 / R-1234yf / R-134a (24.3/24.7/25.3/25.7)",
    gwp: 1397,
    oil: "POE",
    replaces: "R-404A, R-22 in refrigeration",
    description:
      "An HFO blend positioned as a near drop-in for R-404A and R-22 in commercial refrigeration, bringing GWP down to around 1,400. Four components in near-equal proportions, with no hydrocarbons in the formulation, and energy performance at or near R-404A in low-temperature duty.",
    highlights: [
      "Around 65% lower GWP than R-404A",
      "No hydrocarbon components",
      "Near drop-in for R-404A systems on POE",
      "Non-flammable A1 classification",
    ],
  },
  "r-454b-refrigerant-20-lb": {
    category: "Residential A/C",
    application: "Next-gen R-410A replacement for A/C and heat pumps",
    type: "HFO blend",
    safety: "A2L",
    composition: "R-32 / R-1234yf (68.9/31.1)",
    gwp: 466,
    oil: "POE",
    replaces: "R-410A in new equipment",
    description:
      "The refrigerant most US manufacturers selected for new residential air conditioning and heat pumps under the AIM Act phase-down. GWP of 466 is under a quarter of R-410A, while capacity and efficiency stay close enough that equipment platforms carried over without redesign. Being A2L, it requires listed equipment, leak detection and rated service tooling — and it is explicitly not a retrofit for existing R-410A systems.",
    highlights: [
      "GWP 466 — under a quarter of R-410A",
      "Chosen by most US OEMs for new equipment",
      "A2L: requires A2L-listed equipment and tooling",
      "Not a retrofit for existing R-410A systems",
    ],
  },
  "r-507-refrigerant-25-lb": {
    category: "Commercial Refrigeration",
    application: "Low-temp commercial refrigeration and freezers",
    type: "HFC",
    safety: "A1",
    composition: "R-125 / R-143a (50/50) azeotrope",
    gwp: 3985,
    oil: "POE",
    replaces: "R-502",
    description:
      "An azeotropic blend for low-temperature commercial refrigeration — freezers, blast chillers and ice machines. Because it is a true azeotrope it has effectively zero temperature glide, so it charges and tops off like a single-component refrigerant, which is a genuine service advantage over R-404A. Its GWP of 3,985 makes it a phase-down target.",
    highlights: [
      "True azeotrope: effectively zero glide",
      "Tops off like a single-component refrigerant",
      "Built for low-temp freezing duty",
      "GWP 3,985 — a phase-down priority",
    ],
  },
};

export const categories = [
  "All",
  "Residential A/C",
  "Commercial Refrigeration",
  "Automotive",
  "Legacy / Retrofit",
];

export default refrigerantMeta;
