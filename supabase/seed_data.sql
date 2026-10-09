-- ====================================================================
-- AURELIA — LUXURY RESORT & NATURE RETREAT
-- SEED DATA (Realistic high-fidelity records)
-- ====================================================================

-- 1. SEED USERS
-- Passwords hashed for 'Password123!' (BCrypt hash: $2a$10$e8eJgN2pU53Y... or default mock)
INSERT INTO users (id, name, email, phone, password_hash, role) VALUES
('a0000000-0000-0000-0000-000000000001', 'Admin Concierge', 'admin@aureliaresort.com', '+91 98765 43210', '$2a$10$7vjV6eZ0/O0rC3R9r2b6a.w2jVw8z8u7H6x2l8q0W2e4r6t8y0u2i', 'ADMIN'),
('a0000000-0000-0000-0000-000000000002', 'Harish Kumar', 'harish@example.com', '+91 98123 45678', '$2a$10$7vjV6eZ0/O0rC3R9r2b6a.w2jVw8z8u7H6x2l8q0W2e4r6t8y0u2i', 'USER'),
('a0000000-0000-0000-0000-000000000003', 'Elena Rostova', 'elena.rostova@luxurytravel.com', '+1 415 555 0192', '$2a$10$7vjV6eZ0/O0rC3R9r2b6a.w2jVw8z8u7H6x2l8q0W2e4r6t8y0u2i', 'USER');

-- 2. SEED ROOMS & VILLAS
INSERT INTO rooms (id, name, description, room_type, price_per_night, capacity, size_sqft, view_type, image_url, gallery, amenities, available, rating) VALUES
('b0000000-0000-0000-0000-000000000001', 
 'Ocean Villa', 
 'Perched gracefully above the azure shoreline, the Ocean Villa offers seamless indoor-outdoor living with a private infinity plunge pool, expansive teak sundeck, and floor-to-ceiling glass gazing into the turquoise sea.',
 'Villa', 35000.00, 2, 1450, 'Direct Ocean View',
 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Private Plunge Pool', 'King Bed', 'Marble Rain Shower', 'Bose Sound System', 'Private Butler Service', 'Wine Cellar'],
 TRUE, 4.98),

('b0000000-0000-0000-0000-000000000002', 
 'Forest Sanctuary Villa', 
 'Nestled deep within our ancient tropical rainforest canopy. Savor secluded tranquility with birdsong, private heated volcanic rock pool, outdoor rainforest shower, and handcrafted teak interiors.',
 'Villa', 28000.00, 2, 1300, 'Rainforest Canopy',
 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Forest Balcony', 'Outdoor Granite Tub', 'King Canopy Bed', 'Espresso Bar', 'Stargazing Telescope'],
 TRUE, 4.95),

('b0000000-0000-0000-0000-000000000003', 
 'Presidential Ocean Pavilion', 
 'The pinnacle of Aurelia architecture. Spanning two private levels with 270-degree panorama of the cliffs and sea, 25-meter private infinity pool, dedicated 24-hour private chef & butler, and private boat jetty.',
 'Presidential', 75000.00, 6, 3800, 'Panoramic Ocean & Cliff',
 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['25m Infinity Pool', '24/7 Dedicated Butler', 'Private Chef Kitchen', 'Helipad Access', 'Private Spa Suite', 'Steinway Grand Piano'],
 TRUE, 5.00),

('b0000000-0000-0000-0000-000000000004', 
 'Sunset Water Pavilion', 
 'Suspended over crystal-clear coral shallows with private glass floor viewing panels, direct ocean swimming ladder, overwater hammock nets, and unobstructed sunset vistas every evening.',
 'Villa', 42000.00, 2, 1600, 'Sunset Lagoon View',
 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Overwater Hammock', 'Glass Floor Portals', 'Sunset Facing Deck', 'Champagne Bar', 'Snorkel Gear Provided'],
 TRUE, 4.96),

('b0000000-0000-0000-0000-000000000005', 
 'Cliffside Panoramic Suite', 
 'Carved into the volcanic granite cliffs rising 80 meters above the roaring surf. Features an open-air stone terrace, private heated jacuzzi, and uninterrupted horizons where ocean meets the sky.',
 'Suite', 38000.00, 2, 1500, 'High Cliff & Ocean',
 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Cliffside Jacuzzi', 'Private Fire Pit', 'Custom Daybeds', 'Bespoke Bar', 'Telescope Lounge'],
 TRUE, 4.94),

