import React from 'react';
import { duplo1, duplo2, duplo3, duplo4, duplo5, duplo6, duplo7, duplo8, duplo9, duplo10 } from '../../../../assets/images';
import duploData from '../../../../database/brands/duplo.json';
import BrandModelPage from '../../BrandModelPage/BrandModelPage';

const imageMap = {
  'duplo-df-1200': duplo1,
  'duplo-df-980': duplo2,
  'duplo-df-970': duplo3,
  'duplo-dc-646': duplo4,
  'duplo-dpb-500': duplo5,
  'duplo-kb-4000': duplo6,
  'duplo-dsc-10-60il': duplo7,
  'duplo-dsc-10-20': duplo8,
  'duplo-dc-446': duplo9,
  'duplo-dfc-101': duplo10,
};

const DuploModelPage = () => <BrandModelPage data={duploData} imageMap={imageMap} />;

export default DuploModelPage;
