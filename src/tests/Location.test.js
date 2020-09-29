import React from 'react';
import Location from '../client/components/Location';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartReg,
  faTrashAlt as faTrashReg,
} from '@fortawesome/free-regular-svg-icons';

describe('Location Component', () => {
  let wrapper;
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    wrapper = shallow(<Location />);
    wrapper.setProps({
      isFavorite: false,
      name: 'Tokyo',
      temperature: 22,
      region: 'Kanto',
      country: 'Japan',
      countryCode: 'JP',
      id: 1,
    });
  });

  it('should display the location name', () => {
    const name = wrapper.find('.location-top-text');
    expect(name.text()).toBe('Tokyo');
  });

  it('should display the country code instead of the country', () => {
    const subtitle = wrapper.find('.location-bottom-text');
    expect(subtitle.text()).toBe('Kanto, JP');
  });

  it('should display the country when no region is provided', () => {
    wrapper.setProps({ region: undefined });
    const subtitle = wrapper.find('.location-bottom-text');

    expect(subtitle.text()).toBe('Japan');
  });

  it('should display a spinner when no temperature is provided', () => {
    wrapper.setProps({ temperature: null });
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('should replace spinner with temperature when a temperature is provided', () => {
    wrapper.setProps({ temperature: null });
    wrapper.setProps({ temperature: 22 });
    const temperature = wrapper.find('.location-temperature');

    expect(temperature.text()).toBe('22 °C');
    expect(wrapper.find('Spinner').length).toBe(0);
  });

  it('should register hovering over favorite icon', () => {
    // since I used hooks with functional components rather than class
    // components, I can not directly check the value of state variables
    expect(wrapper.find('.favorite-icon').prop('icon')).toEqual(faHeartReg);
    const favoriteIcon = wrapper.find('.favorite-icon-container');

    favoriteIcon.simulate('mouseenter');
    expect(wrapper.find('.favorite-icon').prop('icon')).toEqual(faHeart);

    favoriteIcon.simulate('mouseleave');
    expect(wrapper.find('.favorite-icon').prop('icon')).toEqual(faHeartReg);
  });
});
