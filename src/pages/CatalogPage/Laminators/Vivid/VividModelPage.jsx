import React from 'react';
import { laminator5, laminator6, laminator7, laminator8, laminator9, laminator10 } from '../../../../assets/images';
import vividData from '../../../../database/brands/vivid.json';
import BrandModelPage from '../../BrandModelPage/BrandModelPage';

const imageMap = {
  'matrix-duo-md-460': laminator5,
  'matrix-duo-md-650': laminator5,
  'matrix-easymount-1200-double-hot': laminator6,
  'matrix-mx-530dp': laminator7,
  'matrix-omni-flow-370': laminator8,
  'matrix-omni-flow-460': laminator9,
  'matrix-take-up-unit': laminator10,
};

const VividModelPage = () => <BrandModelPage data={vividData} imageMap={imageMap} />;

export default VividModelPage;
