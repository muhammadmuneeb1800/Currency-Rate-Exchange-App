export interface CardProps {
  to: string;
  from: string;
}

export interface initialStateType {
  names: string[];
  rates: string[];
  resultName?: string[];
  resultRates?: string[];
  dataData: { name: string; currency: string }[];
}

export interface DropdownItem {
  code: string;
  name: string;
}

export interface SearchableDropdownProps {
  items: DropdownItem[];
  defaultSelected: DropdownItem;
}

export interface Country {
  name: string;
  currency: string;
}

export interface ButtonProps {
  link?: string;
  text?: string;
  pad?: 4 | 8 | 16 | 24 | string;
}
