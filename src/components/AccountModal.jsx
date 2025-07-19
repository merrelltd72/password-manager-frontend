/* eslint-disable react/prop-types */
import "./AccountModal.css";

const AccountModal = ({ children, show, onClose }) => {
  if (show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          {children}
          <br />
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4"
          >
            Close
          </button>
        </section>
      </div>
    );
  }
};

export default AccountModal;
