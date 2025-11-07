export const calculatorQuestions = {
  step1: {
    en: 'What kind of printer do you need?',
    ka: 'რა ტიპის მოწყობილობა გჭირდებათ?'
  },
  step2: {
    en: 'Choose brand',
    ka: 'აირჩიეთ ბრენდი'
  },
  step3: {
    en: 'What kind of job do you have?',
    ka: 'რა სახის სამუშაო გაქვთ?'
  }
};

export const deviceTypes = [
  {
    value: 'printer',
    label: {
      en: 'Printer',
      ka: 'პრინტერი'
    }
  },
  {
    value: 'cutter',
    label: {
      en: 'Cutter',
      ka: 'საჭრელი'
    }
  },
  {
    value: 'binder',
    label: {
      en: 'Binder',
      ka: 'ამკინძავი'
    }
  },
  {
    value: 'laminator',
    label: {
      en: 'Laminator',
      ka: 'ლამინატორი'
    }
  }
];

export const brandOptions = {
  printer: [
    { value: 'develop', label: { en: 'Develop', ka: 'Develop' } },
    { value: 'nocai', label: { en: 'Nocai', ka: 'Nocai' } },
    { value: 'audley', label: { en: 'Audley', ka: 'Audley' } },
    { value: 'koenigBauer', label: { en: 'Koenig & Bauer', ka: 'Koenig & Bauer' } }
  ],
  cutter: [
    { value: 'iecho', label: { en: 'IECHO', ka: 'IECHO' } },
    { value: 'teneth', label: { en: 'Teneth', ka: 'Teneth' } },
    { value: 'ideal', label: { en: 'Ideal', ka: 'Ideal' } },
    { value: 'duplo', label: { en: 'Duplo', ka: 'Duplo' } }
  ],
  binder: [
    { value: 'duplo', label: { en: 'Duplo', ka: 'Duplo' } },
    { value: 'rapid', label: { en: 'Rapid', ka: 'Rapid' } },
    { value: 'recoSystems', label: { en: 'Reco Systems', ka: 'Reco Systems' } }
  ],
  laminator: [
    { value: 'recoSystems', label: { en: 'Reco Systems', ka: 'Reco Systems' } },
    { value: 'matrix', label: { en: 'Matrix', ka: 'Matrix' } }
  ]
};

export const jobTypes = [
  {
    value: 'advertising',
    label: {
      en: 'Advertising',
      ka: 'სარეკლამო'
    }
  },
  {
    value: 'photoStudio',
    label: {
      en: 'Photo Studio',
      ka: 'ფოტო სტუდია'
    }
  },
  {
    value: 'typography',
    label: {
      en: 'Typography',
      ka: 'სტამბა'
    }
  }
];

export const brandLabelMap = Object.values(brandOptions).reduce((acc, optionList) => {
  optionList.forEach(option => {
    if (!acc[option.value]) {
      acc[option.value] = option.label;
    }
  });
  return acc;
}, {});

export const deviceTypeLabelMap = deviceTypes.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

export const jobTypeLabelMap = jobTypes.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

export const getLocalizedLabel = (label, language = 'en') => {
  if (!label) {
    return '';
  }
  return label[language] || label.en || '';
};
