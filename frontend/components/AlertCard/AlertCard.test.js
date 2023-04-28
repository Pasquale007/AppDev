import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import AlertCard from "./AlertCard";

describe("AlertCard", () => {
    const onDeleteMock = jest.fn();
    const closeCardMock = jest.fn();
    const setIsEnabledMock = jest.fn();
    const setIsActiveMock = jest.fn();
    const data = {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Nürnberg", arrival: "Rom" },
        duration: {start: 7, end: 7},
        maxPrice: 1000000.5667,
        index: 1,
        cardArr: [],
        id: 1,
        onDelete: onDeleteMock,
        closeCard: closeCardMock,
        setIsEnabled: setIsEnabledMock,
        setIsActive: setIsActiveMock,
    };

    it("should render date and duration", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const date = getByTestId("date");
        const duration = getByTestId("duration");
        expect(date).toBeDefined();
        expect(duration).toBeDefined();
    });

    it("should render departure location text", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const departureText = getByTestId("departureText");
        expect(departureText).toBeDefined();
    });

    it("should render arrival location text", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const arrivalText = getByTestId("arrivalText");
        expect(arrivalText).toBeDefined();
    });

    it("should render max price text", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const priceText = getByTestId("priceText");
        expect(priceText).toBeDefined();
    })

    it("should render switch button", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const switchButton = getByTestId("switchButton");
        expect(switchButton).toBeDefined();
    });

    it('should render delete button', () => {
        const { getByTestId } = render(<AlertCard {...data}/>)
        const deleteButton = getByTestId("deleteButton");
        expect(deleteButton).toBeTruthy();
    });

    it("should call closeCard when swiped", () => {
        const { getByTestId } = render(<AlertCard {...data}/>);
        const alertCard = getByTestId("alertCard");
        fireEvent(alertCard, "onSwipeableOpen");
        expect(closeCardMock).toHaveBeenCalledTimes(1);
    });

    it("should call onDelete when delete button is pressed", () => {
        const {getByTestId} = render(<AlertCard {...data}/>);
        const deleteButton = getByTestId("deleteButton");
        fireEvent.press(deleteButton);
        expect(onDeleteMock).toHaveBeenCalledWith(data.id);
    })
})