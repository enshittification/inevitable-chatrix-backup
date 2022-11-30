import { useBlockProps } from "@wordpress/block-editor";
import { ResizableBox } from "@wordpress/components";
import { WPElement } from '@wordpress/element';
import './editor.scss';
import IFrame from "./iframe";
import InspectorControls from "./inspector/InspectorControls";

type Height = {
    value: number
    unit: string
}

export default function Edit({ attributes, setAttributes }): WPElement {
    const height: Height = attributes.height;

    const heightWithUnit =
        height.value && height.unit
            ? `${height.value}${height.unit}`
            : '';

    return (
        <>
            <InspectorControls attributes={attributes} setAttributes={setAttributes}/>
            <div {...useBlockProps()}>
                <ResizableBox
                    size={{
                        width: "100%",
                        height: heightWithUnit,
                    }}
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(_event, _direction, elt) => {
                        setAttributes({ height: { value: elt.clientHeight, unit: "px" } });
                    }}
                >
                    <IFrame props={{ height: heightWithUnit, focusable: true }} attributes={attributes}/>
                </ResizableBox>
            </div>
        </>
    );
}
