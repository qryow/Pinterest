import { FC, ReactNode, useMemo } from "react"
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const containerElement = useMemo<Element | null>(
    () => document.getElementById('modal-container'),
    []
  );
  if (!containerElement) {
    throw new Error("Modal container element not found");
  }
  return createPortal(children, containerElement)
}