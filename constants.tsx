
import { Property, Testimonial, Agent } from './types';

export interface NeighborhoodInfo {
  amenities: { icon: string; label: string }[];
  demographics: string[];
  lifestyleHighlights: string[];
}

export const NEIGHBORHOOD_DATA: Record<string, NeighborhoodInfo> = {
  '1': { // Upper East Side, NY
    amenities: [
      { icon: '🍽️', label: 'Michelin-starred restaurants' },
      { icon: '🏛️', label: 'Metropolitan Museum of Art' },
      { icon: '🌳', label: 'Central Park (2 min walk)' },
      { icon: '🏫', label: 'Dalton & Spence private schools' },
    ],
    demographics: ['Median HH income $168K', 'Walk Score 97', '23% YoY appreciation'],
    lifestyleHighlights: ['Museum Mile cultural corridor', 'Madison Avenue boutique shopping', 'Rooftop social scene'],
  },
  '2': { // Malibu, CA
    amenities: [
      { icon: '🏖️', label: 'Carbon Beach (private access)' },
      { icon: '🍷', label: 'Nobu Malibu & Soho House' },
      { icon: '🏄', label: 'Surfrider Beach' },
      { icon: '🌿', label: 'Malibu Creek State Park' },
    ],
    demographics: ['Median home value $3.8M', 'Crime rate 72% below avg', '15% rental yield area'],
    lifestyleHighlights: ['Celebrity enclave with gated estates', 'PCH coastal driving culture', 'Year-round outdoor lifestyle'],
  },
  '3': { // Austin, TX
    amenities: [
      { icon: '🎵', label: 'ACL Fest & SXSW venues' },
      { icon: '🍺', label: 'Craft brewery district' },
      { icon: '🚴', label: 'Barton Creek Greenbelt' },
      { icon: '💻', label: 'Tech corridor (Tesla, Apple HQ)' },
    ],
    demographics: ['Fastest-growing US metro', 'No state income tax', '28% tech workforce'],
    lifestyleHighlights: ['Live music capital of the world', 'Farm-to-table food scene', 'Lake Travis boating & recreation'],
  },
  '4': { // Tribeca, NY
    amenities: [
      { icon: '🎬', label: 'Tribeca Film Festival' },
      { icon: '🍕', label: 'Locanda Verde & Nobu' },
      { icon: '🏋️', label: 'Equinox & SoulCycle' },
      { icon: '🌊', label: 'Hudson River Park' },
    ],
    demographics: ['Median HH income $205K', 'Walk Score 98', 'Safest NYC neighborhood'],
    lifestyleHighlights: ['Industrial-chic converted lofts', 'A-list celebrity residents', 'Cobblestone streets & galleries'],
  },
  '5': { // Palm Springs, CA
    amenities: [
      { icon: '⛳', label: 'PGA West golf courses' },
      { icon: '💆', label: 'Two Bunch Palms spa' },
      { icon: '🏜️', label: 'Joshua Tree (45 min)' },
      { icon: '🎭', label: 'Palm Springs Art Museum' },
    ],
    demographics: ['320 sunny days/year', 'Luxury retreat market +18%', 'Avg property size 3,200 sqft'],
    lifestyleHighlights: ['Mid-century modern architecture paradise', 'Coachella Valley festival scene', 'Desert hot springs wellness culture'],
  },
  '6': { // Lake Tahoe, NV
    amenities: [
      { icon: '⛷️', label: 'Palisades Tahoe ski resort' },
      { icon: '🚤', label: 'Lake Tahoe marina & boating' },
      { icon: '🥾', label: 'Desolation Wilderness trails' },
      { icon: '🎰', label: 'Stateline casinos & dining' },
    ],
    demographics: ['No NV state income tax', 'Vacation rental yield 8-12%', '300 days of sunshine'],
    lifestyleHighlights: ['Year-round alpine recreation', 'Crystal-clear lake at 6,225 ft', 'Exclusive ski-in/ski-out communities'],
  },
  '7': { // Coral Gables, FL
    amenities: [
      { icon: '⛵', label: 'Biscayne Bay marina' },
      { icon: '🌴', label: 'Fairchild Tropical Botanic Garden' },
      { icon: '🏌️', label: 'Biltmore Golf Course' },
      { icon: '🎓', label: 'University of Miami' },
    ],
    demographics: ['No FL state income tax', 'Foreign buyer interest +22%', 'Waterfront premium 45%'],
    lifestyleHighlights: ['Mediterranean Revival architecture', 'International dining on Miracle Mile', 'Deep-water dockage for mega-yachts'],
  },
  '8': { // Aspen, CO
    amenities: [
      { icon: '⛷️', label: 'Aspen Mountain & Snowmass' },
      { icon: '🎶', label: 'Aspen Music Festival' },
      { icon: '🍷', label: 'Ajax Tavern & Matsuhisa' },
      { icon: '🥾', label: 'Maroon Bells wilderness' },
    ],
    demographics: ['Avg home price $10.5M', 'Ultra-HNW concentration top 5%', 'Seasonal rental yield 6-9%'],
    lifestyleHighlights: ['World-class skiing & snowboarding', 'Summer polo & golf season', 'Art galleries & cultural festivals'],
  },
};

