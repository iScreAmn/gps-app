import React from 'react';
import { audleyEco1, audleyEco2 } from '../../../assets/images';
import { audleyData } from '../../../data/audleyData';
import SpecsModelPage from '../../../components/ProductShowcase/SpecsModelPage';

const imageMap = { audleyEco1, audleyEco2 };

const AudleyModelPage = () => <SpecsModelPage data={audleyData} imageMap={imageMap} />;

export default AudleyModelPage;
