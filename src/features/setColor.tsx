import { KeyColor } from '../components/Keypad';

export const getKeyColor = (color: KeyColor, theme: { type: number }) => {
  let keyColor;

  switch (color) {
    case 'standard':
      keyColor =
        theme.type == 1
          ? 'bg-theme1-keys-light border-b-theme1-keys-light-shadow text-theme1-text'
          : theme.type == 2
          ? 'bg-theme2-keys-light border-b-theme2-keys-light-shadow text-theme2-text'
          : 'bg-theme3-keys-dark border-b-theme3-keys-dark-shadow text-theme3-text-yellow';
      break;
    case 'mark':
      keyColor =
        theme.type == 1
          ? 'bg-theme1-keys-blue border-b-theme1-keys-blue-shadow text-white'
          : theme.type == 2
          ? 'bg-theme2-keys-cyan border-b-theme2-keys-cyan-shadow text-white'
          : 'bg-theme3-keys-violet border-b-theme3-keys-violet-shadow text-white';
      break;
    case 'red':
      keyColor =
        'bg-theme1-keys-red border-b-theme1-keys-red-shadow text-white';
      keyColor =
        theme.type == 1
          ? 'bg-theme1-keys-red border-b-theme1-keys-red-shadow text-white'
          : theme.type == 2
          ? 'bg-theme2-keys-orange border-b-theme2-keys-orange-shadow text-white'
          : 'bg-theme3-keys-cyan border-b-theme3-keys-cyan-shadow text-theme3-text-dark';
      break;
  }

  return keyColor;
};
