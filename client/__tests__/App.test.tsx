import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import toJson from 'enzyme-to-json';

import App from '../App';

describe('<App />', () => {
    it('Renders a default greeting', () => {
        const wrapper = shallow(<App history={createMemoryHistory()} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Renders a personalised greeting', () => {
        const wrapper = shallow(<App name="Dan" history={createMemoryHistory()} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});

