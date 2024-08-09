const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <main>
      <h1>
        <strong>Copyright @{year}</strong>
      </h1>
    </main>
  );
};

export default Footer;
