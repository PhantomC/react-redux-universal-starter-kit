export function profile(req, res) {
  const restrictedData = {
    someData: 'Restricted value',
  };
  return res.json(restrictedData);
}