export const AGENTS: Agent[] = [
  {
    id: 'victoria',
    name: 'Victoria Santorini',
    title: 'Senior Partner & Waterfront Specialist',
    image: '/agent_1.png',
    specializations: ['Waterfront Investment', 'Coastal Estates', 'International Buyers'],
    metrics: [
      { label: 'Lifetime Listings', value: '$220M+' },
      { label: 'Years in Luxury', value: '18' },
      { label: 'Closed Deals', value: '140+' },
    ],
    phone: '+1 (305) 555-0142',
    email: 'victoria@luxemap.com',
    bio: 'Victoria is renowned for her deep expertise in waterfront properties and her ability to match international clients with their ideal coastal sanctuaries.',
    goldenZones: ['Malibu', 'Miami Beach', 'Hamptons'],
  },
  {
    id: 'marcus',
    name: 'Marcus Ashford',
    title: 'Managing Director & Urban Investment Advisor',
    image: '/agent_2.png',
    specializations: ['Urban Penthouses', 'Investment Strategy', 'Off-Market Access'],
    metrics: [
      { label: 'Lifetime Listings', value: '$310M+' },
      { label: 'Years in Luxury', value: '22' },
      { label: 'Closed Deals', value: '195+' },
    ],
    phone: '+1 (212) 555-0198',
    email: 'marcus@luxemap.com',
    bio: 'Marcus leads our urban acquisitions practice with two decades of deal-making experience in the world\'s most competitive high-rise markets.',
    goldenZones: ['Manhattan', 'Chicago Gold Coast', 'San Francisco'],
  },
  {
    id: 'elena',
    name: 'Elena Vasquez',
    title: 'Partner & Modernist Architecture Expert',
    image: '/agent_3.png',
    specializations: ['Modernist Architecture', 'New Construction', 'Design-Forward Homes'],
    metrics: [
      { label: 'Lifetime Listings', value: '$175M+' },
      { label: 'Years in Luxury', value: '15' },
      { label: 'Closed Deals', value: '110+' },
    ],
    phone: '+1 (310) 555-0167',
    email: 'elena@luxemap.com',
    bio: 'Elena bridges the worlds of architecture and real estate, specializing in contemporary masterpieces from award-winning architects.',
    goldenZones: ['Palm Springs', 'Scottsdale', 'Aspen'],
  },
  {
    id: 'james',
    name: 'James Whitfield',
    title: 'Senior Advisor & Estate Portfolio Strategist',
    image: '/agent_4.png',
    specializations: ['Estate Planning', 'Legacy Properties', 'Private Off-Market'],
    metrics: [
      { label: 'Lifetime Listings', value: '$450M+' },
      { label: 'Years in Luxury', value: '28' },
      { label: 'Closed Deals', value: '260+' },
    ],
    phone: '+1 (415) 555-0134',
    email: 'james@luxemap.com',
    bio: 'James brings nearly three decades of discretion and market intelligence to ultra-high-net-worth clients seeking generational properties.',
    goldenZones: ['Greenwich', 'Napa Valley', 'Lake Tahoe'],
  },
];

