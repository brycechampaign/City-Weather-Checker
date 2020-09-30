import React from 'react';
import SavedList from '../client/components/SavedList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cities, weatherData } from './testData';

describe('SavedList Component', () => {
  let wrapper;
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    wrapper = shallow(
      <SavedList locations={cities} weatherData={weatherData} />
    );
  });

  it('should render the correct amount of locations', () => {
    expect(wrapper.find('Location')).toHaveLength(5);
  });

  it('should display locations in alphabetical order', () => {
    const cities = wrapper.find('Location');

    expect(cities.at(0).props().name).toBe('Harrisburg');
    expect(cities.at(1).props().name).toBe('Jersey City');
    expect(cities.at(2).props().name).toBe('London');
    expect(cities.at(3).props().name).toBe('New York City');
    expect(cities.at(4).props().name).toBe('Paris');
  });

  it('should display favorites first', () => {
    expect(wrapper.find('Location').at(0).props().name).toBe('Harrisburg');

    const newCities = JSON.parse(JSON.stringify(cities));
    newCities[4].isFavorite = true;

    wrapper.setProps({ locations: newCities, weatherData });

    expect(wrapper.find('Location').first().props().name).toBe('Jersey City');
  });

  it('should display favorites in alphabetical order', () => {
    const newCities = JSON.parse(JSON.stringify(cities));
    newCities[2].isFavorite = true;
    newCities[4].isFavorite = true;

    wrapper.setProps({ locations: newCities, weatherData });

    const list = wrapper.find('Location');
    expect(list.first().props().name).toBe('Jersey City');
    expect(list.at(1).props().name).toBe('Paris');
  });
});
