const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal fixed bottom-0 w-full footer-center bg-blue-500 text-base-content p-4">
      <aside>
        <strong>Copyright @{new Date().getFullYear()}</strong>
      </aside>
    </footer>
  );
};

export default Footer;
