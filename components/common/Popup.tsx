import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function Popup(props: any) {
    const closeModal = () => {
        props.setOpen(false);
    };
    return(
        <>
        {props.isOpen ? (
            <section className="modal__bg">
              <div className="modal__align">
                <div className="modal__content bg-gray-900">
                  <IoCloseOutline
                    className="modal__close"
                    arial-label="Close modal"
                    onClick={closeModal}
                  />
                  {props.panel}
                </div>
              </div>
            </section>
          ) : null}
        </>
    )
}