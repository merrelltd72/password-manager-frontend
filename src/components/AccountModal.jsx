import { useUIState, useUIDispatch } from "../context/UIContext";

const AccountModal = ({ children }) => {
  const { isAccountModalOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_ACCOUNT_MODAL" });
  };

  if (!isAccountModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <section className="absolute left-1/2 top-1/2 w-[min(90vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-box border border-base-300 bg-base-100 p-4 shadow-xl">
        {children}
        <br />
        <button type="button" onClick={handleClose} className="app-btn-primary">
          Close
        </button>
      </section>
    </div>
  );
};

export default AccountModal;
