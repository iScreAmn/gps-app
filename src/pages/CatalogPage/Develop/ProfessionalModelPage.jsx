import React from 'react';
import { developPro1, developPro2, developPro3, developPro4 } from '../../../assets/images';
import { professionalData } from '../../../data/professionalData';
import SpecsModelPage from '../../../components/ProductShowcase/SpecsModelPage';

const imageMap = { developPro1, developPro2, developPro3, developPro4 };

const ProfessionalModelPage = () => <SpecsModelPage data={{ ...professionalData, displayName: 'Develop' }} imageMap={imageMap} />;

export default ProfessionalModelPage;
