import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import AlertCardLeftBg from "./AlertCardLeftBg";
import {Animated} from "react-native";

describe("AlertCardLeftBg", () => {
    const onSearchMock = jest.fn();
    const data = {
        dragX: new Animated.Value(0),
        id: 1,
        onSearch: onSearchMock,
    };

    it('should render search Icon and Text', () => {
        const { getByTestId } = render(<AlertCardLeftBg {...data}/>)
        const searchText = getByTestId("searchText");
        const searchIcon = getByTestId("searchIcon");
        expect(searchText).toBeTruthy();
        expect(searchIcon).toBeTruthy();
    });

    it('should apply the correct scale transformation', () => {
        const dragX = new Animated.Value(80);
        const { getByTestId } = render(<AlertCardLeftBg dragX={dragX} />);
        const searchText = getByTestId('searchText');
        const searchIcon = getByTestId('searchIcon');
        expect(searchText.props.style.transform[0].scale).toBeCloseTo(0.8);
        expect(searchIcon.props.style.transform[0].scale).toBeCloseTo(0.8);
    });

    it('should call onSearch when pressed', () => {
        const { getByTestId } = render(<AlertCardLeftBg {...data} />);

        const searchButton = getByTestId('searchIcon');
        fireEvent.press(searchButton);

        expect(onSearchMock).toHaveBeenCalledWith(data.id);
    });
})