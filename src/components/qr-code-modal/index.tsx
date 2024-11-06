import React, { useEffect, useRef, useState } from "react";

import Modal from "../modal";
import LoadingCell from "../loaders/loading-cell";

interface QRCodeModalProps {
  onClose: () => void;
  qrCode?: string | null;
  isLoading: boolean;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose, qrCode, isLoading }) => {
  const [qrCodeLoaded, setQrCodeLoaded] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrCodeLoaded && qrCode) return setQrCodeLoaded(qrCode);

    if (qrCodeRef.current && qrCodeLoaded) {
      qrCodeRef.current.innerHTML = qrCodeLoaded;
    }
  }, [qrCode, qrCodeLoaded, qrCodeRef]);

  return (
    <Modal onCancel={onClose}>
      <div
        ref={qrCodeRef}
        className="max-w-[436px] rounded-lg flex items-center justify-center w-full sm:w-[436px] h-auto sm:h-[492px]"
      >
        {isLoading && <LoadingCell className="h-[100vw] sm:h-full w-full" />}
      </div>
      {/* <div className="flex items-center justify-between sm:flex-row mt-4 gap-2">
        <button
          className="p-4 sm:px-6 w-1/2 bg-followButton sm:w-48 hover:bg-followButton/80 hover:scale-105 transition-all text-darkGrey rounded-xl flex items-center justify-center gap-2"
          onClick={copyToClipboard}
        >
          <FaCopy className="text-lg" />
          <p>{qrCodeCopied ? "Copied!" : "Copy QR Code"}</p>
        </button>
        <button
          className="p-4 sm:px-6 w-1/2 bg-followButton sm:w-48 hover:bg-followButton/80 hover:scale-105 transition-all text-darkGrey rounded-xl flex items-center justify-center gap-2"
          onClick={shareImage}
        >
          <FaShare className="text-lg" />
          <p>Share QR Code</p>
        </button>
      </div> */}
    </Modal>
  );
};

export default QRCodeModal;
