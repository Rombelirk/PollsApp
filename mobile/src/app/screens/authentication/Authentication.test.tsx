import React from 'react';
import Authentication from './Authentication'
import renderer from 'react-test-renderer';

describe('<Authentication />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Authentication />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});