import React, { useEffect, useRef, useState } from "react";
import Modal from "./modal";

interface QRCodeModalProps {
  onClose: () => void;
  qrCode: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose, qrCode }) => {
  const [qrCodeLoaded, setQrCodeLoaded] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrCodeLoaded) return setQrCodeLoaded(qrCode);

    if (qrCodeRef.current && qrCodeLoaded) {
      qrCodeRef.current.innerHTML = qrCodeLoaded;
    }
  }, [qrCode, qrCodeLoaded, qrCodeRef]);

  const copyToClipboard = async () => {
    if (!qrCodeRef.current) return;

    // Get the SVG element from the DOM
    const svgElement = qrCodeRef.current.querySelector("svg");
    if (!svgElement) return;

    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob(
      [
        svgString.replace(
          '<image width="10" height="10" x="15" y="15"',
          '<image width="0" height="0" x="0" y="0"'
        ),
      ],
      {
        type: "image/svg+xml;charset=utf-8",
      }
    );
    const url = URL.createObjectURL(blob);

    // Create an Image object
    const img = new Image();
    img.src = url;
    img.width = 512;
    img.height = 512;

    img.onload = () => {
      // Create a canvas and set its dimensions
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      // Convert the canvas to a Blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Write the image blob to the clipboard
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ]);
          } catch (e) {
            // console.error("Failed to copy image to clipboard", e);
          }
        }
      }, "image/png");
    };

    img.onerror = () => {
      // console.error("Failed to load SVG as image");
    };
  };

  const shareImage = async () => {
    if (!qrCodeRef.current) return;

    // Get the SVG element from the DOM
    const svgElement = qrCodeRef.current.querySelector("svg");
    if (!svgElement) return;

    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob(
      [
        svgString.replace(
          '<image width="10" height="10" x="15" y="15"',
          '<image width="0" height="0" x="0" y="0"'
        ),
      ],
      { type: "image/svg+xml;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);

    // Create an Image object
    const img = new Image();
    img.src = url;
    img.width = 512;
    img.height = 512;

    img.onload = () => {
      // Create a canvas and set its dimensions
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      // Convert the canvas to a Blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Create a File object from the Blob
            const file = new File([blob], "qr-code.png", { type: blob.type });

            // Check if the navigator.share API is available
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: "QR Code",
                text: "Here is the QR code.",
              });
              // console.log("Image shared successfully");
            } else {
              // console.error("Sharing not supported on this browser/device.");
              alert("Sharing is not supported on your device or browser.");
              // replace with  a toast
            }
          } catch (e) {
            // console.error("Failed to share image", e);
          }
        }
      }, "image/png");
    };

    img.onerror = () => {
      // console.error("Failed to load SVG as image");
    };
  };

  return (
    <Modal onCancel={onClose}>
      <div
        ref={qrCodeRef}
        className="max-w-[436px] max-h-[436px] w-full h-full sm:w-[436px] sm:h-[436px]"
      ></div>
      <div className="flex items-center justify-between sm:flex-row mt-4 gap-2">
        <button
          className="glass-card p-4 sm:p-6 w-full sm:w-fit rounded-xl bg-neutral/55"
          onClick={copyToClipboard}
        >
          Copy
        </button>
        <button
          className="glass-card p-4 sm:p-6 w-full sm:w-fit rounded-xl bg-neutral/55"
          onClick={shareImage}
        >
          Share
        </button>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
