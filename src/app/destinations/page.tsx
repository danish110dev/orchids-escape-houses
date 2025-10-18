"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, TrendingUp, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationsPage() {
  const destinations = [
  {
    name: "London",
    region: "Greater London",
    propertyCount: 35,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-london%2c-uk-29990c38-20251018180027.jpg",
    slug: "london",
    description: "The ultimate hen party destination with world-class entertainment, dining and iconic landmarks.",
    bio: "London is the undisputed capital of hen party magic. From exclusive rooftop bars in Shoreditch to West End shows and Michelin-starred dining, this global city has it all. Stay in our luxury townhouses and apartments, complete with hot tubs and entertaining spaces, and enjoy endless shopping, incredible nightlife, and iconic attractions like Tower Bridge and Buckingham Palace. Whether you're after bottomless brunch in Notting Hill or dancing until dawn in Mayfair, London delivers unforgettable experiences.",
    featured: true
  },
  {
    name: "Brighton",
    region: "East Sussex",
    propertyCount: 18,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-brighton-uk--cf923885-20251018100341.jpg",
    slug: "brighton",
    description: "Vibrant seaside city with amazing nightlife and stunning Regency architecture.",
    bio: "Brighton is the ultimate seaside hen party destination, blending beach vibes with legendary nightlife. Just an hour from London, this cosmopolitan city offers everything from pebble beaches and the iconic Brighton Pier to quirky shops in The Lanes and world-class restaurants. Our hen party houses feature hot tubs, sea views, and are perfectly positioned for accessing the best clubs, bars, and brunch spots. With its inclusive, fun-loving atmosphere and endless entertainment, Brighton promises a hen weekend you'll never forget.",
    featured: true
  },
  {
    name: "Bath",
    region: "Somerset",
    propertyCount: 15,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bath-uk-city-79258396-20251018100352.jpg",
    slug: "bath",
    description: "Historic spa city with Roman baths, Georgian architecture and luxury experiences.",
    bio: "Bath is pure elegance with a playful twist. This UNESCO World Heritage city combines stunning Georgian architecture with luxury spa experiences and sophisticated nightlife. Explore the famous Roman Baths, enjoy afternoon tea at The Pump Room, and dance the night away at popular venues. Our Bath properties offer period charm with modern luxuries like hot tubs and games rooms, perfect for a refined yet fun hen celebration. With boutique shopping, riverside walks, and incredible restaurants, Bath offers the perfect blend of culture and indulgence.",
    featured: true
  },
  {
    name: "Manchester",
    region: "Greater Manchester",
    propertyCount: 22,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-manchester-u-fdc0037c-20251018100402.jpg",
    slug: "manchester",
    description: "Vibrant city with world-class shopping, dining and legendary nightlife.",
    bio: "Manchester is the ultimate northern powerhouse for hen parties. Known for its vibrant music scene, legendary nightlife, and warm northern hospitality, this city knows how to celebrate. From the trendy Northern Quarter to the glamorous Spinningfields, you'll find incredible bars, restaurants, and clubs. Our Manchester hen houses offer luxurious spaces with hot tubs and entertaining areas, ideal for pre-drinks before hitting the town. With world-class shopping at Trafford Centre, bottomless brunches galore, and buzzing nightlife, Manchester delivers an electric hen weekend.",
    featured: true
  },
  {
    name: "Newquay",
    region: "Cornwall",
    propertyCount: 10,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newquay-corn-e91f1ad1-20251018180034.jpg",
    slug: "newquay",
    description: "Stunning Cornish beaches, surf culture and vibrant coastal nightlife.",
    bio: "Newquay is Cornwall's ultimate coastal party destination. Famous for its golden beaches, surf culture, and lively atmosphere, this seaside town offers the perfect mix of beach relaxation and vibrant nightlife. Our Newquay properties feature hot tubs with sea views, perfect for sunset celebrations. Enjoy surfing lessons, coastal walks, beach clubs, and buzzing bars along the harbour. Whether you're after daytime adventures or dancing until dawn, Newquay combines stunning natural beauty with an energetic party scene for an unforgettable hen weekend by the sea.",
    featured: true
  },
  {
    name: "Lake District",
    region: "Cumbria",
    propertyCount: 9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-lake-distric-a860a2c4-20251018180043.jpg",
    slug: "lake-district",
    description: "Scenic lakes and mountains perfect for luxury retreat weekends.",
    bio: "The Lake District offers breathtaking scenery for a luxury hen retreat. Escape to stunning manor houses and lakeside properties with hot tubs, where you can relax in complete tranquillity surrounded by mountains and lakes. Perfect for groups seeking outdoor adventures like hiking, lake cruises, and spa days, combined with cosy evenings by the fire. Explore charming villages, enjoy afternoon tea with stunning views, and indulge in local cuisine. Our Lake District properties provide the ultimate peaceful escape with all the luxury amenities for a sophisticated, rejuvenating hen celebration.",
    featured: true
  },
  {
    name: "York",
    region: "North Yorkshire",
    propertyCount: 12,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-york-uk%2c-m-7d6cc34e-20251018100412.jpg",
    slug: "york",
    description: "Medieval city with cobbled streets, historic walls and charming riverside pubs.",
    bio: "York combines medieval charm with modern hen party excitement. Walk ancient city walls, explore the historic Shambles, and visit the magnificent York Minster before enjoying the city's vibrant bar scene. Our York properties blend period features with contemporary luxuries, perfect for groups who appreciate history with a twist. Enjoy afternoon tea, riverside pubs, ghost walks, and buzzing nightlife. With excellent transport links and a compact city centre, York offers culture, charm, and celebration in one beautiful historic setting.",
    featured: false
  },
  {
    name: "Bournemouth",
    region: "Dorset",
    propertyCount: 14,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bournemouth--f4900618-20251018100420.jpg",
    slug: "bournemouth",
    description: "Beautiful beaches, vibrant nightlife and stunning coastal walks.",
    bio: "Bournemouth boasts seven miles of golden beaches and a reputation as one of the UK's best party destinations. This seaside gem offers beach clubs, water sports, cliff-top walks, and a buzzing town centre with excellent restaurants and bars. Our Bournemouth hen houses feature hot tubs, sea views, and easy access to both beaches and nightlife. Perfect for groups wanting sunshine, sand, and celebrations, Bournemouth delivers coastal charm with a vibrant atmosphere all year round.",
    featured: false
  },
  {
    name: "Liverpool",
    region: "Merseyside",
    propertyCount: 16,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-liverpool-uk-4dd6a7d5-20251018100435.jpg",
    slug: "liverpool",
    description: "Cultural hub with iconic waterfront, Beatles heritage and vibrant nightlife.",
    bio: "Liverpool is famous for its warm Scouse hospitality, rich musical heritage, and incredible nightlife. Explore the iconic waterfront, visit Beatles landmarks, enjoy world-class museums, and experience some of the UK's best bars and clubs. Our Liverpool hen party houses offer stylish spaces with hot tubs and entertaining areas, perfect for pre-party celebrations. With amazing restaurants, bottomless brunches, and legendary nightlife in Concert Square and the Albert Dock, Liverpool guarantees a hen weekend full of culture, fun, and unforgettable memories.",
    featured: false
  },
  {
    name: "Bristol",
    region: "South West England",
    propertyCount: 11,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-bristol-uk-h-41be7939-20251018100453.jpg",
    slug: "bristol",
    description: "Creative city with harbour life, street art and amazing food scene.",
    bio: "Bristol is the creative heart of the South West, known for its stunning harbour, world-famous street art, and incredible food scene. This vibrant city offers boutique shopping, harbour-side dining, buzzing bars, and a thriving cultural scene. Our Bristol properties combine urban cool with luxury amenities, perfect for hen groups who appreciate creativity and style. Explore Clifton's Georgian elegance, discover Banksy artworks, enjoy the floating harbour, and experience Bristol's legendary nightlife for a unique and memorable celebration.",
    featured: false
  },
  {
    name: "Newcastle",
    region: "Tyne and Wear",
    propertyCount: 9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-newcastle-uk-a7d70fdf-20251018100503.jpg",
    slug: "newcastle",
    description: "Friendly northern city famous for nightlife and stunning quayside.",
    bio: "Newcastle is legendary for its nightlife and famous Geordie hospitality. This vibrant northern city offers incredible bars and clubs, beautiful quayside dining, and a welcoming atmosphere that makes every celebration special. Our Newcastle hen houses provide luxury spaces with hot tubs and games rooms, ideal for groups who want to party hard and relax in style. With affordable prices, amazing venues, and some of the friendliest locals you'll meet, Newcastle delivers an electric hen weekend that won't break the bank.",
    featured: false
  },
  {
    name: "Cambridge",
    region: "Cambridgeshire",
    propertyCount: 8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cambridge-uk-4a05d130-20251018100510.jpg",
    slug: "cambridge",
    description: "Historic university city with punting, beautiful colleges and riverside pubs.",
    bio: "Cambridge combines academic elegance with sophisticated entertainment. This beautiful university city offers punting on the River Cam, stunning college architecture, boutique shopping, and lovely riverside pubs. Our Cambridge properties provide refined luxury with hot tubs and elegant entertaining spaces, perfect for cultured hen celebrations. Enjoy afternoon tea, explore historic colleges, punt along the Backs, and discover the city's growing food and bar scene. Cambridge offers a unique blend of heritage, beauty, and refined fun for a memorable hen weekend.",
    featured: false
  },
  {
    name: "Oxford",
    region: "Oxfordshire",
    propertyCount: 7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-oxford-uk%2c-c49c256a-20251018100521.jpg",
    slug: "oxford",
    description: "Stunning university city with historic architecture and charming streets.",
    bio: "Oxford is the city of dreaming spires and sophisticated celebration. Explore world-famous colleges, beautiful gardens, and historic pubs where literary greats once gathered. Our Oxford hen houses offer elegant spaces with modern luxuries, perfect for refined groups. Enjoy river cruises, visit the iconic Bodleian Library, discover hidden courtyards, and experience Oxford's growing cocktail and dining scene. With its blend of academic heritage, stunning architecture, and contemporary entertainment, Oxford provides a uniquely cultured hen party destination.",
    featured: false
  },
  {
    name: "Leeds",
    region: "West Yorkshire",
    propertyCount: 12,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-leeds-uk-cit-d85d4919-20251018100537.jpg",
    slug: "leeds",
    description: "Energetic city with fantastic shopping, dining and buzzing nightlife.",
    bio: "Leeds is Yorkshire's vibrant party capital with incredible shopping, dining, and nightlife. This energetic city offers everything from high-street shopping at Trinity Leeds to independent boutiques in the Victorian Quarter. Our Leeds properties provide stylish spaces with hot tubs and games rooms, perfect for pre-party preparations. Enjoy bottomless brunches, rooftop bars, buzzing clubs in the Call Lane area, and warm Yorkshire hospitality. With excellent value, great transport links, and non-stop entertainment, Leeds delivers an action-packed hen weekend.",
    featured: false
  },
  {
    name: "Nottingham",
    region: "Nottinghamshire",
    propertyCount: 9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-nottingham-u-4740c95f-20251018100547.jpg",
    slug: "nottingham",
    description: "Historic city with Robin Hood legend, caves and vibrant student scene.",
    bio: "Nottingham blends medieval history with modern entertainment. Famous for Robin Hood, historic caves, and a thriving student scene, this city offers great value nightlife, excellent restaurants, and unique attractions. Our Nottingham hen houses feature luxury amenities and entertaining spaces, perfect for groups seeking fun without the London price tag. Explore the castle, discover underground caves, enjoy lace market dining, and experience buzzing bars and clubs. Nottingham combines history, culture, and vibrant nightlife for an affordable yet memorable hen celebration.",
    featured: false
  },
  {
    name: "Birmingham",
    region: "West Midlands",
    propertyCount: 14,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-birmingham-u-99ad4012-20251018100557.jpg",
    slug: "birmingham",
    description: "Dynamic city with canal network, Michelin dining and diverse culture.",
    bio: "Birmingham is the UK's second city and a hidden gem for hen parties. Explore miles of scenic canals, more than Venice, enjoy Michelin-starred dining, and experience the vibrant Jewellery Quarter. Our Birmingham properties offer modern luxury with hot tubs and entertaining spaces, perfect for diverse groups. With incredible restaurants representing cuisines from around the world, stylish cocktail bars, buzzing nightlife in Broad Street, and excellent shopping at the Bullring, Birmingham delivers sophistication, diversity, and great value for an unforgettable celebration.",
    featured: false
  },
  {
    name: "Sheffield",
    region: "South Yorkshire",
    propertyCount: 8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-sheffield%2c-2b51ddd4-20251018103602.jpg",
    slug: "sheffield",
    description: "Industrial heritage meets modern nightlife with fantastic live music venues.",
    bio: "Sheffield combines industrial heritage with outdoor beauty and vibrant entertainment. Known for its live music scene, craft beer bars, and proximity to the Peak District, this city offers unique character and value. Our Sheffield hen houses provide comfortable luxury with hot tubs and games rooms, ideal for groups who appreciate authenticity. Explore independent bars in Kelham Island, enjoy live music venues, discover craft breweries, and experience friendly Yorkshire hospitality. Sheffield delivers a genuine, unpretentious hen celebration with easy access to stunning countryside.",
    featured: false
  },
  {
    name: "Exeter",
    region: "Devon",
    propertyCount: 6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-exeter%2c-uk-32d01645-20251018103610.jpg",
    slug: "exeter",
    description: "Historic cathedral city with Roman walls, riverside dining and coastal access.",
    bio: "Exeter is a charming cathedral city offering the perfect blend of history, culture, and coastal access. Explore Roman walls, visit the stunning Exeter Cathedral, and enjoy riverside dining along the Quayside. Our Exeter properties provide elegant spaces with luxury amenities, perfect for refined hen celebrations. Just minutes from stunning Devon beaches and Dartmoor National Park, Exeter combines city sophistication with natural beauty. Enjoy boutique shopping, lovely cafes, and a growing food scene for a relaxed yet memorable hen weekend in the beautiful South West.",
    featured: false
  },
  {
    name: "Chester",
    region: "Cheshire",
    propertyCount: 7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-chester%2c-u-2fa11484-20251018103617.jpg",
    slug: "chester",
    description: "Roman city with ancient walls, Tudor buildings and boutique shopping.",
    bio: "Chester is a beautifully preserved Roman city offering 2,000 years of history combined with modern luxury. Walk the complete city walls, explore the unique Tudor Rows, and enjoy boutique shopping and riverside dining. Our Chester properties blend period charm with contemporary comfort, perfect for sophisticated hen groups. Visit Chester Zoo, take a river cruise, explore the stunning cathedral, and discover excellent restaurants and wine bars. Chester provides an elegant, picturesque setting for a cultured hen celebration with a touch of history and timeless beauty.",
    featured: false
  },
  {
    name: "Durham",
    region: "County Durham",
    propertyCount: 6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-durham%2c-uk-c4a1b719-20251018103625.jpg",
    slug: "durham",
    description: "World Heritage site with stunning cathedral, castle and riverside walks.",
    bio: "Durham is a UNESCO World Heritage site offering breathtaking beauty and intimate charm. The stunning Durham Cathedral and Castle dominate the skyline above the River Wear, creating a magical setting for celebrations. Our Durham properties provide comfortable luxury in this compact, walkable city. Enjoy riverside walks, explore the historic peninsula, discover cosy pubs and restaurants, and experience the vibrant student atmosphere. Durham combines spectacular architecture, natural beauty, and warm northern hospitality for a unique, memorable hen weekend in one of England's most beautiful cities.",
    featured: false
  },
  {
    name: "Canterbury",
    region: "Kent",
    propertyCount: 5,
    image: "https://v3b.fal.media/files/b/tiger/2bNJn7KNACVIcuVHWsAp-_output.png",
    slug: "canterbury",
    description: "Medieval city with famous cathedral, charming streets and riverside pubs.",
    bio: "Canterbury is a beautiful medieval city steeped in history and pilgrimage heritage. Home to the magnificent Canterbury Cathedral, this charming city offers cobbled streets, independent shops, and lovely riverside pubs. Our Canterbury properties provide character and comfort, perfect for groups seeking a relaxed, cultural celebration. Explore historic sites, enjoy punting on the River Stour, discover hidden courtyards and tea rooms, and experience the city's growing dining scene. Just an hour from London and close to coastal Kent, Canterbury offers heritage, charm, and tranquillity for a sophisticated hen weekend.",
    featured: false
  },
  {
    name: "Blackpool",
    region: "Lancashire",
    propertyCount: 8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-blackpool%2c-012163d9-20251018103641.jpg",
    slug: "blackpool",
    description: "Classic seaside resort with tower, beaches and legendary nightlife.",
    bio: "Blackpool is the UK's original party destination offering classic British seaside fun with non-stop entertainment. Famous for Blackpool Tower, the Pleasure Beach, and legendary nightlife, this vibrant resort knows how to celebrate. Our Blackpool hen houses offer great value with fun amenities, perfect for groups seeking traditional hen party excitement. Enjoy the Illuminations, visit comedy shows, experience buzzing bars and clubs along the promenade, and create nostalgic memories. With affordable prices, endless entertainment, and true British character, Blackpool delivers fun, laughter, and unforgettable hen party moments.",
    featured: false
  },
  {
    name: "Cotswolds",
    region: "Gloucestershire",
    propertyCount: 7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-cotswolds%2c-60a2f4ac-20251018180051.jpg",
    slug: "cotswolds",
    description: "Picturesque honey-stone villages with luxury manor houses and boutique charm.",
    bio: "The Cotswolds represents quintessential English countryside luxury. Stay in stunning manor houses and cottages with hot tubs, surrounded by rolling hills and picture-perfect honey-stone villages. This Area of Outstanding Natural Beauty offers the ultimate escape for groups seeking relaxation, sophistication, and natural beauty. Enjoy country walks, visit charming market towns like Burford and Stow-on-the-Wold, indulge in afternoon tea, and discover Michelin-starred dining. The Cotswolds provides an exclusive, peaceful retreat for a refined, luxurious hen celebration in England's most beautiful countryside.",
    featured: false
  },
  {
    name: "Margate",
    region: "Kent",
    propertyCount: 6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-margate%2c-u-d23f8a09-20251018180059.jpg",
    slug: "margate",
    description: "Trendy seaside town with vintage vibes, art galleries and sandy beaches.",
    bio: "Margate has transformed into one of the UK's coolest coastal destinations. This trendy seaside town offers vintage charm, contemporary art at Turner Contemporary, sandy beaches, and a thriving independent scene. Our Margate properties provide stylish coastal living with modern amenities, perfect for creative groups. Explore retro shops, enjoy beach cafes and craft beer bars, discover Dreamland amusement park, and experience Margate's unique bohemian atmosphere. Just 90 minutes from London, Margate combines nostalgic seaside charm with hip urban culture for a refreshingly different hen celebration by the sea.",
    featured: false
  },
  {
    name: "Harrogate",
    region: "North Yorkshire",
    propertyCount: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-harrogate%2c-cfa55d27-20251018180105.jpg",
    slug: "harrogate",
    description: "Elegant spa town with Victorian charm, boutique shops and afternoon tea.",
    bio: "Harrogate is the epitome of Yorkshire elegance and refinement. This beautiful spa town offers Victorian charm, award-winning gardens, luxury spa experiences, and sophisticated dining. Our Harrogate properties provide elegant spaces with modern luxuries, perfect for refined hen celebrations. Visit the historic Turkish Baths, enjoy afternoon tea at Bettys, explore boutique shops and antique stores, and discover excellent restaurants and cocktail bars. With access to the stunning Yorkshire Dales and proximity to York, Harrogate delivers understated luxury, natural beauty, and timeless elegance for a truly special hen weekend.",
    featured: false
  },
  {
    name: "St Ives",
    region: "Cornwall",
    propertyCount: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-st-ives-corn-c20b8f01-20251018180133.jpg",
    slug: "st-ives",
    description: "Stunning Cornish harbour town with golden beaches and coastal beauty.",
    bio: "St Ives is Cornwall's most beautiful harbour town offering Mediterranean vibes in the UK. Famous for golden beaches, turquoise waters, and artistic heritage, this picturesque destination provides the perfect coastal escape. Our St Ives properties offer stunning sea views and coastal luxury, ideal for groups seeking relaxation and natural beauty. Enjoy beach days, harbour dining, art galleries including Tate St Ives, coastal walks, and fresh seafood. With its unique light, charming streets, and spectacular scenery, St Ives delivers a tranquil, beautiful hen celebration in one of Britain's most stunning locations.",
    featured: false
  },
  {
    name: "Windsor",
    region: "Berkshire",
    propertyCount: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-windsor%2c-u-5545ede5-20251018180119.jpg",
    slug: "windsor",
    description: "Royal town with castle views, riverside walks and historic charm.",
    bio: "Windsor offers royal elegance just outside London. Home to Windsor Castle, the oldest occupied castle in the world, this historic town provides regal surroundings for sophisticated celebrations. Our Windsor properties offer luxury living with views of the castle and river, perfect for groups seeking refinement and convenience. Explore the castle, enjoy riverside walks along the Thames, discover boutique shops, and experience fine dining. With easy access to London, proximity to Heathrow, and connections to nearby attractions like Ascot and Eton, Windsor delivers royal treatment and timeless elegance for a memorable hen weekend.",
    featured: false
  },
  {
    name: "Stratford-upon-Avon",
    region: "Warwickshire",
    propertyCount: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-stratford-up-91d286ca-20251018180126.jpg",
    slug: "stratford-upon-avon",
    description: "Shakespeare's birthplace with Tudor houses and riverside gardens.",
    bio: "Stratford-upon-Avon is Shakespeare's birthplace offering literary heritage and timeless charm. This beautiful market town combines Tudor architecture, riverside walks, and world-class theatre. Our Stratford properties provide character and comfort in historic settings, perfect for cultured hen groups. Visit Shakespeare's birthplace, enjoy Royal Shakespeare Company performances, explore Anne Hathaway's Cottage, and discover lovely restaurants and riverside pubs. Located in the heart of the Cotswolds with excellent transport links, Stratford delivers culture, history, and scenic beauty for an elegant, memorable hen celebration in literary England.",
    featured: false
  },
  {
    name: "Plymouth",
    region: "Devon",
    propertyCount: 7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/professional-stock-photo-of-plymouth%2c--3a2cc458-20251018180819.jpg",
    slug: "plymouth",
    description: "Historic naval port with waterfront dining, vibrant nightlife and coastal charm.",
    bio: "Plymouth is a historic naval city offering maritime heritage, waterfront living, and vibrant entertainment. Explore the famous Barbican harbour, visit the National Marine Aquarium, and enjoy stunning coastal walks along the South West Coast Path. Our Plymouth properties provide modern comfort with sea views, perfect for groups seeking coastal celebration. Discover excellent seafood restaurants, buzzing bars in the Ocean City area, beautiful beaches nearby, and access to Dartmoor National Park. Plymouth combines naval history, natural beauty, and lively nightlife for an adventurous, memorable hen weekend on England's dramatic south coast.",
    featured: false
  },
  {
    name: "Cheltenham",
    region: "Gloucestershire",
    propertyCount: 6,
    image: "https://v3b.fal.media/files/b/koala/OWWytRD5loYfhDon_5nva_output.png",
    slug: "cheltenham",
    description: "Regency spa town with elegant architecture, festivals and Cotswolds gateway.",
    bio: "Cheltenham is the Regency jewel of the Cotswolds offering elegance, culture, and sophistication. Famous for its festivals, including horse racing at Cheltenham Festival, this spa town combines stunning architecture with modern entertainment. Our Cheltenham properties provide refined luxury in beautiful settings, perfect for discerning hen groups. Enjoy elegant Promenade shopping, visit award-winning restaurants, explore the stunning Regency terraces, and experience excellent bars and cafes. As the gateway to the Cotswolds with easy access to stunning countryside, Cheltenham delivers refined elegance, cultural richness, and natural beauty for a sophisticated hen celebration.",
    featured: false
  }];

  const featuredDestinations = destinations.filter((d) => d.featured);
  const otherDestinations = destinations.filter((d) => !d.featured);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[var(--color-accent-pink)]" />
            <span className="text-sm font-medium">Explore England</span>
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Top Hen Party Destinations in England
          </h1>
          <p className="text-xl text-[var(--color-neutral-dark)] max-w-2xl mx-auto mb-6">
            Discover the best cities and towns across England for your hen celebration
          </p>
          <p className="text-base text-[var(--color-neutral-dark)] max-w-3xl mx-auto leading-relaxed">
            From vibrant city centres with legendary nightlife to stunning coastal retreats and historic spa towns, England offers incredible destinations for unforgettable hen weekends. Each location features handpicked luxury houses with hot tubs, pools, and all the amenities you need for the perfect group celebration.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-[var(--color-accent-pink)]" />
            <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Most Popular
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) =>
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

                <div className="relative h-[580px]">
                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}>
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/95 text-[var(--color-text-primary)] text-sm font-medium shadow-lg backdrop-blur-sm">
                    {destination.propertyCount} properties
                  </div>

                  {/* Content with white background */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}>

                      {destination.name}
                    </h3>
                    <p className="text-sm font-medium mb-3">
                      {destination.region}
                    </p>
                    <p className="text-sm leading-relaxed mb-4 text-black">
                      {destination.bio}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="sm"
                        className="rounded-xl px-6 py-2 text-sm font-medium transition-all duration-200"
                        style={{
                          background: "var(--color-accent-sage)",
                          color: "white"
                        }}>
                        View Properties
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl px-6 py-2 text-sm font-medium transition-all duration-200"
                        style={{
                          background: "var(--color-accent-pink)",
                          color: "white"
                        }}>
                        <Link href="/contact" onClick={(e) => e.stopPropagation()}>
                          Check Availability
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section 1 - After Featured Destinations */}
      <section className="py-12 bg-gradient-to-br from-[var(--color-accent-pink)] to-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span className="text-sm font-medium">Ready to Book?</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Find Your Perfect Hen Party House
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)] mb-8 max-w-2xl mx-auto">
            Browse our full collection of luxury houses with hot tubs, pools and games rooms
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl px-12 py-7 text-lg font-semibold transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 group"
            style={{
              background: "var(--color-text-primary)",
              color: "white"
            }}>

            <Link href="/properties" className="inline-flex items-center gap-2">
              View All Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            All Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((destination) =>
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

                <div className="relative h-[420px]">
                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}>
                </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm text-[var(--color-text-primary)]">
                    <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)" }}>

                      {destination.name}
                    </h3>
                    <p className="text-xs font-medium mb-2">
                      {destination.region}
                    </p>
                    <p className="text-xs font-medium mb-3">
                      {destination.propertyCount} properties
                    </p>
                    <Button
                    size="sm"
                    className="rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 w-full"
                    style={{
                      background: "var(--color-accent-sage)",
                      color: "white"
                    }}>

                      View Properties
                    </Button>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section 2 - After All Destinations */}
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center shadow-2xl" style={{ background: "linear-gradient(135deg, var(--color-accent-sage), var(--color-accent-gold))" }}>
            <h2 className="text-4xl md:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              Not Sure Where to Go?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free personalised quote and let us help you find the perfect destination and house for your group celebration
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-12 py-7 text-lg font-semibold transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
              style={{
                background: "white",
                color: "var(--color-text-primary)"
              }}>

              <Link href="/contact" className="inline-flex items-center gap-2">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-8 scroll-reveal" style={{ background: "var(--color-accent-pink)" }}>
        <div className="max-w-full !text-[10px]">
          {/* Top Row: Text */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 max-w-[1400px] mx-auto px-6">
            <h2
              className="text-4xl md:text-5xl m-0"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>

              We're on Instagram
            </h2>
            <a
              href="https://instagram.com/groupescapehouses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>

              <Instagram className="w-10 h-10" />
              @groupescapehouses
            </a>
          </div>

          {/* Bottom Row: Photo Strip with Animation */}
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-slide-left">
              {[
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90",
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=90",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=90",
              "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=90",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90",
              "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=90",
              // Duplicate for seamless loop
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90",
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=90",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=90",
              "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=90"].
              map((image, index) =>
              <a
                key={index}
                href="https://instagram.com/groupescapehouses"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">

                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image}')` }}>
                </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-7 h-7" style={{ color: "var(--color-accent-pink)" }} />
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-16" style={{ fontFamily: "var(--font-display)" }}>
            Why Choose Group Escape Houses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-pink)" }}>

                🏡
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Properties in the best areas, close to nightlife, restaurants and attractions
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-sage)" }}>

                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Insider tips and recommendations for the best experiences in every city
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                style={{ background: "var(--color-accent-gold)" }}>

                🎊
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Packages</h3>
              <p className="text-[var(--color-neutral-dark)]">
                Combine accommodation with experiences for a hassle-free celebration
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-10 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "var(--color-accent-sage)",
                  color: "white"
                }}>

                <Link href="/properties">Browse Houses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl px-10 py-6 font-medium border-2 transition-all duration-200 hover:bg-[var(--color-accent-gold)] hover:text-white hover:border-[var(--color-accent-gold)]"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  color: "var(--color-text-primary)"
                }}>

                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}