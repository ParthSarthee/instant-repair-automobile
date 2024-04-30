import ReactModal from "react-modal";

function Modal({ isOpen, children }: { isOpen: boolean; children: any }) {
	return (
		<ReactModal
			className="w-full h-full flex items-center justify-center z-50"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			isOpen={isOpen}
			ariaHideApp={false}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={true}
		>
			{children}
		</ReactModal>
	);
}

export default Modal;
