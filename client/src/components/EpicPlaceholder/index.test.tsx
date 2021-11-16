/**
 * @jest-environment jsdom
 */
/* eslint-disable no-console */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EpicPlaceholder from './';

describe('<EpicPlaceholder />', () => {
  it('renders on screen', () => {
    const { getByTitle } = render(
      <EpicPlaceholder
        visible
        handleSubmit={(epicName) => {
          console.log(epicName);
        }}
      />,
    );
    const component = getByTitle(/input/);
    expect(component).toBeTruthy();
  });

  it('renders input element', () => {
    const { container } = render(
      <EpicPlaceholder
        visible
        handleSubmit={(epicName) => {
          console.log(epicName);
        }}
      />,
    );
    const inputElem = container.querySelector('input');
    if (!inputElem) throw new Error(`there's no input element under this component`);
  });

  it('not renders input element when visible property is set to false', () => {
    const { container } = render(
      <EpicPlaceholder
        visible={false}
        handleSubmit={(epicName) => {
          console.log(epicName);
        }}
      />,
    );
    const inputElem = container.querySelector('input');
    if (inputElem) throw new Error(`there should be no input element`);
  });

  it('gets input from user', () => {
    const { container } = render(
      <EpicPlaceholder
        visible
        handleSubmit={(epicName) => {
          console.log(epicName);
        }}
      />,
    );
    const inputElem = container.querySelector('input');
    if (!inputElem) throw new Error(`there's no input element under this component`);
    fireEvent.change(inputElem, { target: { value: 'epic test' } });
    expect(inputElem.value).toBe('epic test');
  });
});
