import cn from 'classnames';
import { useStateMachine } from 'little-state-machine';
import {
  setFirstValue,
  setOperator,
  setResult,
  setSecondValue,
} from '../actions';
import { keys } from '../data';

import { getKeyColor } from '../features/setColor';

import { calculate } from '../features/calculator';

export type KeyColor = 'standard' | 'mark' | 'red';

export interface KeyProps {
  label: number | string;
  color: KeyColor;
  action?: string;
  span?: boolean;
}

const Keypad = () => {
  const { state } = useStateMachine();
  const { theme } = state;

  return (
    <div
      className={cn(
        'mt-5 h-full rounded-xl p-5 grid grid-cols-4 grid-rows-5 gap-4',
        theme.type == 1
          ? 'bg-theme1-keypad'
          : theme.type == 2
          ? 'bg-theme2-keypad'
          : 'bg-theme3-screen'
      )}
    >
      {keys.map((key, idx) => (
        <Key key={idx} {...key} />
      ))}
    </div>
  );
};

export default Keypad;

const Key = ({ label, color, span, action }: KeyProps) => {
  const { state, actions } = useStateMachine({
    setResult,
    setOperator,
    setFirstValue,
    setSecondValue,
  });

  const { calculator, theme } = state;

  const onKeyClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { dataset, textContent: keyContent } = e.target as HTMLButtonElement;
    const { action } = dataset;

    if (action == 'number') {
      if (calculator.result) {
        actions.setFirstValue(calculator.secondValue);
        actions.setSecondValue(keyContent!);
        actions.setResult('');
        return;
      }
      if (calculator.operator) {
        if (calculator.secondValue == '0') {
          actions.setSecondValue(keyContent!);
          return;
        }
        actions.setSecondValue(calculator.secondValue + keyContent);
        return;
      }
      if (calculator.firstValue == '0') {
        actions.setFirstValue(keyContent!);
        return;
      }
      actions.setFirstValue(calculator.firstValue + keyContent);
    }

    if (action == 'decimal') {
      if (calculator.result) {
        actions.setFirstValue(calculator.secondValue);
        actions.setSecondValue('0.');
        actions.setResult('');
        return;
      }
      if (!calculator.secondValue) {
        if (calculator.operator) {
          actions.setSecondValue('0.');
          return;
        }
        if (calculator.firstValue.includes('.')) return;
        actions.setFirstValue(calculator.firstValue + '.');
        return;
      }
      if (calculator.secondValue.includes('.')) return;
      actions.setSecondValue(calculator.secondValue + '.');
    }

    if (
      action == 'add' ||
      action == 'subtract' ||
      action == 'multiply' ||
      action == 'divide'
    ) {
      actions.setResult('');
      if (calculator.operator) {
        if (calculator.secondValue && !calculator.result) {
          const result = calculate(
            calculator.firstValue,
            calculator.operator,
            calculator.secondValue
          );
          actions.setFirstValue(result);
        }
        actions.setSecondValue('');
        actions.setOperator(action);
        return;
      }
      actions.setOperator(action);
    }

    if (action == 'calculate') {
      if (!calculator.operator) return;
      const result = calculate(
        calculator.firstValue,
        calculator.operator,
        calculator.secondValue
      );
      actions.setResult(result);
      actions.setFirstValue(result);
    }

    if (action == 'delete') {
      if (!calculator.secondValue) {
        actions.setFirstValue(
          calculator.firstValue.slice(0, calculator.firstValue.length - 1) ||
            '0'
        );
        return;
      }
      actions.setSecondValue(
        calculator.secondValue.slice(0, calculator.secondValue.length - 1) ||
          '0'
      );
    }

    if (action == 'reset') {
      actions.setFirstValue('0');
      actions.setOperator('');
      actions.setSecondValue('');
      actions.setResult('');
    }
  };

  return (
    <button
      className={cn(
        'rounded-md text-2xl leading-[0] border-b-4 active:translate-y-[2px] active:border-b-0',
        getKeyColor(color, theme),
        span ? 'col-span-2' : 'col-span-1',
        calculator.operator == action && !calculator.secondValue
          ? 'opacity-50'
          : 'opacity-100'
      )}
      data-action={action ?? 'number'}
      onClick={onKeyClick}
    >
      {label}
    </button>
  );
};
