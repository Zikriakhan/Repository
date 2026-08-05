import React from 'react';
import Hero from './Hero';
import BrowniePromo from './BrowniePromo';
import FriedMacCheesePromo from './FriedMacCheesePromo';
import PizzaPromo from './PizzaPromo';
import FreshlyPrepared from './FreshlyPrepared';
import BitesAndBowls from './BitesAndBowls';
import Desserts from './Desserts';
import DoorDashPromo from './DoorDashPromo';
import RewardsOffers from './RewardsOffers';
import ReservationsPromo from './ReservationsPromo';
import GiftCardPromo from './GiftCardPromo';
import AppDownload from './AppDownload';
import FindRestaurant from './FindRestaurant';

const Home = () => {
  return (
    <div className="bg-[#FFFFFF] text-[#1F2937] font-sans antialiased overflow-x-hidden">
      {/* 1. National Cheesecake Day Hero */}
      <Hero />
      
      {/* 2. New Debut: Classic Italian Lasagna */}
      <BrowniePromo />
      
      {/* 3. Fan Favorite: Aesthetic Penne Pasta */}
      <FriedMacCheesePromo />
      
      {/* 4. Signature: Ultimate Double Cheese Pizza */}
      <PizzaPromo />
      
      {/* 5. Taste the Difference: Freshly Prepared */}
      <FreshlyPrepared />
      
      {/* 5. Menu Showcase: Bites and Bowls */}
      <BitesAndBowls />
      
      {/* 6. Specialty Desserts Showcase */}
      <Desserts />
      
      {/* 7. DoorDash Promotion */}
      <DoorDashPromo />
      
      {/* 8. Cheesecake Rewards Offers */}
      <RewardsOffers />
      
      {/* 9. Reservations Banner */}
      <ReservationsPromo />
      
      {/* 10. Gift Cards Banner */}
      <GiftCardPromo />
      
      {/* 11. App Download Promo */}
      <AppDownload />
      
      {/* 12. Find a Restaurant Section */}
      <FindRestaurant />
    </div>
  );
};

export default Home;
