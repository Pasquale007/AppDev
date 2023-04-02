import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsItem from './SettingsItem';
import { Text } from 'react-native';

describe('SettingsItem', () => {
    it('should render the label and content', () => {
        const label = 'Label';
        const content = <Text>Content</Text>;
        const { getByText } = render(<SettingsItem label={label} content={content} icon={"notifications"} />);
        expect(getByText(label)).toBeDefined();
        expect(getByText('Content')).toBeDefined();
    });

    it('should render the icon', () => {
        const label = 'Label';
        const content = <Text>Content</Text>;
        const { getByTestId } = render(<SettingsItem label={label} content={content} icon={"notifications"} />);
        expect(getByTestId('ion-icon')).toBeDefined();
    });
});
