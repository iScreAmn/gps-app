// Plain-text "Label: value" lines → spec pairs; lines without a colon are features
export const splitLabelledLines = (lines = []) => {
  const specs = [];
  const features = [];
  lines.forEach((line) => {
    const colon = line.indexOf(':');
    if (colon > 0) specs.push([line.slice(0, colon).trim(), line.slice(colon + 1).trim()]);
    else features.push(line.trim());
  });
  return { specs, features };
};
