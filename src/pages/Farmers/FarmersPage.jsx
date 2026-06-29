import { useState } from 'react';
import { Container } from '@components/common';
import { FARMERS_LIST } from '@data/farmers';
import {
  FarmersPageHeader,
  FarmersStats,
  FarmerCard,
  JoinFarmerCTA,
} from '@components/farmers';

const INITIAL_VISIBLE = 6;

const FarmersPage = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleFarmers = FARMERS_LIST.slice(0, visibleCount);
  const hasMore = visibleCount < FARMERS_LIST.length;

  return (
    <>
      <FarmersPageHeader />

      <Container className="py-16">
        <FarmersStats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount(FARMERS_LIST.length)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition"
            >
              Load More Farmers
            </button>
          </div>
        )}
      </Container>

      <JoinFarmerCTA />
    </>
  );
};

export default FarmersPage;
