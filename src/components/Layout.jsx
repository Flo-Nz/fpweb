import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div id="layout" className="mt-2">
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
