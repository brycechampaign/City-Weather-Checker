import React from 'react';
import ResultsList from '../client/components/ResultsList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cities, weatherData } from './testData';

describe('ResultsList Component', () => {
  let wrapper;
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    wrapper = shallow(
      <ResultsList
        results={cities}
        weatherData={weatherData}
        locations={[
          { id: 10904, isFavorite: true },
          { id: 45633, isFavorite: false },
          { id: 69536, isFavorite: false },
          { id: 113756, isFavorite: false },
          { id: 115509, isFavorite: false },
        ]}
      />
    );
  });

  it('should render the correct amount of Locations', () => {
    expect(wrapper.find('Location').length).toBe(5);
  });

  it('should correctly set isFavorite', () => {
    expect(wrapper.find('Location').first().props().isFavorite).toBe(true);
    expect(wrapper.find('Location').at(1).props().isFavorite).toBe(false);
    expect(wrapper.find('Location').at(2).props().isFavorite).toBe(false);
    expect(wrapper.find('Location').at(3).props().isFavorite).toBe(false);
    expect(wrapper.find('Location').at(4).props().isFavorite).toBe(false);
  });
});
