import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import AlertCard from "./AlertCard";

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn().mockReturnValue(true), // Mockt den Rückgabewert von useIsFocused
}));

describe("AlertCard", () => {
    const onDeleteMock = jest.fn();
    const closeCardMock = jest.fn();
    const setIsEnabledMock = jest.fn();
    const setIsActiveMock = jest.fn();
    const data = {
        alert: {
            id: 1, startDate: "18.08.2023", endDate: "12.12.2023", minLength: 3, maxLength: 4,
            origin: "Berlin", destination: "London", maxPrice: 120, isActive: true
        },
        cardArr: [],
        onDelete: onDeleteMock,
        closeCard: closeCardMock,
        setIsEnabled: setIsEnabledMock,
        setIsActive: setIsActiveMock,
    };

    it("should render date and duration", () => {
        const { getByTestId } = render(<AlertCard {...data} />);
        const date = getByTestId("date");
        const duration = getByTestId("duration");
        expect(date).toBeDefined();
        expect(duration).toBeDefined();
    });

    it("should render departure location text", () => {
        const { getByTestId } = render(<AlertCard {...data} />);
        const departureText = getByTestId("departureText");
        expect(departureText).toBeDefined();
    });

    it("should render arrival location text", () => {
        const { getByTestId } = render(<AlertCard {...data} />);
        const arrivalText = getByTestId("arrivalText");
        expect(arrivalText).toBeDefined();
    });

    it("should render max price text", () => {
        const { getByTestId } = render(<AlertCard {...data} />);
        const priceText = getByTestId("priceText");
        expect(priceText).toBeDefined();
    })

    it("should render switch button", () => {
        const { getByTestId } = render(<AlertCard {...data} />);
        const switchButton = getByTestId("switchButton");
        expect(switchButton).toBeDefined();
    });
})