('b0000000-0000-0000-0000-000000000006', 
 'Canopy Treehouse Haven', 
 'Elevated high among wild ironwood branches. Sustainable luxury architecture blending raw organic timbers with opulent Belgian linens, copper soaking tub, and aerial walkway connecting to a private meditation deck.',
 'Suite', 31000.00, 2, 1150, 'High Forest Canopy',
 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Copper Soaking Tub', 'Meditation Deck', 'Suspended Net Lounges', 'Organic Aromatherapy', 'Birdwatching Guide'],
 TRUE, 4.92),

('b0000000-0000-0000-0000-000000000007', 
 'Royal Coral Residence', 
 'An expansive 3-bedroom compound with private white sand beachfront, dual master suites, private lagoon access, enclosed tropical botanical courtyard, and personal golf buggy.',
 'Pavilion', 62000.00, 6, 2900, 'Direct Beachfront',
 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Private Beach Access', 'Dual Plunge Pools', 'Private Golf Cart', 'Family Lounge & Library', 'Chef Service Available'],
 TRUE, 4.99),

('b0000000-0000-0000-0000-000000000008', 
 'Emerald Ridge Penthouse', 
 'Commanding the highest elevation of Aurelia Ridge. 360-degree views encompassing mist-draped volcanic peaks and the boundless Indian Ocean. Features cantilevered glass infinity pool.',
 'Presidential', 68000.00, 4, 3200, 'Mountain & Sea 360°',
 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Cantilevered Glass Pool', 'Wine Tasting Room', 'Executive Office', 'Panoramic Sauna', 'Helipad Arrival'],
 TRUE, 4.97),

('b0000000-0000-0000-0000-000000000009', 
 'Lagoon Garden Suite', 
 'Surrounded by tranquil freshwater lily ponds and fragrant frangipani blossoms. Steps from our organic botanical garden and holistic wellness sanctuary.',
 'Suite', 24000.00, 2, 1050, 'Lagoon & Gardens',
 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Lily Pond Terrace', 'Outdoor Daybed', 'Organic Herbal Bar', 'Ensuite Rainfall Bath', 'Yoga Mats & Props'],
 TRUE, 4.90),

('b0000000-0000-0000-0000-00000010', 
 'Overwater Coral Haven', 
 'Contemporary marine architecture hovering above our pristine coral conservatory. Direct swim access with marine biologist guided snorkeling directly off your deck.',
 'Villa', 46000.00, 2, 1750, 'Coral Conservatory',
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
 ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'],
 ARRAY['Direct Reef Access', 'Glass Sunken Lounge', 'Custom Cocktail Bar', 'Outdoor Coral Shower', 'Night Reef Torch Kit'],
 TRUE, 4.98);

