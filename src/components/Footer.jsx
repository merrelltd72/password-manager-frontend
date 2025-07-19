const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className='footer sm:footer-horizontal footer-center bg-base-500 bg-blue-500 text-base-content p-4'>
      <aside>
        <strong>Copyright @{year}</strong>
      </aside>
    </footer>
  );
};

export default Footer;
