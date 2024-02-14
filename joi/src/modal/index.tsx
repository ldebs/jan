import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import * as ModalPrimitive from "@radix-ui/react-dialog";

import "./styles.scss";

const Modal = ModalPrimitive.Root;

const ModalTrigger = ModalPrimitive.Trigger;

const ModalPortal = ModalPrimitive.Portal;

const ModalClose = ModalPrimitive.Close;

const ModalOverlay = forwardRef<
  ElementRef<typeof ModalPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={twMerge("modal-backdrop", className)}
    {...props}
  />
));

const ModalContent = forwardRef<
  ElementRef<typeof ModalPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      ref={ref}
      className={twMerge(" modal-content", className)}
      {...props}
    >
      {children}
      <ModalPrimitive.Close className="modal-close">
        <X size={20} />
      </ModalPrimitive.Close>
    </ModalPrimitive.Content>
  </ModalPortal>
));

export { Modal, ModalClose, ModalTrigger, ModalContent };
