import React from 'react';
import { rapid1, rapid2 } from '../../../../assets/images';
import rapidData from '../../../../database/brands/rapid.json';
import BrandModelPage from '../../BrandModelPage/BrandModelPage';

const imageMap = {
  'rapid-106e': rapid1,
  'rapid-r2-106e': rapid2,
};

const RapidModelPage = () => <BrandModelPage data={rapidData} imageMap={imageMap} />;

export default RapidModelPage;
