import React from 'react';
import { laminator1, laminator2, laminator3, laminator4, laminator11, laminator12 } from '../../../../assets/images';
import recosystemsData from '../../../../database/brands/recosystems.json';
import BrandModelPage from '../../BrandModelPage/BrandModelPage';

const imageMap = {
  'rl-39s': laminator1,
  'rl-68s': laminator2,
  'rl-69s': laminator3,
  'rl-106': laminator4,
  'reco-lam-321-a3': laminator11,
  'royal-sovereign-es-400': laminator12,
};

const RecoSystemsModelPage = () => <BrandModelPage data={recosystemsData} imageMap={imageMap} />;

export default RecoSystemsModelPage;
