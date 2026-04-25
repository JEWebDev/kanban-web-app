"use client";
import { useSearchParams } from "next/navigation";
import CreateBoardModal from "../../app/boards/CreateBoardModal";

const MODAL_COMPONENTS = {
  "create-board": CreateBoardModal,
} as const;

type ModalType = keyof typeof MODAL_COMPONENTS;
const isvalidModal = (key: string | null): key is ModalType => {
  return key !== null && key in MODAL_COMPONENTS;
};

function ModalContent() {
  const params = useSearchParams();
  const modalParam = params.get("modal");

  if (!isvalidModal(modalParam)) return null;

  const ActiveModal = MODAL_COMPONENTS[modalParam] ?? null;
  if (!ActiveModal) return null;

  return <ActiveModal />;
}

function ModalManager() {
  return (
    <>
      <ModalContent />
    </>
  );
}

export default ModalManager;
