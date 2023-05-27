import { ReactNode } from "react";

import { GenericModalProps, GenericModal } from "./index";

export class ModalBuilder {
    private props;

    constructor() {
        this.props = {} as GenericModalProps;
    }

    withTitle(title: string) {
        this.props.modalTitle = title;
        return this;
    }

    withIcon(icon: ReactNode) {
        this.props.modalIcon = icon;
        return this;
    }

    withColor(color: string) {
        this.props.modalColor = color;
        return this;
    }

    withCloseModalText(text: string) {
        this.props.closeModalText = text;
        return this;
    }

    withCloseModalButtonStyle(style: "filled" | "transparent") {
        this.props.closeModalButtonStyle = style;
        return this;
    }

    withActionButtonText(text: string) {
        this.props.actionButtonText = text;
        return this;
    }

    withIsOpened(isOpened: boolean) {
        this.props.isOpened = isOpened;
        return this;
    }

    withOnCloseModalFunction(fn: () => void) {
        this.props.onCloseModal = fn;
        return this;
    }

    withOnActionFunction(fn: () => void) {
        this.props.onAction = fn;
        return this;
    }

    withChildren(children: ReactNode) {
        this.props.children = children;
        return this;
    }

    build() {
        return <GenericModal {...this.props} />;
    }
}