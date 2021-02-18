import React from "react";
import {act} from 'react-test-renderer';
import {ProfileStatus} from "./ProfileStatus";
import { create } from "react-test-renderer";


describe("test StatusProfile component", () => {

    test("after creation input shouldn`t display", () => {
        const mockCallback = jest.fn();

        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;
        expect(() => {
            const input = testInstance.findByType('input');
        }).toThrow();
    });

    test("span must exist", () => {
        const mockCallback = jest.fn();

        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;
        const span = testInstance.findByType('span');
        expect(span).not.toBe(null);
    });

    test("display span with correct status", () => {
        const mockCallback = jest.fn();

        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;
        const span = testInstance.findByType('span');

        expect(span.children[1]).toBe('Welcome');
    });

    test("when click on span must display input", () => {
        const mockCallback = jest.fn();

        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;
        const span = testInstance.findByType('span');
        act(() => {
            /* fire events that update state */
            span.props.onDoubleClick();
        });

        const input = testInstance.findByType('input');
        expect(input).not.toBe(null);
    });

    test("input value must have status message", () => {
        const mockCallback = jest.fn();

        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;
        const span = testInstance.findByType('span');
        act(() => {
            /* fire events that update state */
            span.props.onDoubleClick();
        });

        const input = testInstance.findByType('input');
        expect(input.props.value).toBe('Welcome');
    });

    test("after deactivateEitMode must call callback", () => {
        const mockCallback = jest.fn();
        const testRenderer = create(<ProfileStatus status='Welcome' updateProfileStatus={mockCallback} />);
        const testInstance = testRenderer.root;

        const span = testInstance.findByType('span');

        act(() => {
            /* fire events that update state */
            span.props.onDoubleClick();
        });

        const input = testInstance.findByType('input');

        act(() => {
            /* fire events that update state */
            input.props.onBlur();
        });

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
