export const COLOR_THEMES: Record<string, string> = {
  Green: '#277C78',
  Yellow: '#F2CDAC',
  Cyan: '#82C9D7',
  Navy: '#626070',
  Red: '#C94736',
  Purple: '#826CB0',
  Turquoise: '#597C7C',
  Brown: '#93674F',
  Magenta: '#934F6F',
  Blue: '#3F82B2',
  'Navy Grey': '#97A0AC',
  'Army Green': '#7F9161',
  Pink: '#AF81BA',
  Gold: '#CAB361',
  Orange: '#BE6C49',
};

export const getThemeNameFromHex = (hex: string): string | undefined => {
  return Object.entries(COLOR_THEMES).find(([_, value]) => value === hex)?.[0];
};

export const getHexFromThemeName = (themeName: string): string | undefined => {
  return COLOR_THEMES[themeName];
};

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
] as const;

export const TRANSACTION_CATEGORIES = [
  'All Transactions',
  'Entertainment',
  'Bills',
  'Dining Out',
  'Personal Care',
  'General',
  'Groceries',
  'Transportation',
  'Lifestyle',
  'Shopping',
  'Education',
] as const;

export const ITEMS_PER_PAGE = 10;
