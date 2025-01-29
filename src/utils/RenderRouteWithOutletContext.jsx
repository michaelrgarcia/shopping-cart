import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

const RenderRouteWithOutletContext = ({ context, children }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

RenderRouteWithOutletContext.propTypes = {
  context: PropTypes.any,
  children: PropTypes.any,
};

export default RenderRouteWithOutletContext;
