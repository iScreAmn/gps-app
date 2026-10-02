import React from 'react';
import { guillotine1, guillotine2, guillotine3, guillotine4, guillotine5, guillotine6, guillotine7, guillotine8, guillotine9, guillotine10, guillotine11, guillotine12, guillotine13, guillotine14 } from '../../../../../assets/images';
import idealGuillotineData from '../../../../../database/brands/ideal-guillotine.json';
import BrandModelPage from '../../../BrandModelPage/BrandModelPage';

const imageMap = {
  'ideal-4300': guillotine1,
  'ideal-4305': guillotine2,
  'ideal-4315': guillotine3,
  'ideal-4350': guillotine4,
  'ideal-4705': guillotine5,
  'ideal-4815': guillotine6,
  'ideal-4850': guillotine7,
  'ideal-4855': guillotine14,
  'ideal-4860': guillotine8,
  'ideal-5255': guillotine9,
  'ideal-5260': guillotine10,
  'ideal-6655': guillotine11,
  'ideal-6660': guillotine12,
  'ideal-7260': guillotine13,
};

const IdealGuillotineModelPage = () => <BrandModelPage data={idealGuillotineData} imageMap={imageMap} />;

export default IdealGuillotineModelPage;
