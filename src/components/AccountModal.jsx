import { useUIState, useUIDispatch } from "../context/UIContext";
import "./AccountModal.css";

const AccountModal = ({ children }) => {
  const { isAccountModalOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_ACCOUNT_MODAL" });
  };

  if (!isAccountModalOpen) return null;

  return (
    <div className="modal-background">
      <section className="modal-main">
        {children}
        <br />
        <button
          type="button"
          onClick={handleClose}
          className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4"
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default AccountModal;
