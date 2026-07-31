export const categories = [
  {
    slug: 'furnace-heating',
    name: 'Furnace & Heating Parts',
    blurb: 'Igniters, gas valves, blower motors, control boards',
    icon: 'furnace',
  },
  {
    slug: 'ac-refrigeration',
    name: 'AC & Refrigeration',
    blurb: 'Compressors, capacitors, coils, refrigerant line sets',
    icon: 'ac',
  },
  {
    slug: 'ductwork-fittings',
    name: 'Ductwork & Fittings',
    blurb: 'Sheet metal duct, flex duct, dampers, registers',
    icon: 'duct',
  },
  {
    slug: 'thermostats-controls',
    name: 'Thermostats & Controls',
    blurb: 'Smart, programmable, and zoning control systems',
    icon: 'thermostat',
  },
  {
    slug: 'water-heaters',
    name: 'Water Heaters',
    blurb: 'Tank, tankless, elements, thermocouples, valves',
    icon: 'water',
  },
  {
    slug: 'tools-safety',
    name: 'Tools & Safety',
    blurb: 'Gauges, recovery machines, PPE, refrigerant scales',
    icon: 'tools',
  },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
