import React from 'react';
import { nocai1, nocai5 } from '../../../assets/images';
import { nocaiData } from '../../../data/nocaiData';
import SpecsModelPage from '../../../components/ProductShowcase/SpecsModelPage';

const imageMap = { nocai1, nocai5 };

const NocaiModelPage = () => <SpecsModelPage data={nocaiData} imageMap={imageMap} />;

export default NocaiModelPage;