-- 3. SEED RESTAURANTS
INSERT INTO restaurants (id, name, description, cuisine, timings, dress_code, featured_dish, image_url) VALUES
('c0000000-0000-0000-0000-000000000001',
 'Azure',
 'Overlooking the phosphorescent waves, Azure presents Michelin-starred modern coastal gastronomy with wild-caught seafood and vintage champagne pairings.',
 'Modern Coastal & Fine Dining', '18:30 – 23:00', 'Elegant / Semi-Formal',
 'Glacier 51 Toothfish with Saffron Consommé & Sea Succulents',
 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85'),

('c0000000-0000-0000-0000-000000000002',
 'Terra',
 'Set inside our lush 4-acre organic permaculture orchard. Dishes crafted entirely with estate-harvested heirloom produce, wild mountain truffles, and artisanal olive pressings.',
 'Organic Farm-to-Table', '12:00 – 16:00 | 19:00 – 22:30', 'Smart Casual',
 'Wood-Fired Morel Risotto with Fermented Wild Berry Reduction',
 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85'),

('c0000000-0000-0000-0000-000000000003',
 'Luna',
 'Intimate barefoot beachside dining where torchlight flickers along golden sands. Signature ceviches, fresh island oysters, and botanical mixology curated under starry skies.',
 'Beachside Grill & Raw Bar', '11:00 – 00:00', 'Island Chic / Barefoot',
 'Cured Yellowfin Tartare with Calamansi Pearls & Coconut Smoke',
 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1600&q=85'),

('c0000000-0000-0000-0000-000000000004',
 'Ember',
 'Ancient open-flame cooking elevated to high art. Prime Wagyu beef, smoked rock lobster, and robata skewers grilled over aromatic rambutan charcoal logs.',
 'Artisanal Barbecue & Robata', '17:30 – 23:30', 'Resort Casual',
 'A5 Olive Wagyu with Smoked Sea Salt & Black Garlic Glaze',
 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85');

-- 4. SEED ACTIVITIES
INSERT INTO activities (id, name, description, price, duration, category, image_url) VALUES
('d0000000-0000-0000-0000-000000000001',
 'PADI Coral Sanctuary Scuba',
 'Descend into untouched marine biodiversity with our certified dive masters to explore vibrant coral pinnacles and sea turtle sanctuaries.',
 8500.00, '3.5 Hours', 'Marine Adventure',
 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85'),

('d0000000-0000-0000-0000-000000000002',
 'Glass-Bottom Kayak Discovery',
 'Glide across crystal-clear lagoon lagoons in transparent illuminated kayaks, observing vibrant stingrays and marine life beneath your feet.',
 4500.00, '2 Hours', 'Water Sports',
 'https://images.unsplash.com/photo-1544551763-77ef2d0cf961?auto=format&fit=crop&w=1200&q=85'),

('d0000000-0000-0000-0000-000000000003',
 'Sunset Catamaran Yacht Cruise',
 'Charter our 52-foot luxury catamaran for golden hour sailing with Krug champagne, canapés, and dolphin watching along the outer reef.',
 18000.00, '3 Hours', 'Luxury Sailing',
 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=85'),

('d0000000-0000-0000-0000-000000000004',
 'Volcanic Peak Sunrise Trek',
 'An unforgettable guided hike up the resort ridge to greet the dawn above the cloud line with a gourmet alpine breakfast hamper.',
 6000.00, '4 Hours', 'Mountain Trek',
 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'),

('d0000000-0000-0000-0000-000000000005',
 'Cliffside Sound Bath & Hatha Yoga',
 'Harmonize mind and spirit on our open pavilion overlooking the surging ocean waves with Tibetan singing bowls and certified yogis.',
 3500.00, '90 Mins', 'Wellness',
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85'),

('d0000000-0000-0000-0000-000000000006',
 'Private Sandbank Candlelit Dinner',
 'A secluded white sand atoll reserved solely for you. 5-course bespoke menu prepared by private chef, surrounded by 100 candle lanterns.',
 25000.00, '4 Hours', 'Romantic Experience',
 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85');

-- 5. SEED AMENITIES
INSERT INTO amenities (id, name, description, image_url, icon) VALUES
('e0000000-0000-0000-0000-000000000001', 'Ananda Ayurvedic & Thalasso Spa', 'Hydrotherapy pools, infrared volcanic cedar saunas, and botanical healing rituals.', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85', 'Sparkles'),
('e0000000-0000-0000-0000-000000000002', 'Twin Tiered Oceanfront Infinity Pools', 'Heated fresh and saltwater pools seamlessly visually bleeding into the ocean horizon.', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85', 'Waves'),
('e0000000-0000-0000-0000-000000000003', 'Helipad & Seaplane Lounge', 'Bespoke private transit arrivals with direct concierge greeting.', 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85', 'Plane'),
('e0000000-0000-0000-0000-000000000004', '24-Hour Private Butler Service', 'Discrete, anticipatory hospitality attending to every desire effortlessly.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85', 'ShieldCheck');

-- 6. SEED REVIEWS
INSERT INTO reviews (id, user_id, user_name, user_location, rating, comment, created_at) VALUES
('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Harish Kumar', 'Bengaluru, India', 5, 'Aurelia is truly beyond description. The Ocean Villa plunges right into the marine sanctuary. Waking up to dolphins swimming past your balcony is a transformative experience.', NOW() - INTERVAL '2 days'),
('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'Elena Rostova', 'Zurich, Switzerland', 5, 'World-class hospitality. Azure restaurant serves the finest seafood I have tasted anywhere in the world. The architecture feels like an organic extension of nature.', NOW() - INTERVAL '5 days'),
('f0000000-0000-0000-0000-000000000003', NULL, 'Lord Sebastian Sterling', 'London, UK', 5, 'The Presidential Pavilion provides unmatched seclusion and discretion. From the helicopter greeting to private sunset cruises, Aurelia sets the standard for ultra-luxury.', NOW() - INTERVAL '10 days'),
('f0000000-0000-0000-0000-000000000004', NULL, 'Dr. Marcus Vance', 'San Francisco, USA', 5, 'The sound bath yoga on the granite cliffs and the Ayurvedic thalassotherapy erased months of fatigue. We booked our return stay before even checking out.', NOW() - INTERVAL '14 days');

-- 7. SEED BOOKINGS (Sample bookings for Harish)
INSERT INTO bookings (id, user_id, room_id, check_in, check_out, guests, total_price, status, special_requests) VALUES
('10000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', CURRENT_DATE + 14, CURRENT_DATE + 18, 2, 140000.00, 'CONFIRMED', 'Airport seaplane transfer requested, chilled Krug champagne upon arrival'),
('10000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', CURRENT_DATE - 30, CURRENT_DATE - 27, 2, 84000.00, 'COMPLETED', 'Anniversary celebration arrangement');
