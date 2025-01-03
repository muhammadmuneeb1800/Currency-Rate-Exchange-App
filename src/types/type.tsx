export interface CardProps {
  from: string;
}

export interface TypeOfArray {
  names: string[];
  rates: string[];
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
