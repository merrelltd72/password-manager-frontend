const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="flex items-center justify-center">
      <h1 className="text-lg">
        <strong>Copyright @{year}</strong>
      </h1>
    </footer>
  );
};

export default Footer;
