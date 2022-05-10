import { GameCarousel } from 'components/GameCarousel';
import React from 'react';

export const RightBar = ({ chosenCategory }: any) => {
  return (
    <div>
      <GameCarousel chosenCategory={chosenCategory}></GameCarousel>
    </div>
  );
};
