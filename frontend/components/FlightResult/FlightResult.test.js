import { render } from '@testing-library/react-native';
import FlightResult from './FlightResult';

const start = {
    airport: 'Airport A',
    date: '2023-05-02',
    time: '10:00'
};

const destination = {
    airport: 'Airport B',
    date: '2023-05-01',
    time: '12:00'
};
describe('FlightResult component', () => {
    test('renders Info components with correct props', () => {
        const { getByText } = render(<FlightResult start={start} destination={destination} />);
        expect(getByText(start.airport)).toBeTruthy();
        expect(getByText(start.date)).toBeTruthy();
        expect(getByText(start.time)).toBeTruthy();
        expect(getByText(destination.airport)).toBeTruthy();
        expect(getByText(destination.date)).toBeTruthy();
        expect(getByText(destination.time)).toBeTruthy();
    });
});

