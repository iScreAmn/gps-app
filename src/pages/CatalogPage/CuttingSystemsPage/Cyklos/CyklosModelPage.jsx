import React from 'react';
import { cyklos1, cyklos2, cyklos3, cyklos4, cyklos5, cyklos6 } from '../../../../assets/images';
import cyklosData from '../../../../database/brands/cyklos.json';
import BrandModelPage from '../../BrandModelPage/BrandModelPage';

const imageMap = {
  'cyklos-ksl-435': cyklos1,
  'cyklos-ksl-320': cyklos2,
  'cyklos-gpm-320': cyklos3,
  'cyklos-gpm-315': cyklos4,
  'cyklos-ucr-9': cyklos5,
  'cyklos-ccr-40': cyklos6,
};

const CyklosModelPage = () => <BrandModelPage data={cyklosData} imageMap={imageMap} />;

export default CyklosModelPage;
