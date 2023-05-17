import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import AlertCardRightBg from "./AlertCardRightBg";
import {Animated} from "react-native";

describe("AlertCardRightBg", () => {
    const data = {
        dragX: new Animated.Value(0),
    };

    it('should render delete Icon and Text', () => {
        const { getByTestId } = render(<AlertCardRightBg {...data}/>)
        const deleteText = getByTestId("deleteText");
        const deleteIcon = getByTestId("deleteIcon");
        expect(deleteText).toBeTruthy();
        expect(deleteIcon).toBeTruthy();
    });

    it('should apply the correct scale transformation', () => {
        const dragX = new Animated.Value(-100);
        const { getByTestId } = render(<AlertCardRightBg dragX={dragX} />);
        const deleteText = getByTestId('deleteText');
        const deleteIcon = getByTestId('deleteIcon');
        expect(deleteText.props.style.transform[0].scale).toBeCloseTo(0.8);
        expect(deleteIcon.props.style.transform[0].scale).toBeCloseTo(0.8);
    });
})