export const COLORS = {
  primary: '#0071E3',
  accent: '#0071E3',
  background: '#F7F7F9',
  textPrimary: '#1D1D1F',
  link: '#0066CC',
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Penthouse',
    price: 4500000,
    location: 'Upper East Side, NY',
    coords: { x: 88, y: 32 },
    beds: 4,
    baths: 4.5,
    sqft: 3200,
    type: 'Penthouse',
    imageUrl: '/Penthouse_1.png',
    description: 'A masterpiece of modern engineering and design, this penthouse offers 360-degree views of the Manhattan skyline. Features include a private elevator, floor-to-ceiling soundproof windows, and a chef-grade kitchen with marble surfaces.',
    community: 'The Upper East Side remains Manhattan\'s most prestigious neighborhood, known for Museum Mile, world-class dining, and proximity to Central Park.',
    reviews: [
      { id: 'r1', user: 'David W.', rating: 5, comment: 'Breathtaking views and impeccable finish. Truly a one-of-a-kind residence.' },
      { id: 'r2', user: 'Lina K.', rating: 4, comment: 'The lighting system is futuristic. Best penthouse I have toured this year.' }
    ],
    agent: AGENTS[1] // Marcus (Urban)
  },
  {
    id: '2',
    title: 'Azure Villa',
    price: 8900000,
    location: 'Malibu Coast, CA',
    coords: { x: 10, y: 65 },
    beds: 6,
    baths: 7,
    sqft: 5800,
    type: 'Villa',
    imageUrl: '/Cold_hawaii.png',
    description: 'A sanctuary of peace perched on the cliffs of Malibu. This villa blends indoor and outdoor living with retractable glass walls, an infinity pool overlooking the Pacific, and a private path to the beach.',
    community: 'Malibu is the quintessential California beach community, offering privacy, luxury, and a laid-back atmosphere favored by industry titans.',
    reviews: [
      { id: 'r3', user: 'Tom B.', rating: 5, comment: 'The sunset views are worth every penny. High-tech security is a big plus.' }
    ],
    agent: AGENTS[0] // Victoria (Waterfront)
  },
  {
    id: '3',
    title: 'Minimalist Glass House',
    price: 2750000,
    location: 'Austin, TX',
    coords: { x: 50, y: 78 },
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    type: 'House',
    imageUrl: '/Villa_1.png',
    description: 'Architectural minimalism at its finest. This home features a steel-and-glass frame, sustainable solar integration, and smart climate controls designed for the Texas heat.',
    community: 'Located in the tech-centric heart of Austin, this neighborhood is famous for its vibrant music scene, high-end boutiques, and active outdoors lifestyle.',
    reviews: [
      { id: 'r4', user: 'Alex S.', rating: 5, comment: 'The natural light in the morning is stunning. Perfect for remote work.' }
    ],
    agent: AGENTS[2] // Elena (Modernist)
  },
  {
    id: '4',
    title: 'The Greenwich Loft',
    price: 1850000,
    location: 'Tribeca, NY',
    coords: { x: 86, y: 36 },
    beds: 2,
    baths: 2,
    sqft: 1600,
    type: 'Apartment',
    imageUrl: '/Villa_2.png',
    description: 'Authentic industrial charm meets contemporary luxury. Exposed brick walls, original timber beams, and a state-of-the-art kitchen make this Tribeca loft a urban haven.',
    community: 'Tribeca is synonymous with upscale industrial chic, boasting world-class galleries and some of the finest restaurants in the world.',
    reviews: [
      { id: 'r5', user: 'James T.', rating: 4, comment: 'Incredible acoustics. The neighborhood vibe is unmatched.' }
    ],
    agent: AGENTS[1] // Marcus (Urban)
  },
  {
    id: '5',
    title: 'Modernist Retreat',
    price: 3200000,
    location: 'Palm Springs, CA',
    coords: { x: 15, y: 72 },
    beds: 4,
    baths: 3,
    sqft: 3100,
    type: 'House',
    imageUrl: '/Villa_3.png',
    description: 'A mid-century modern treasure reimagined for the 21st century. This home features a courtyard pool, desert landscaping, and integrated home automation.',
    community: 'Palm Springs is the ultimate resort destination, known for its mid-century modern architecture and mountain vistas.',
    reviews: [
      { id: 'r6', user: 'Sophie M.', rating: 5, comment: 'Like living in a work of art. The pool area is spectacular.' }
    ],
    agent: AGENTS[2] // Elena (Modernist)
  },
  {
    id: '6',
    title: 'Lake Tahoe Chalet',
    price: 5600000,
    location: 'Lake Tahoe, NV',
    coords: { x: 12, y: 45 },
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: 'House',
    imageUrl: '/Forrest_house.png',
    description: 'A stunning alpine chalet nestled among towering pines with panoramic lake views. Features a grand stone fireplace, heated floors, and a wraparound deck perfect for year-round entertaining.',
    community: 'Lake Tahoe is a world-renowned destination offering pristine waters, championship skiing, and a vibrant outdoor lifestyle surrounded by the Sierra Nevada.',
    reviews: [
      { id: 'r7', user: 'Karen P.', rating: 5, comment: 'Waking up to the lake view every morning is a dream. The fireplace room is magnificent.' }
    ],
    agent: AGENTS[3] // James (Estate)
  },
  {
    id: '7',
    title: 'Coral Gables Estate',
    price: 12500000,
    location: 'Coral Gables, FL',
    coords: { x: 82, y: 92 },
    beds: 7,
    baths: 8,
    sqft: 9500,
    type: 'Villa',
    imageUrl: '/Sea_house.png',
    description: 'A Mediterranean-inspired masterpiece with a private marina, resort-style pool, and lush tropical gardens. This gated estate offers the ultimate in South Florida luxury living.',
    community: 'Coral Gables is Miami\'s City Beautiful, known for its tree-lined boulevards, historic architecture, and proximity to Biscayne Bay.',
    reviews: [
      { id: 'r8', user: 'Isabella V.', rating: 5, comment: 'The private dock is incredible. We entertain guests here every weekend.' },
      { id: 'r9', user: 'Carlos M.', rating: 5, comment: 'Unparalleled craftsmanship. Every detail has been thought through.' }
    ],
    agent: AGENTS[0] // Victoria (Waterfront)
  },
  {
    id: '8',
    title: 'Aspen Summit Lodge',
    price: 7800000,
    location: 'Aspen, CO',
    coords: { x: 35, y: 48 },
    beds: 5,
    baths: 5.5,
    sqft: 5100,
    type: 'House',
    imageUrl: '/Aspen_lodge.png',
    description: 'A contemporary mountain lodge with floor-to-ceiling windows framing the Elk Mountains. Features a private ski-in/ski-out trail, wine cellar, and heated outdoor infinity pool with mountain views.',
    community: 'Aspen is the crown jewel of Colorado mountain towns, offering world-class skiing, a thriving arts scene, and an exclusive community of discerning residents.',
    reviews: [
      { id: 'r10', user: 'Richard H.', rating: 5, comment: 'Ski-in/ski-out access is a game changer. The infinity pool at sunset is breathtaking.' }
    ],
    agent: AGENTS[2] // Elena (Modernist/Aspen)
  },
  {
    id: '9',
    title: 'Private Island Sanctuary',
    price: 15500000,
    location: 'Exuma Cays, Bahamas',
    coords: { x: 95, y: 85 },
    beds: 8,
    baths: 9.5,
    sqft: 12000,
    type: 'Estate',
    imageUrl: '/Cold_hawaii.png',
    description: 'The ultimate expression of privacy and exclusivity. This 40-acre private island features a main residence, three guest villas, a deep-water marina, and two pristine white-sand beaches.',
    community: 'The Exuma Cays are the playground of the ultra-wealthy, offering unmatched privacy, crystal-clear sapphire waters, and a tax-neutral environment.',
    reviews: [
      { id: 'r11', user: 'Jonathan K.', rating: 5, comment: 'Paradise found. The staff quarters and infrastructure are top-notch.' }
    ],
    agent: AGENTS[0] // Victoria (Waterfront)
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Julian Barnes',
    role: 'Tech Entrepreneur',
    content: "LuxeMap Estates completely transformed how I looked for my next investment. The visual map integration is intuitive and fast.",
    rating: 5
  },
  {
    id: 't2',
    author: 'Elena Rodriguez',
    role: 'Interior Designer',
    content: "The aesthetic of this platform matches the quality of properties they represent. It's a breath of fresh air in real estate.",
    rating: 5
  },
  {
    id: 't3',
    author: 'Marcus Aurelius',
    role: 'Architecture Critic',
    content: "Minimalist, functional, and deeply beautiful. A perfect example of digital architecture serving physical spaces.",
    rating: 5
  }
];
