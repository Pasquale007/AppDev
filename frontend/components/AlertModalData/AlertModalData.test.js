import React from 'react';
import { render } from '@testing-library/react-native';
import AlertModalData from './AlertModalData';

describe('AlertModalData', () => {
    const testHeadline = 'Test Headline';
    const testData = 'Test Data';

    it('should render without crashing', () => {
        render(<AlertModalData />);
    });

    it('should render headline and data when passed as props', () => {
        const { getByTestId } = render(<AlertModalData headline={testHeadline} data={testData} />);
        const headline = getByTestId("dataHeadline");
        const text = getByTestId("dataText");
        expect(headline).toBeDefined();
        expect(text).toBeDefined();
    });

    it('should render only data when headline is not passed as props', () => {
        const { queryByText } = render(<AlertModalData data={testData} />);
        const headline = queryByText(testHeadline);
        const data = queryByText(testData);
        expect(headline).toBeNull();
        expect(data).toBeDefined();
    });

    it('should render only headline when data is not passed as props', () => {
        const { getByText, queryByText } = render(<AlertModalData headline={testHeadline} />);
        const headline = getByText(testHeadline);
        const data = queryByText(testData);
        expect(headline).toBeDefined();
        expect(data).toBeNull();
    });
});