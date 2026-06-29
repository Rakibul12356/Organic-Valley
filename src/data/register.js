export const REGISTER_ROLE_OPTIONS = [
  {
    value: 'customer',
    label: 'Customer',
    description: 'Buy fresh produce',
    icon: 'fa-user',
  },
  {
    value: 'farmer',
    label: 'Farmer',
    description: 'Sell your produce',
    icon: 'fa-tractor',
  },
];

export const FARM_SPECIALIZATIONS = [
  { value: '', label: 'Select specialization' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'grains', label: 'Grains' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'mixed', label: 'Mixed Farming' },
];

export const FARM_SIZE_UNITS = [
  { value: 'acres', label: 'Acres' },
  { value: 'hectares', label: 'Hectares' },
  { value: 'sq_ft', label: 'Sq Ft' },
  { value: 'sq_m', label: 'Sq M' },
];

export const DEFAULT_AVATAR_PREVIEW =
  "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3ePhoto%3c/text%3e%3c/svg%3e";
