import { ReactNode } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.append(wrapperElement);
  return wrapperElement;
};

const ReactPortal = ({
  children,
  wrapperId = "react-portal",
}: {
  children: ReactNode;
  wrapperId?: string;
}) => {
  let el = document.getElementById(wrapperId);
  if (!el) el = createWrapperAndAppendToBody(wrapperId);
  return createPortal(children, el);
};

export default ReactPortal;
