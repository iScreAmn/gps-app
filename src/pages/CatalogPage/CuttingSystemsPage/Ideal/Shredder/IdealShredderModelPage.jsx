import React from 'react';
import { shredder1, shredder2, shredder3, shredder4, shredder5, shredder6 } from '../../../../../assets/images';
import idealShredderData from '../../../../../database/brands/ideal-shredder.json';
import BrandModelPage from '../../../BrandModelPage/BrandModelPage';

const imageMap = {
  'shredder-4606-cc': shredder1,
  'shredder-2220': shredder2,
  'shredder-2240': shredder3,
  'shredder-2240-cc': shredder4,
  'shredder-2260': shredder5,
  'shredder-2260-cc': shredder6,
};

const IdealShredderModelPage = () => <BrandModelPage data={idealShredderData} imageMap={imageMap} />;

export default IdealShredderModelPage;
