import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="in-ch" name="인쵸리" />);
    expect(utils.container).toMatchSnapshot();
  });
  it('shows the props correctly', () => {
    const utils = render(<Profile username="in-ch" name="인쵸리" />);
    utils.getByText('in-ch');
    utils.getByText('(인쵸리)'); 
    utils.getByText(/인/);
  });
});