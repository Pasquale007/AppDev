import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import AlertCard from "./AlertCard";

describe("AlertCard", () => {
    const data = {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Nürnberg", arrival: "Rom" },
        maxPrice: 1000000.5667,
        index: 1,
        cardArr: [],
    };

    it("should render date", () => {
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
        />);
        const date = getByTestId("date");
        expect(date).toBeDefined();
    });

    it("should render departure location text", () => {
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
        />);
        const departureText = getByTestId("departureText");
        expect(departureText).toBeDefined();
    });

    it("should render arrival location text", () => {
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
        />);
        const arrivalText = getByTestId("arrivalText");
        expect(arrivalText).toBeDefined();
    });

    it("should render max price text", () => {
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
        />);
        const priceText = getByTestId("priceText");
        expect(priceText).toBeDefined();
    })

    it("should render switch button", () => {
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
        />);
        const switchButton = getByTestId("switchButton");
        expect(switchButton).toBeDefined();
    });

    it("should call closeCard when swiped", () => {
        const mockCloseCard = jest.fn();
        const { getByTestId } = render(<AlertCard date={data.date}
            locations={data.locations} maxPrice={data.maxPrice}
            index={data.index} cardArr={data.cardArr}
            closeCard={mockCloseCard}
        />);

        const alertCard = getByTestId("alertCard");
        fireEvent(alertCard, "onSwipeableOpen");
        expect(mockCloseCard).toHaveBeenCalledTimes(1);
    });
})