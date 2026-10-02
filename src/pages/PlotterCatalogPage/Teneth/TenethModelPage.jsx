import React from 'react';
import { teneth1, teneth2 } from '../../../assets/images';
import { tenethData } from '../../../data/tenethData';
import SpecsModelPage from '../../../components/ProductShowcase/SpecsModelPage';

const imageMap = { teneth1, teneth2 };

const TenethModelPage = () => <SpecsModelPage data={tenethData} imageMap={imageMap} />;

export default TenethModelPage;
